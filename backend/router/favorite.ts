const favoriteRoute = require("express").Router();
import favoriteUploader from "../router-upload";
import ErrorLogger from "../utils/error-loger";
import { addToFavorite , 
        removeFromFavorite 
        } 
        from "../module/favorite";

favoriteRoute.post("/add" , favoriteUploader.any() , async (req , res) => {
      // #swagger.tags = ['favorite']
     // #swagger.description = 'It is an API let user add nft to his favorite nfts'
    // #swagger.summary = 'add to favorite'
    try{
        const result = await addToFavorite(req.body);
        if(result){
            res.status(200).send(result);
        }
        else{
            res.status(500).send("Cannot like and add to favorite")
        }
    }catch(e){
        ErrorLogger(e, req.originalUrl);
        res.status(400).send("An error has occurred");
    }
})

favoriteRoute.post("/remove" , favoriteUploader.any() ,async(req ,res) => {
    // #swagger.tags = ['favorite']
     // #swagger.description = 'It is an API let user remove nft from his favorite nfts'
    // #swagger.summary = 'remove from favorite'
    try{
        const result = await removeFromFavorite(req.body);
        res.status(200).send(result);
    }catch(e){
        ErrorLogger(e, req.originalUrl);
        res.status(400).send("An error has occurred");
    }
})

export {favoriteRoute}