const ListingRoute = require('express').Router();
import ListingUploader from '../router-upload';
import {getAllListing , getUserTotalSell , getTop3Sellers} from '../module/Listing';
import ErrorLogger from '../utils/error-loger';
import { adminRouteGuard } from '../utils/guard';

ListingRoute.get("/all" , async (req , res) => {
    // #swagger.tags = ['Listing']
  // #swagger.description = 'It is an API to get all listing data'

  // #swagger.summary = 'get all listing'
    try{
        const auth = adminRouteGuard(req);
        if(auth){
            let data = await getAllListing();
            res.status(200).send(data);
        }
        else{
            res.status(403).send("Not authorized");
        }
    }catch(e){
        ErrorLogger(e,req.originalUrl);
        res.status(400).send("An error has occurred");
    }
})

ListingRoute.get("/get-top-sellers" , async (req ,res) => {
    
    // #swagger.tags = ['Listing' , 'Admin']
  // #swagger.description = 'It is an API to get top 3 users sellers by admin'
  // #swagger.summary = 'get user total sell'
    
    try{
        const auth = adminRouteGuard(req);
        if(auth){
            const result = await getTop3Sellers();
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


ListingRoute.get("/user-total-sell/:wallet" ,async (req , res) => {
    // #swagger.tags = ['Listing' , 'Admin']
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
})
export default ListingRoute;
