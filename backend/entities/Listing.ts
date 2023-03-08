import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fraud } from "./Fraud";
import { Nft } from "./Nft";
import { Wallet } from "./Wallet";

@Index("nft_id", ["nftId"], {})
@Index("buyer_wallet_address", ["buyerWalletId"], {})
@Index("seller_wallet_address", ["sellerWalletId"], {})
@Entity("listing", { schema: "nft_marketplace" })
export class Listing {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "nft_id", unsigned: true })
  nftId: number;

  @Column("int", { name: "blockchain_listing_id" })
  blockchainListingId: number;

  @Column("int", { name: "buyer_wallet_id", nullable: true })
  buyerWalletId: number | null;

  @Column("int", { name: "seller_wallet_id" })
  sellerWalletId: number;

  @Column("double", { name: "price", unsigned: true, precision: 22 })
  price: number;

  @Column("int", { name: "status", unsigned: true, default: () => "'1'" })
  status: number;

  @Column("timestamp", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @Column("timestamp", { name: "updated_date", nullable: true })
  updatedDate: Date | null;

  @OneToMany(() => Fraud, (fraud) => fraud.listing)
  frauds: Fraud[];

  @ManyToOne(() => Nft, (nft) => nft.listings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "nft_id", referencedColumnName: "id" }])
  nft: Nft;

  @ManyToOne(() => Wallet, (wallet) => wallet.listings, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "buyer_wallet_id", referencedColumnName: "id" }])
  buyerWallet: Wallet;

  @ManyToOne(() => Wallet, (wallet) => wallet.listings2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "seller_wallet_id", referencedColumnName: "id" }])
  sellerWallet: Wallet;
}
