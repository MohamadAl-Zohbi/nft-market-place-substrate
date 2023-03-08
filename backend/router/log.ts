const logRoute = require('express').Router();
import logUploader from '../router-upload';
import {create,update,findOne,findAll,findOneWithRelation,filter,filterWithRelations,findAllWithSelectedRelation,remove} from '../module/log';
logRoute.post("", logUploader.any(), async (req, res) => {
    try {
        let result = await create(req.body,req.files);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
logRoute.post("/update", logUploader.any(), async (req, res) => {
    try {
        let result = await update(req.body,req.files);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
logRoute.get("", async (req, res) => {
    try {
        let result = await findAll(req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
logRoute.get("/:id", async (req, res) => {
    try {
        let result = await findOne(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
logRoute.get("delete/:id", async (req, res) => {
    try {
        let result = await delete(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
logRoute.get("/with-relationsid", async (req, res) => {
    try {
        let result = await findOneWithRelation(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});

logRoute.post("/filter", logUploader.any(), async (req, res) => {
    try {
        let result = await filter(req.body);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
logRoute.post("/filter-with-relations", logUploader.any(), async (req, res) => {
    try {
        let result = await filterWithRelations(req.body,req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
logRoute.get("/find-all-with-selected-relations", logUploader.any(), async (req, res) => {
    try {
        let result = await findAllWithSelectedRelation(req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
export default logRoute;
