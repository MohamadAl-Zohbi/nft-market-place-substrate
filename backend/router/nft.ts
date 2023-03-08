const nftRoute = require("express").Router();
import nftUploader from "../router-upload";
import ErrorLogger from "../utils/error-loger";
import {
  getAllNft,
  getLast20Nft,
  getTotalCollectionNftCountAndNetWorth,
  getCollectionWithBigestNumberOfNft,
  createNft,
  getMostExpensiveNft,
  getMostExpensiveNfts,
  getNftById,
} from "../module/nft";
import adminRoute from "./admin";
import { adminRouteGuard, userRouteGuard } from "../utils/guard";

nftRoute.get("/get-top-nft", async (req, res) => {
  try {
    // #swagger.tags = ['Nft']
    // #swagger.description = 'It is an API to get top  nft'
    // #swagger.summary = 'get top nft'
    const data = await getMostExpensiveNft();
    res.status(200).send(data);
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

nftRoute.get("/top-ten-nft", async (req, res) => {
  // #swagger.tags = ['Nft']
  // #swagger.description = 'It is an API to get top 10 nfts'
  // #swagger.summary = 'get top 10 nfts'
  try {
    const data = await getMostExpensiveNfts();
    res.status(200).send(data);
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

nftRoute.get("/biggest-collection", async (req, res) => {
  try {
    // #swagger.tags = ['Nft']
    // #swagger.description = 'It is an API to get Collection With Biges tNumber Of Nft'
    // #swagger.summary = 'get Collection With Biges tNumber Of Nft'
    const auth = adminRouteGuard(req);
    if (auth) {
      const result = await getCollectionWithBigestNumberOfNft();
      res.status(200).send(result);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

nftRoute.get("/total-net-worth", async (req, res) => {
  // #swagger.tags = ['Nft' , 'Admin']
  // #swagger.description = 'It is an API to get Total Collection Nft Count And Net Worth'
  // #swagger.summary = 'get Total Collection Nft Count And Net Worth'
  try {
    const auth = adminRouteGuard(req);
    if (auth) {
      const result = await getTotalCollectionNftCountAndNetWorth();
      res.status(200).send(result);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

nftRoute.get("/get-all-nft", async (req, res) => {
  // #swagger.tags = ['Nft']
  // #swagger.description = 'It is an API to get all nft'
  // #swagger.summary = 'get all nft'

  try {
    let result = await getAllNft();
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

nftRoute.get("/get-last-nft", async (req, res) => {
  // #swagger.tags = ['Nft']
  // #swagger.description = 'It is an API to get last 20 nft'
  // #swagger.summary = 'get last nft'

  try {
    let result = await getLast20Nft();
    res.status(200).send(result);
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

nftRoute.post("/create", nftUploader.any(), async (req, res) => {
  // #swagger.tags = ['Nft' , 'User']

  /* 
    #swagger.parameters['name'] = {
                type: "string",
                in: 'formData',
        }
        #swagger.parameters['ownerWalletId'] = {
                type: "integer",
                in: 'formData',  
        }
        #swagger.parameters['collectionId'] = {
                type: "integer",
                in: 'formData',  
        }
        #swagger.parameters['currentPrice'] = {
                type: "double",
                in: 'formData',
        }
         #swagger.parameters['description'] = {
                type: "string",
                in: 'formData',
         #swagger.parameters['image'] = {
                type: "file",
                in: 'formData',
        } */
  // #swagger.description = 'It is an API to let user add new nft'
  // #swagger.summary = 'add new nft'
  try {
    const auth = userRouteGuard(req);
    if (auth) {
      let result = await createNft(req.body, req.files);
      res.status(200).send(result);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    console.log(e);
    res.status(400).send("An error has occurred");
  }
});

nftRoute.get("/nft/:id", async (req, res) => {
  // #swagger.tags = ['Nft']
  // #swagger.description = 'It is an API nft by id'
  // #swagger.summary = 'get nft by id'
  try {
    const nft = await getNftById(req.params.id);
    res.status(200).send(nft);
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    console.log(e);
    res.status(400).send("An error has occurred");
  }
});

export default nftRoute;
