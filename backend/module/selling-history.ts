import { SellingHistory } from "../entities/SellingHistory";
import { SellingHistoryRepository } from "../data-source";

async function getUserTotalSell(sellerWalletId){
    
    const result = await SellingHistoryRepository.createQueryBuilder('selling_history')
    .select('selling_history.sellerId')
    .addSelect('SUM(selling_history.price)', 'total_price')
    .where('selling_history.sellerId = :sellerId', { sellerWalletId })
    .groupBy('selling_history.sellerId')
    .getRawOne();

    return result;
}

async function getMostExpensiveNft(){
    const result = await SellingHistoryRepository.findOne({
        select : {
            price : true,
            selling : {
                id : true,
                name : true,
                description : true,
                image : {
                    path : true
                }
            }
        },relations : ["selling" , "selling.image"],
        order : {price : "DESC"},
    });
    
    return result;
}

async function getMostThreeExpensiveNft(){
    const result = await SellingHistoryRepository.find({
        select : {
            price : true,
            selling : {
                id : true,
                name : true,
                description : true,
                image : {
                    path : true
                }
            }
        },relations : ["selling" , "selling.image"],
        order : {price : "DESC"},
        take : 3
    });

    return result;
}


async function getUserNetWorth(walletId){
const totalPrice = await SellingHistoryRepository
  .createQueryBuilder()
  .select('SUM(price)', 'totalPrice')
  .where('buyerId = :id', { id: walletId})
  .getRawOne();

  return totalPrice;
}

export {getUserTotalSell , getMostExpensiveNft , getMostThreeExpensiveNft, getUserNetWorth}