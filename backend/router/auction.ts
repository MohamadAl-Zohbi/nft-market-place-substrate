const auctionRoute = require('express').Router();
import auctionUploader from '../router-upload';
import {getMostExpensiveNft , getTotalBiddingOfUser} from '../module/auction';
import ErrorLogger from '../utils/error-loger';
import { adminRouteGuard } from '../utils/guard';

auctionRoute.get("/most-expensive-nft" , async (req , res) => {
    // #swagger.tags = ['Auction' , 'Admin']
  // #swagger.description = 'It is an API to get most expensive nft by admin'
  // #swagger.summary = 'get most expensive nft'
    try{
        const auth = adminRouteGuard(req);
        if(auth){
            const result = await getMostExpensiveNft();
            res.status(200).send(result);
        }
        else{
            res.status(403).send("Not authorized");
        }
    }catch(e){
        ErrorLogger(e,req.originalUrl);
        res.status(400).send("An error has occurred");
    }
})

auctionRoute.get("/user-total-bidding/:wallet" , async (req , res) => {
    // #swagger.tags = ['Auction' , 'Admin']
  /*  #swagger.parameters['wallet'] = {
                type: "string",
                in: 'request param',
        }
        } */
  // #swagger.description = 'It is an API to get user total bidding by wallet address by admin'
  // #swagger.summary = 'get user total bidding'
    try{
        const auth = adminRouteGuard(req);
        if(auth){
            const result = await getTotalBiddingOfUser(req.params.wallet);
            res.status(200).send(result);
        }
        else{
            res.status(403).send("Not authorized");
        }
    }catch(e){
        ErrorLogger(e,req.originalUrl);
        res.status(400).send("An error has occurred");
    }
})

export default auctionRoute;
