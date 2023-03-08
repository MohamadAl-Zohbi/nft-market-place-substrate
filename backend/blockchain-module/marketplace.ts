import { api, userSubmitExtrinsic } from "../utils/polkadot";

const listNft = async (
    collection,
    nft,
    price: string,
    phrase: string,
) => {
    try {
        const submitExtrinsic = await api.tx.marketplace.list_nft(collection, nft, price);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const buyNft = async (
    collection,
    nft,
    price: string,
    phrase: string,
) => {
    try {
        const submitExtrinsic = await api.tx.marketplace.buy_nft(collection, nft, price);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const cancelListing = async (
    phrase: string,
    collection,
    nft,
) => {
    try {
        const submitExtrinsic = await api.tx.marketplace.cancel_listing(collection, nft);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const createAuction = async (
    phrase: string,
    collection,
    nft,
    price,
    to
) => {
    try {
        const submitExtrinsic = await api.tx.marketplace.create_auction(collection, nft, price, to);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const startAuction = async (
    phrase: string,
    collection,
    nft,
    min_bid,
    start_date,
    end_date,
) => {
    try {
        const submitExtrinsic = await api.tx.marketplace.start_auction(collection, nft, min_bid, start_date, end_date);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const bidInAuction = async (
    phrase: string,
    collection,
    nft,
    price,
) => {
    try {
        const submitExtrinsic = await api.tx.marketplace.bid_in_auction(collection, nft, price);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const settleAuction = async (
    phrase: string,
    collection,
    nft,
) => {
    try {
        const submitExtrinsic = await api.tx.marketplace.settle_auction(collection, nft);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const cancelAuction = async (
    phrase: string,
    collection,
    nft,
) => {
    try {
        const submitExtrinsic = await api.tx.marketplace.cancel_auction(collection, nft);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const createOffer = async (
    phrase: string,
    collection,
    nft,
    price,
    to
) => {
    try {
        const submitExtrinsic = await api.tx.marketplace.create_offer(collection, nft, price, to);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const acceptOffer = async (
    phrase: string,
    offer_id
) => {
    try {
        const submitExtrinsic = await api.tx.marketplace.accept_offer(offer_id);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const rejectOffer = async (
    phrase: string,
    offer_id
) => {
    try {
        const submitExtrinsic = await api.tx.marketplace.reject_offer(offer_id);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

const cancelOffer = async (
    phrase: string,
    offer_id,
) => {
    try {
        const submitExtrinsic = await api.tx.marketplace.cancel_offer(offer_id);
        const result = await userSubmitExtrinsic(submitExtrinsic, phrase);
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}

export {
    cancelListing,
    settleAuction,
    cancelAuction,
    createAuction,
    startAuction,
    bidInAuction,
    createOffer,
    acceptOffer,
    rejectOffer,
    cancelOffer,
    listNft,
    buyNft,
}