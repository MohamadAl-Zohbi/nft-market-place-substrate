import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Nft } from "./Nft";
import { Wallet } from "./Wallet";

@Index("nft_id", ["nftId"], {})
@Index("wallet_address", ["walletAddressId"], {})
@Entity("nft_owner_history", { schema: "nft_marketplace" })
export class NftOwnerHistory {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "nft_id" })
  nftId: number;

  @Column("int", { name: "wallet_address_id" })
  walletAddressId: number;

  @Column("timestamp", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @ManyToOne(() => Nft, (nft) => nft.nftOwnerHistories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "nft_id", referencedColumnName: "id" }])
  nft: Nft;

  @ManyToOne(() => Wallet, (wallet) => wallet.nftOwnerHistories, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "wallet_address_id", referencedColumnName: "id" }])
  walletAddress: Wallet;
}
