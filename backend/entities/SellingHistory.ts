import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Wallet } from "./Wallet";
import { Nft } from "./Nft";

@Index("selling_id", ["sellingId"], {})
@Index("type", ["type"], {})
@Index("seller_id", ["sellerId"], {})
@Index("buyer_id", ["buyerId"], {})
@Entity("selling_history", { schema: "nft_marketplace" })
export class SellingHistory {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("smallint", {
    name: "type",
    comment: "1:listing;2:auction:3:offer",
    unsigned: true,
    default: () => "'1'",
  })
  type: number;

  @Column("int", { name: "selling_id", nullable: true })
  sellingId: number | null;

  @Column("int", { name: "seller_id" })
  sellerId: number;

  @Column("int", { name: "buyer_id" })
  buyerId: number;

  @Column("double", { name: "price", unsigned: true, precision: 22 })
  price: number;

  @Column("timestamp", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @ManyToOne(() => Wallet, (wallet) => wallet.sellingHistories, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "seller_id", referencedColumnName: "id" }])
  seller: Wallet;

  @ManyToOne(() => Wallet, (wallet) => wallet.sellingHistories2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "buyer_id", referencedColumnName: "id" }])
  buyer: Wallet;

  @ManyToOne(() => Nft, (nft) => nft.sellingHistories, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "selling_id", referencedColumnName: "id" }])
  selling: Nft;
}
