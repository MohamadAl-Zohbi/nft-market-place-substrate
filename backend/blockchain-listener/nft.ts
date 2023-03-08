import { NftRepository } from "../data-source";

async function addNft(data: {
    name: string;
    description: string;
    current_price: number;
    favorite_count: number;
    collection_id: number;
    image_id: number;
    blockchain_nft_id: number;
    owner_wallet_id: number;
    nft_info_id: number;
}) {
    try {
        return await NftRepository.save(data);   
    } catch (error) {
        return null
    }
}
export { addNft };