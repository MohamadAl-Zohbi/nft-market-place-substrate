const nftInfoRoute = require('express').Router();
import nftInfoUploader from '../router-upload';
import {getNftInfo} from '../module/nft-info';
import ErrorLogger from '../utils/error-loger';


nftInfoRoute.post("/update", nftInfoUploader.any(), async (req, res) => {
    try {
        let result 
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});


nftInfoRoute.get("/:id", async (req, res) => {
    try {
        let result = await getNftInfo(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        console.log(e);
        ErrorLogger(e,`/nft-info/${req.params.id}`);
        res.status(400).send("An error has occurred");
    }
});


export default nftInfoRoute;
