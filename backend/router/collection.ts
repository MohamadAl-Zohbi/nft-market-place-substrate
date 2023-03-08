const collectionRoute = require("express").Router();
import collectionUploader from "../router-upload";
import {
  getCollectionNft,
  getLast3Collection,
  getUserCollection,
  getAllCollections,
  creatCollection,
  getCollectionById,
  getTopTenCollectionWithBigestNumberOfNft,
} from "../module/collection";
import ErrorLogger from "../utils/error-loger";
import { adminRouteGuard, userRouteGuard } from "../utils/guard";

collectionRoute.get("/top-ten-collections" ,async (req ,res) => {
  // #swagger.tags = ['Collection']
  // #swagger.description = 'It is an API to get top 10 collections'
  // #swagger.summary = 'get top 10 collections'
  try{
      const result = await getTopTenCollectionWithBigestNumberOfNft();
      res.status(200).send(result);
  }catch(e){
      await ErrorLogger(e, req.originalUrl);
      console.log(e)
      res.status(400).send("An error has occurred");
  }
})

collectionRoute.post("/create", collectionUploader.any(), async (req, res) => {
  // #swagger.tags = ['Collection' , 'User']

  /* name: string; description: string; blockNumber: string; walletId: number;
    #swagger.parameters['name'] = {
                type: "string",
                in: 'formData',
        }
        #swagger.parameters['walletId'] = {
                type: "integer",
                in: 'formData',  
        }
        #swagger.parameters['blockNumber'] = {
                type: "string",
                in: 'formData',  
        }
         #swagger.parameters['description'] = {
                type: "string",
                in: 'formData',
        } */
  // #swagger.description = 'It is an API to let user add new collection'
  // #swagger.summary = 'add new collection'
  try {
    const auth = userRouteGuard(req);
    if (auth) {
      const result = await creatCollection(req.body , req.files ,auth.authData.walletAddress);
      res.status(200).send(result);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    console.log(e);
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

collectionRoute.get("/get-collection/:id", async (req, res) => {
  // #swagger.tags = ['Collection']

  /* 
    #swagger.parameters['id'] = {
                type: "integer",
                in: 'request.params',
        }
    */
  // #swagger.description = 'It is an API to get a collection by id'
  // #swagger.summary = 'get collection by id'
  try {
    let result = await getCollectionNft(req.params.id);
    res.status(200).send(result);
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

collectionRoute.get("/get-all-collections", async (req, res) => {
  // #swagger.tags = ['Collection']
  // #swagger.description = 'It is an API to get all collections'
  // #swagger.summary = 'get all collections'
  try {
    let result = await getAllCollections();
    res.status(200).send(result);
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

collectionRoute.get("/get-last-collection", async (req, res) => {
  // #swagger.tags = ['Collection']
  // #swagger.description = 'It is an API to get last collection'
  // #swagger.summary = 'get last collection'
  try {
    const result = await getLast3Collection();
    res.status(200).send(result);
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

collectionRoute.get("/get-user-collection", async (req, res) => {
  // #swagger.tags = ['Collection' ,'User']

  /* 
    #swagger.parameters['id'] = {
                type: "integer",
                in: 'token data',
        }
    */
  // #swagger.description = 'It is an API to let user get his collections'
  // #swagger.summary = 'get user collection'

  try {
    const auth = userRouteGuard(req);
    if (auth) {
      const data = await getUserCollection(auth.authData.walletAddress);
      res.status(200).send(data);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

export default collectionRoute;
