const sellingHistoryRoute = require('express').Router();
import sellingHistoryUploader from '../router-upload';
import {getUserTotalSell , getMostExpensiveNft , getMostThreeExpensiveNft, getUserNetWorth} from '../module/selling-history';
import ErrorLogger from '../utils/error-loger';
import { adminRouteGuard } from '../utils/guard';

sellingHistoryRoute.get("/user-total-sell/:wallet" , async (req , res) => {
    // #swagger.tags = ['Selling-history' , 'Admin']
  /*  #swagger.parameters['wallet'] = {
                type: "string",
                in: 'request param',
        }
        } */
  // #swagger.description = 'It is an API to get user total sell by wallet address by admin'
  // #swagger.summary = 'get user total sell'
    try{
        const auth = adminRouteGuard(req);
        if(auth){
            const result = await getUserTotalSell(req.params.wallet);
            res.status(200).send(result);
        }
        else{
            res.status(403).send("Not authorized");
        }
    }catch(e){
        ErrorLogger(e,req.originalUrl);
        res.status(400).send("An error has occurred");
    }
});

sellingHistoryRoute.get("/most-expensive-nft" , async (req , res) => {
    // #swagger.tags = ['Selling-history' , 'Admin']
  // #swagger.description = 'It is an API to get most expensive nft by admin'
  // #swagger.summary = 'get user total sell'
    
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
});

sellingHistoryRoute.get("/three-expansive-nft" , async (req , res) => {
    // #swagger.tags = ['Selling-history' , 'Admin']
  // #swagger.description = 'It is an API to get most three-expansive-nft by admin'
  // #swagger.summary = 'get three-expansive-nft'
    try{
        const auth = adminRouteGuard(req);
        if(auth){
            const result = await getMostThreeExpensiveNft();
            res.status(200).send(result);
        }
        else{
            res.status(403).send("Not authorized");
        }
    }catch(e){
        ErrorLogger(e,req.originalUrl);
        res.status(400).send("An error has occurred");
    }
});

sellingHistoryRoute.get("/user-networth/:wallet" ,async (req , res) => {
     // #swagger.tags = ['Selling-history' , 'Admin']
    /*  #swagger.parameters['wallet'] = {
                    type: "string",
                    in: 'request param',
            }
            } */
    // #swagger.description = 'It is an API to get user total buy by wallet address by admin'
    // #swagger.summary = 'get user net worth'
    
    try{
        const auth = adminRouteGuard(req);
        if(auth){
            const result = await getUserNetWorth(req.params.wallet);
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

export default sellingHistoryRoute