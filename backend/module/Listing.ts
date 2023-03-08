import { ListingRepository } from "../data-source";

async function getAllListing(){
    const result = await ListingRepository.find({
        select : {
            id : true,
            nftId : true,
            blockchainListingId : true,
            buyerWalletId : true,
            sellerWalletId : true,
            price : true,
            status : true,
            createdDate : true,
            buyerWallet : {
                id : true,
                walletAddress : true
            },
            sellerWallet : {
                id : true,
                walletAddress : true
            }
        },
        relations : ["buyerWallet" , "sellerWallet"]
    });

    return result;
}

async function getTop3Sellers(){
    const data = await ListingRepository.find({
        select : {
            id : true,
            nftId : true,
            blockchainListingId : true,
            buyerWalletId : true,
            price : true,
            sellerWallet : {
                id : true,
                user :{
                    id : true,
                    firstName : true,
                    lastName : true,
                    profileImg : true
                }
            }
        },relations : ["sellerWallet" , "sellerWallet.user"],
        order : {sellerWalletId : "DESC"},
        take : 3
    });

    return data;
};

async function getUserTotalSell(sellerWalletId){
    const result = await ListingRepository.createQueryBuilder("listing")
    .select("SUM(listing.price)", "totalPrice")
    .where("listing.sellerWalletId = :sellerWalletId", { sellerWalletId })
    .getRawOne();

    return result;
}

    
export {getAllListing , getTop3Sellers , getUserTotalSell};
    