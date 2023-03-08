import { api, userSubmitExtrinsic } from "../utils/polkadot";

const addNft = async (
    collection,
    data: Object,
    is_frozen: Boolean,
    phrase: string,
) => {
    try {
        const submitExtrinsic = await api.tx.nfts.mint(collection, data, is_frozen);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const transferNft = async (
    collection,
    item,
    dest,
    phrase: string,
) => {
    try {
        const submitExtrinsic = await api.tx.nfts.transfer(collection, item, dest);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const deleteNftFromCollection = async (
    collection,
    item,
    phrase: string,
) => {
    try {
        const submitExtrinsic = await api.tx.nfts.burn(collection, item);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

export { addNft, transferNft, deleteNftFromCollection }
