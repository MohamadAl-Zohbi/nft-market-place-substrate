const contentRoute = require('express').Router();
import contentUploader from '../router-upload';
import {getContentBySlug} from '../module/content';
import ErrorLogger from '../utils/error-loger';


contentRoute.post("", contentUploader.any(), async (req, res) => {
    try {
        let result 
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});

contentRoute.get("/:slug", async (req, res) => {
    try {
        let result = await getContentBySlug(req.params.slug);
        res.status(200).send(result);
    }
    catch (e) {
        console.log(e)
        ErrorLogger(e,`/content/${req.params.slug}`);
        res.status(400).send("An error has occurred");
    }
});

export default contentRoute;
