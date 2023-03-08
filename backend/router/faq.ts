const faqRoute = require('express').Router();
import faqUploader from '../router-upload';
import ErrorLogger from '../utils/error-loger';
import {getAllFaq , addFaq , editFaq} from '../module/faq';
import { adminRouteGuard,adminInterceptorGuard } from '../utils/guard';

faqRoute.get("/all",  async (req, res) => {
    // #swagger.tags = ['Faq']
     // #swagger.description = 'It is an API to get all FAQ'
    // #swagger.summary = 'get all FAQ'
    try {
        const data = await getAllFaq();
        res.status(200).send(data);
    }
    catch (e) {
        ErrorLogger(e,req.originalUrl);
        res.status(400).send("An error has occurred");
    }
});

faqRoute.post("/add" , faqUploader.any() , async (req , res) => {
    // #swagger.tags = ['Faq' , 'Admin']
     // #swagger.description = 'It is an API to let admin add new  FAQ'
    // #swagger.summary = 'Add FAQ'
    try{
        const auth = adminRouteGuard(req);
        if(auth){
            let result = await addFaq(req.body);
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

faqRoute.get("/edit" , faqUploader.any() ,adminInterceptorGuard, async (req , res) => {
    // #swagger.tags = ['Faq' , 'Admin']
     // #swagger.description = 'It is an API to let admin edit  FAQ'
    // #swagger.summary = 'Edit FAQ'
    try{
            let result = await editFaq(req.body);
            res.status(200).send(result);
    }catch(e){
        ErrorLogger(e,req.originalUrl);
        res.status(400).send("An error has occurred");
    }
})

export default faqRoute;
