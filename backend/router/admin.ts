const adminRoute = require('express').Router();
import adminUploader from '../router-upload';
import {adminLogin} from '../module/admin';
import ErrorLogger from '../utils/error-loger';

adminRoute.post("/login", adminUploader.any(), async (req, res) => {
    try {
        let result = await adminLogin(req.body);
        res.status(200).send(result);
    }
    catch (e) {
        ErrorLogger(e,req.originalUrl);
        res.status(400).send("An error has occurred");
    }
});

export default adminRoute;
