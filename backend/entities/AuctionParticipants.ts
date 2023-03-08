import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Auction } from "./Auction";
import { Wallet } from "./Wallet";

@Index("auction_id", ["auctionId"], {})
@Index("wallet_address", ["walletId"], {})
@Entity("auction_participants", { schema: "nft_marketplace" })
export class AuctionParticipants {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "auction_id", unsigned: true })
  auctionId: number;

  @Column("double", { name: "bid", unsigned: true, precision: 22 })
  bid: number;

  @Column("int", { name: "wallet_id" })
  walletId: number;

  @Column("timestamp", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @ManyToOne(() => Auction, (auction) => auction.auctionParticipants, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "auction_id", referencedColumnName: "id" }])
  auction: Auction;

  @ManyToOne(() => Wallet, (wallet) => wallet.auctionParticipants, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "wallet_id", referencedColumnName: "id" }])
  wallet: Wallet;
}
