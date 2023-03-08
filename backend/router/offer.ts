const offerRoute = require('express').Router();
import offerUploader from '../router-upload';
import {create,update,findOne,findAll,findOneWithRelation,filter,filterWithRelations,findAllWithSelectedRelation,remove} from '../module/offer';
offerRoute.post("", offerUploader.any(), async (req, res) => {
    try {
        let result = await create(req.body,req.files);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
offerRoute.post("/update", offerUploader.any(), async (req, res) => {
    try {
        let result = await update(req.body,req.files);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
offerRoute.get("", async (req, res) => {
    try {
        let result = await findAll(req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
offerRoute.get("", async (req, res) => {
    try {
        let result = await findOne();
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
offerRoute.get("delete", async (req, res) => {
    try {
        let result = await delete();
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
offerRoute.get("/with-relations", async (req, res) => {
    try {
        let result = await findOneWithRelation();
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});

offerRoute.post("/filter", offerUploader.any(), async (req, res) => {
    try {
        let result = await filter(req.body);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
offerRoute.post("/filter-with-relations", offerUploader.any(), async (req, res) => {
    try {
        let result = await filterWithRelations(req.body,req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
offerRoute.get("/find-all-with-selected-relations", offerUploader.any(), async (req, res) => {
    try {
        let result = await findAllWithSelectedRelation(req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
export default offerRoute;
