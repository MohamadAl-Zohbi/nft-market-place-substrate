import { mnemonicGenerate } from "@polkadot/util-crypto";
import { api, adminSubmitExtrinsic } from "../utils/polkadot";
import { keyring } from "../utils/polkadot";

const createUserWalletAndRegisterIt = async (userName: string) => {
    try {
      const mnemonic = mnemonicGenerate();
      const pair = keyring.addFromUri(mnemonic, { name: userName });
      //fund account and register it using method addfund from the pallet cex
      const submitExtrinsic = await api.tx.cex.registerUser(pair.address);
      const result = await adminSubmitExtrinsic(submitExtrinsic);
      return { address: pair.address, mnemonic: mnemonic };
    } catch (e) {
      console.log(e); 
    }
  };

export {createUserWalletAndRegisterIt};
