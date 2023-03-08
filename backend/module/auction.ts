import fileUploader from '../file-middleware';
import { AuctionRepository  , NftInfoRepository} from "../data-source";
import { Auction } from '../entities/Auction';

async function getMostExpensiveNft(){
  const nft = await AuctionRepository.findOne({
    select : {
      id : true,
      blockchainAuctionId : true,
      sellerWalletId : true,
      
    }
  });

  return nft;
}

async function getTotalBiddingOfUser(sellerWalletId){
  const result = await AuctionRepository.createQueryBuilder()
  .select("COUNT(*)", "count")
  .from(Auction, "auction")
  .where("auction.sellerWalletId = :sellerWalletId", { sellerWalletId })
  .getRawOne();

  return result;
}

export { getMostExpensiveNft , getTotalBiddingOfUser};