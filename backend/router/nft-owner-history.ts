const nftOwnerHistoryRoute = require('express').Router();
import nftOwnerHistoryUploader from '../router-upload';
import {create,update,findOne,findAll,findOneWithRelation,filter,filterWithRelations,findAllWithSelectedRelation,remove} from '../module/nft-owner-history';
nftOwnerHistoryRoute.post("", nftOwnerHistoryUploader.any(), async (req, res) => {
    try {
        let result = await create(req.body,req.files);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
nftOwnerHistoryRoute.post("/update", nftOwnerHistoryUploader.any(), async (req, res) => {
    try {
        let result = await update(req.body,req.files);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
nftOwnerHistoryRoute.get("", async (req, res) => {
    try {
        let result = await findAll(req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
nftOwnerHistoryRoute.get("/:id", async (req, res) => {
    try {
        let result = await findOne(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
nftOwnerHistoryRoute.get("delete/:id", async (req, res) => {
    try {
        let result = await delete(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
nftOwnerHistoryRoute.get("/with-relationsid", async (req, res) => {
    try {
        let result = await findOneWithRelation(req.params.id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});

nftOwnerHistoryRoute.post("/filter", nftOwnerHistoryUploader.any(), async (req, res) => {
    try {
        let result = await filter(req.body);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
nftOwnerHistoryRoute.post("/filter-with-relations", nftOwnerHistoryUploader.any(), async (req, res) => {
    try {
        let result = await filterWithRelations(req.body,req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
nftOwnerHistoryRoute.get("/find-all-with-selected-relations", nftOwnerHistoryUploader.any(), async (req, res) => {
    try {
        let result = await findAllWithSelectedRelation(req.query);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(400).send("An error has occurred");
    }
});
export default nftOwnerHistoryRoute;
