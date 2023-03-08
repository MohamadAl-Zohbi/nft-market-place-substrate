import { CollectionRepository } from "../data-source";
import { Collection } from '../entities/Collection';

async function addCollection(data: {
    blockchain_collection_id: number;
    name: string;
    description: string;
    background_image_id: number;
    front_image_id: number;
    block_number: number;
    wallet_id: number
}) {
    try {
        return await CollectionRepository.save(data);   
    } catch (error) {
        return null
    }
}


export { addCollection };
