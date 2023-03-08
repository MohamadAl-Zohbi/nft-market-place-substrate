const countryRoute = require('express').Router();
import countryUploader from '../router-upload';
import ErrorLogger from '../utils/error-loger';
import {addCountry, editCountry, getAllCountries} from '../module/country';
import { adminRouteGuard } from '../utils/guard';

countryRoute.post("/add" , countryUploader.any() , async (req , res) => {
    try{
        const auth = adminRouteGuard(req);
        if(auth){
            let result = await addCountry(req.body);
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

countryRoute.post("/edit" , countryUploader.any() ,async (req , res) => {
    try{
        const auth = adminRouteGuard(req);
        if(auth){
            let result = await editCountry(req.body);
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

countryRoute.get("/all", async (req, res) => {
    try {
        const result = await getAllCountries();
        res.status(200).send(result);
    }
    catch (e) {
        ErrorLogger(e,req.originalUrl);
        res.status(400).send("An error has occurred");
    }
});

export default countryRoute;
