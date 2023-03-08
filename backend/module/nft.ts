import { Nft } from "../entities/Nft";
import fileUploader from "../file-middleware";
import { CollectionRepository, NftRepository } from "../data-source";
import { NftInfo } from "../entities/NftInfo";
import { addNft } from "../blockchain-module/nft";
import { createImage } from "../utils/image-saver";
import { Image } from "../entities/Image";
import { ImageRepository } from "../data-source";
import { Collection } from "../entities/Collection";

async function getNftById(id: any) {
  const data = await NftRepository.findOneOrFail({
    select: {
      id: true,
      name: true,
      description: true,
      currentPrice: true,
      favoriteCount: true,
      blockchainNftId: true,
      imageId: true,
      nftInfoId: true,
      ownerWallet: {
        id: true,
        walletAddress: true,
        user: {
          id: true,
          firstName: true,
          lastName: true,
          profileImg: true,
        },
      },
      collection: {
        id: true,
        name: true,
      },
      image: {
        id: true,
        uuid: true,
        path: true,
      },
    },
    relations: ["image", "ownerWallet", "ownerWallet.user", "collection"],
    where: { id: id },
  });

  return data;
}

async function getAllNft() {
  const data = await NftRepository.find({
    select: {
      id: true,
      name: true,
      description: true,
      currentPrice: true,
      favoriteCount: true,
      collectionId: true,
      blockchainNftId: true,
      imageId: true,
      nftInfoId: true,
      ownerWalletId: true,
    },
    relations: ["image", "ownerWallet"],
  });
  return data;
}

async function getLast20Nft() {
  const data = await NftRepository.find({
    order: {
      createdDate: "DESC",
    },
    take: 20,
    relations: ["image", "ownerWallet"],
  });

  return data;
}

async function getTotalCollectionNftCountAndNetWorth() {
  const data = await NftRepository.createQueryBuilder("nft")
    .select(
      "nft.collectionId, COUNT(nft.collectionId) as count, SUM(nft.currentPrice) as totalPrice"
    )
    .groupBy("nft.collectionId")
    .getRawMany();

  return data;
}

async function getCollectionWithBigestNumberOfNft() {
  const result = await NftRepository.createQueryBuilder("nft")
    .select("COUNT(nft.collectionId)", "count")
    .addSelect("nft.collectionId")
    .groupBy("nft.collectionId")
    .orderBy("count", "DESC")
    .limit(1)
    .getRawOne();

  return result;
}

// async function getTopTenCollectionWithBigestNumberOfNft() {
//   const data = await NftRepository.createQueryBuilder("nft")
//     .select("COUNT(nft.collectionId)", "count")
//     .addSelect("nft.id AS nftId , nft.name AS nftName, nft.currentPrice")
//     .addSelect("nft.collectionId AS id")
//     .addSelect("image.path", "imagePath")
//     .addSelect("image.uuid", "imageUuid")
//     .innerJoin("nft.image", "image")
//     .leftJoinAndSelect("nft.collection", "collection")
//     .addSelect("collection.blockchainCollectionId AS blockchainCollectionId ,collection.name AS name  ")
//     .leftJoinAndSelect("collection.frontImage2", "frontImage")
//     .addSelect("frontImage.uuid AS uuid , frontImage.id AS imageId , frontImage.path AS path")
//     .groupBy("nft.collectionId")
//     .orderBy("count", "DESC")
//     .limit(10)
//     .getRawMany();

//   let result = [];

//   data.forEach((collection) => {
//     let newCollection = new Collection();
//     newCollection.id = collection.id;

//   })

//   return data;
// }

async function createNft(
  body: {
    name: string;
    ownerWalletId: number;
    collectionId: number;
    currentPrice: number;
    description: string;
  },
  files
) {
  let file = files.find((element) => {
    return element.fieldname === "image";
  });
  let collection = await CollectionRepository.findOneOrFail({
    where: { id: body.collectionId },
  });
  collection.nftCount = collection.nftCount += 1;
  await CollectionRepository.save(collection);
  let image = new Image();
  let newImage = await createImage(body.collectionId, file);
  image.path = newImage[0];
  image.uuid = newImage[1];
  image = await ImageRepository.save(image);
  let nft = new Nft();
  nft.imageId = image.id;
  nft.name = body.name;
  nft.ownerWalletId = body.ownerWalletId;
  nft.collectionId = body.collectionId;
  nft.currentPrice = body.currentPrice;
  nft.description = body.description;
  nft.blockchainNftId = 2;
  nft.nftInfoId = 1;

  return await NftRepository.save(nft);
}

async function getMostExpensiveNft() {
  const data = await NftRepository.find({
    select: {
      id: true,
      name: true,
      description: true,
      ownerWalletId: true,
      image: {
        path: true,
      },
      currentPrice: true,
    },
    order: { currentPrice: "DESC" },
    take: 1,
  });

  return data;
}

async function getMostExpensiveNfts() {
  const data = await NftRepository.find({
    select: {
      id: true,
      name: true,
      description: true,
      favoriteCount: true,
      ownerWalletId: true,
      image: {
        id: true,
        uuid: true,
        path: true,
      },
      currentPrice: true,
    },
    relations: ["image"],
    order: { currentPrice: "DESC" },
    take: 10,
  });

  return data;
}

export {
  getAllNft,
  getLast20Nft,
  getTotalCollectionNftCountAndNetWorth,
  getCollectionWithBigestNumberOfNft,
  createNft,
  getMostExpensiveNft,
  getMostExpensiveNfts,
  getNftById,
};
