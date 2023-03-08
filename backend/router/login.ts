const loginRoute = require('express').Router();
import loginUploader from '../router-upload';
import { userLogin } from '../module/login';

loginRoute.post("/login", loginUploader.any(), async (req, res) => {
    // #swagger.tags = ['Login']
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
  // #swagger.description = 'It is an API to login to the nft marketplace'
  // #swagger.summary = 'Login api'

    try {
        let result = await userLogin(req.body);
        if (result) {
            res.status(200).send(result);
        } else
            res.status(403).send("Wrong email or password !!!")
    }
    catch (e) {
        console.log(e);
        res.status(400).send("An error has occurred");
    }
});


export default loginRoute;