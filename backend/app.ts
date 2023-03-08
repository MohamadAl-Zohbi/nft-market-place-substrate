import express from "express";
import cors from "cors";
import initializeCronJob from "./cron-job";
import initializeRouter from "./router";
import bodyParser from "body-parser";
import dataSource from "./data-source";
import { initialize } from "./utils/polkadot";
import developmentEnvirment from "./development-utils/development-env";
import swaggerUi from "swagger-ui-express";
import documentationGenerator from "./documentation";
import limiter from "./utils/request-limiter";

import { api, userSubmitExtrinsic } from "./utils/polkadot";

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((_req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app = initializeRouter(app);
const http = require("http").Server(app);

async function main() {
  await dataSource.initialize();
  // await initialize();
  // await maintesting();
  // eventListener();
  // await developmentEnvirment();
  // initializeCronJob();
  // await documentationGenerator();
  app.use(
    "/doc",
    swaggerUi.serve,
    swaggerUi.setup(require("./documentation/documentation.json"))
  );
  app.use(limiter);
  http.listen(5000, function (err: any) {
    if (err) console.log(err);
    console.log("Listening on port 5000");
  });
  process.on("uncaughtException", function (ex) {
    console.log(ex);
  });

  // console.log('tx', api.tx);
  // console.log('nfts', api.tx.nfts);
  // console.log('query', api.query.nfts);
}
main();
