import { api, userSubmitExtrinsic } from "../utils/polkadot";

const addCollection = async (
    data: Object,
    is_frozen: Boolean,
    phrase: string,
) => {
    try {
        const submitExtrinsic = await api.tx.nfts.create(data, is_frozen);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const transferCollection = async (
    collection,
    newOwner,
    phrase: string
) => {
    try {
        const submitExtrinsic = await api.tx.nfts.transfer_ownership(collection, newOwner);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const setCollectionMaxSupply = async (
    collection,
    owner,
    phrase: string
) => {
    try {
        const submitExtrinsic = await api.tx.nfts.set_collection_max_supply(collection, owner);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

export { addCollection, transferCollection, setCollectionMaxSupply }