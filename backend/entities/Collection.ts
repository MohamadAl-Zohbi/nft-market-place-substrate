import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Image } from "./Image";
import { Wallet } from "./Wallet";
import { Nft } from "./Nft";

@Index("front_image", ["frontImage"], {})
@Index("background_image", ["backgroundImage"], {})
@Index("wallet_address", ["walletId"], {})
@Index("nft_count", ["nftCount"], {})
@Entity("collection", { schema: "nft_marketplace" })
export class Collection {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "blockchain_collection_id", unsigned: true })
  blockchainCollectionId: number;

  @Column("varchar", { name: "name", length: 60 })
  name: string;

  @Column("varchar", { name: "description", length: 150 })
  description: string;

  @Column("int", { name: "nft_count", unsigned: true })
  nftCount: number;

  @Column("int", { name: "background_image", nullable: true, unsigned: true })
  backgroundImage: number | null;

  @Column("int", { name: "front_image", nullable: true, unsigned: true })
  frontImage: number | null;

  @Column("bigint", { name: "block_number", unsigned: true })
  blockNumber: string;

  @Column("int", { name: "wallet_id" })
  walletId: number;

  @Column("timestamp", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @Column("timestamp", { name: "updated_date", nullable: true })
  updatedDate: Date | null;

  @ManyToOne(() => Image, (image) => image.collections, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "front_image", referencedColumnName: "id" }])
  frontImage2: Image;

  @ManyToOne(() => Image, (image) => image.collections2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "background_image", referencedColumnName: "id" }])
  backgroundImage2: Image;

  @ManyToOne(() => Wallet, (wallet) => wallet.collections, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "wallet_id", referencedColumnName: "id" }])
  wallet: Wallet;

  @OneToMany(() => Nft, (nft) => nft.collection)
  nfts: Nft[];
}
