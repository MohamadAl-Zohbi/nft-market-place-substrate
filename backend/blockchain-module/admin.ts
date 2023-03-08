import { api } from "../utils/polkadot";

const registerPool = async (token1: number, token2: number) => {
    // try {
    //   const submitExtrinsic = await api.tx.cex.registerLiquidity(token1, token2);
    //   const result = await adminSubmitExtrinsic(submitExtrinsic);
    //   return result;
    // } catch (e) {
    //   return null
    // }
  };
  
  const fundAdmin = async () => {
    // try {
    //   const submitExtrinsic = await api.tx.cex.addFund();
    //   const result = await adminSubmitExtrinsic(submitExtrinsic);
    //   return result;
    // } catch (e) {
    //   return null
    // }
  };
  
  export { fundAdmin };
