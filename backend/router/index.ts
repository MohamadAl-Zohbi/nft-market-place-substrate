import { Express } from "express-serve-static-core";
import faqRoute from "./faq"
import countryRoute from "./country"
import nftRoute from "./nft";
import nftInfoRoute from "./nft-info";
import contentRoute from "./content";
import loginRoute from "./login";
import userRoute from "./user";
import collectionRoute from "./collection";
import adminRoute from "./admin";
import sellingHistoryRoute from "./selling-history";
import { favoriteRoute } from "./favorite";
// import adminRoute from "./admin";

export default function main(app: Express) {
  app.use("/faq",faqRoute);
  app.use("/country",countryRoute);
  app.use("/nft",nftRoute);
  app.use("/nft-info",nftInfoRoute);
  app.use("/content",contentRoute);
  app.use("/login",loginRoute);
  app.use("/user",userRoute);
  app.use("/collection",collectionRoute);
  app.use("/admin", adminRoute);
  app.use("/selling-history" , sellingHistoryRoute);
  app.use("/favorite" , favoriteRoute);

  return app;
}
