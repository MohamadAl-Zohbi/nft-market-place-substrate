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
import { Wallet } from "./Wallet";

@Index("offer_maker_id", ["offerMakerId"], {})
@Index("recipient_id", ["recipientId"], {})
@Entity("offer", { schema: "nft_marketplace" })
export class Offer {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "nft_id", unsigned: true })
  nftId: number;

  @Column("bigint", { name: "blockchain_offer_id", unsigned: true })
  blockchainOfferId: string;

  @Column("int", { name: "offer_maker_id" })
  offerMakerId: number;

  @Column("int", { name: "recipient_id" })
  recipientId: number;

  @Column("double", { name: "price", unsigned: true, precision: 22 })
  price: number;

  @Column("smallint", { name: "status", unsigned: true })
  status: number;

  @Column("timestamp", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Fraud, (fraud) => fraud.offer)
  frauds: Fraud[];

  @ManyToOne(() => Wallet, (wallet) => wallet.offers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "offer_maker_id", referencedColumnName: "id" }])
  offerMaker: Wallet;

  @ManyToOne(() => Wallet, (wallet) => wallet.offers2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "recipient_id", referencedColumnName: "id" }])
  recipient: Wallet;
}
