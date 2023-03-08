import fileUploader from '../file-middleware';
import { NftInfoRepository, NftRepository } from "../data-source";
import { NftInfo } from '../entities/NftInfo';

async function getNftInfo(nftId){
  const nft = await NftRepository.findOneOrFail({
    select : {
      nftInfoId : true
    }
    ,where : {id : nftId}
  });
  const nftInfo = NftInfoRepository.findOneOrFail({
    where : {id : nft.nftInfoId}
  });

  return nftInfo;
}



export {getNftInfo};

    