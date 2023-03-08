import cron from "node-cron";
import dailyCronJob from "./daily";

const main = () => {
  cron.schedule("* * * * *", () => {
    dailyCronJob();
  });
};

export default main;
