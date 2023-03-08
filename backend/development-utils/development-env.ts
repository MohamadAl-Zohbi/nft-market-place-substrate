import { amountDecimalCombiner } from "../utils/number-handler";
import {
  adminPair,
  adminSubmitExtrinsic,
  api,
  keyring,
} from "../utils/polkadot";
import databaseCleaner from "./database-cleaner";
export default async function developmentEnvirment() {
  try {
    await databaseCleaner();
  } catch (e) {
    console.log(e);
  }
}
