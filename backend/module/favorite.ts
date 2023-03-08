import { Favorite } from "../entities/Favorite";
import { FavoriteRepository , NftInfoRepository, NftRepository } from "../data-source";

async function addToFavorite(body: { userId: number; nftId: number; }) {
    let checkFavorite = await FavoriteRepository.findOne({
        where : {userId : body.userId , nftId : body.nftId}
    });
    if(checkFavorite){
        return null;
    }
    let nft = await NftRepository.findOneOrFail({
        where : {id : body.nftId}
    });
    nft.favoriteCount = nft.favoriteCount + 1;
    await NftRepository.save(nft);
    let favorite = new Favorite();
    favorite.userId = body.userId;
    favorite.nftId = body.nftId;
    return await FavoriteRepository.save(favorite);
}

async function removeFromFavorite(body: { userId: any; nftId: any; }){
    let favorite = await FavoriteRepository.findOneOrFail({
        where : {userId : body.userId , nftId : body.nftId}
    });
    let nft = await NftRepository.findOneOrFail({
        where : {id : body.nftId}
    });
    nft.favoriteCount = nft.favoriteCount - 1;
    await NftRepository.save(nft);
    return await FavoriteRepository.remove(favorite);
}

export {addToFavorite , removeFromFavorite}