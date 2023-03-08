import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Nft } from "./Nft";

@Entity("nft_info", { schema: "nft_marketplace" })
export class NftInfo {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("json", { name: "data" })
  data: object;

  @Column("timestamp", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @OneToMany(() => Nft, (nft) => nft.nftInfo)
  nfts: Nft[];
}
