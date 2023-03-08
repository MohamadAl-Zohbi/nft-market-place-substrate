import { api } from "../utils/polkadot";
import { addCollection } from "./collection";
import { addNft } from "./nft";

export default function main() {
    api.query.system.events((events) => {
        events.forEach((record) => {
            const { event } = record;
            const eventData = event.toHuman();
            if (eventData.section == "nft") {
                switch (eventData.method) {
                    case "create":
                        addCollection(eventData.data);
                        break;
                    case "mint":
                        addNft(eventData.data);
                        break;
                    default:
                }
            }
        });
    });
}
