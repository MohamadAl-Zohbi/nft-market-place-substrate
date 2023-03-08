const settingsRoute = require('express').Router();
import settingsUploader from '../router-upload';
import {create,update,findOne,findAll,findOneWithRelation,filter,filterWithRelations,findAllWithSelectedRelation,remove} from '../module/settings';
settingsRoute.post("", settingsUploader.any(), async (req, res) => {
    try {
        let result = await create(req.body,req.files);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
settingsRoute.post("/update", settingsUploader.any(), async (req, res) => {
    try {
        let result = await update(req.body,req.files);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
settingsRoute.get("", async (req, res) => {
    try {
        let result = await findAll(req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
settingsRoute.get("/:id", async (req, res) => {
    try {
        let result = await findOne(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
settingsRoute.get("delete/:id", async (req, res) => {
    try {
        let result = await delete(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
settingsRoute.get("/with-relationsid", async (req, res) => {
    try {
        let result = await findOneWithRelation(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});

settingsRoute.post("/filter", settingsUploader.any(), async (req, res) => {
    try {
        let result = await filter(req.body);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
settingsRoute.post("/filter-with-relations", settingsUploader.any(), async (req, res) => {
    try {
        let result = await filterWithRelations(req.body,req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
settingsRoute.get("/find-all-with-selected-relations", settingsUploader.any(), async (req, res) => {
    try {
        let result = await findAllWithSelectedRelation(req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
export default settingsRoute;
