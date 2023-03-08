import { ImageRepository, NftRepository, WalletRepository } from "../data-source";
import fileUploader from "../file-middleware";
import { CollectionRepository } from "../data-source";
import { Collection } from "../entities/Collection";
import { Image } from "../entities/Image";
import { createImage } from "../utils/image-saver";

async function getCollectionNft(collectionId) {
  const nfts = await NftRepository.find({
    select: {
      id: true,
      blockchainNftId: true,
      name: true,
      description: true,
      currentPrice: true,
      favoriteCount: true,
      image: {
        id: true,
        uuid: true,
        path: true,
      },
      ownerWallet: {
        id: true,
        walletAddress: true,
      },
      auctions: {
        id: true,
        currentBid: true,
        createdDate: true,
      },
    },
    take: 10,
    where: { collectionId: collectionId },
    relations: { image: true, auctions: true },
    order: { auctions: { currentBid: "DESC" } },
  });

  return nfts;
}

async function getCollectionById(id) {
  const data = await CollectionRepository.findOneOrFail({
    select: {
      id: true,
      blockchainCollectionId: true,
      name: true,
      description: true,
      backgroundImage2: {
        id: true,
        uuid: true,
        path: true,
      },
      frontImage2: {
        id: true,
        uuid: true,
        path: true,
      },
      blockNumber: true,
      wallet: {
        id: true,
        walletAddress: true,
      },
      createdDate: true,
    },
    where: { id: id },
    relations: ["frontImage2", "backgroundImage2", "wallet", "nfts"],
  });

  return data;
}

async function getLast3Collection() {
  const data = await CollectionRepository.find({
    order: {
      createdDate: "DESC",
    },
    take: 3,
    relations: [
      "frontImage2",
      "backgroundImage2",
      "wallet",
      "wallet.user",
      "nfts",
    ],
  });

  return data;
}

async function getUserCollection(walletAddress: any) {
  const wallet = await WalletRepository.findOneOrFail({where : {walletAddress : walletAddress}})
  const data = await  CollectionRepository.find({
    select : {
      id : true,
      name : true,
      blockchainCollectionId : true,
      description : true,
      nftCount : true,
      blockNumber : true,
      createdDate : true,
      frontImage2 : {
        id : true,
        uuid : true,
        path : true,
      },
      backgroundImage2 : {
        id : true,
        uuid : true,
        path : true
      },
      wallet : {
        id : true,
        walletAddress : true
      }
    },relations : ["wallet" , "frontImage2" , "backgroundImage2"],
    where : {walletId : wallet.id}
  });

  return data;
}

async function getAllCollections() {
  const data = await CollectionRepository.find({
    select: {
      id: true,
      blockchainCollectionId: true,
      name: true,
      description: true,
      blockNumber: true,
      walletId: true,
      nftCount : true,
      createdDate: true,
      wallet: {
        id : true,
        walletAddress: true,
        user : {
          id  : true,
          firstName : true,
          lastName : true
        }
      },
      backgroundImage2 : {
        id : true,
        uuid : true,
        path : true
      },
      frontImage2 : {
        id : true ,
        uuid : true,
        path : true
      },
      nfts : {
        id : true,
        name : true,
        description : true,
        currentPrice : true,
        createdDate : true,
        ownerWallet : {
          id: true,
          walletAddress : true
        }
      }
    },
    relations: [
      "frontImage2",
      "backgroundImage2",
      "wallet",
      "wallet.user",
      "nfts",
      "nfts.ownerWallet",
    ],
  });

  return data;
}

async function creatCollection(body: {
   name: string; description: string; 
   blockNumber: string; blockchainCollectionId: number; }
   ,files: any[],
   walletAddress) 
{
  const wallet = await WalletRepository.findOneOrFail({where : {walletAddress : walletAddress}});
  
let collection = new Collection();
  collection.name = body.name;
  collection.description = body.description;
  // collection.blockNumber = body.blockNumber;
  collection.walletId = wallet.id;
  collection.nftCount = 0;
  // collection.blockchainCollectionId = body.blockchainCollectionId;
  collection.blockchainCollectionId = 1;
  collection.blockNumber = "32";
  await CollectionRepository.save(collection);

  let frontImage = files.find((element) => {
    return element.fieldname === "frontImage";
  });
  let backImage = files.find((element) => {
    return element.fieldname === "backImage";
  });
  let image = new Image();
  let newFrontImage = await createImage(collection.id, frontImage);
  image.path = newFrontImage[0];
  image.uuid = newFrontImage[1];
  image = await ImageRepository.save(image);
  
  let image2 = new Image();
  let newBackgroundImage =  await createImage(collection.id, backImage);
  image2.path = newBackgroundImage[0];
  image2.uuid = newBackgroundImage[1];
  image2 = await ImageRepository.save(image);

  collection.backgroundImage = image2.id;
  collection.frontImage = image.id;

  return await CollectionRepository.save(collection);
}

async function getTopTenCollectionWithBigestNumberOfNft() {
  const data = await CollectionRepository.find({
    select: {
      id: true,
      blockchainCollectionId: true,
      name: true,
      description: true,
      backgroundImage: true,
      frontImage: true,
      blockNumber: true,
      nftCount : true,
      walletId: true,
      createdDate: true,
      wallet: {
        id : true,
        walletAddress: true,
      },
      nfts :{
        id : true,
        name : true,
        currentPrice : true,
        image : {
          id : true,
          uuid : true,
          path : true
        }
      }
    },
    relations: [
      "frontImage2",
      "backgroundImage2",
      "wallet",
      "nfts",
      "nfts.image"
    ],
    order: { nftCount: "DESC" },
     take : 10
  });

  return data;
}

export {
  getCollectionNft,
  getLast3Collection,
  getUserCollection,
  getAllCollections,
  creatCollection,
  getCollectionById,
  getTopTenCollectionWithBigestNumberOfNft,
};
