import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Nft } from "./Nft";
import { Wallet } from "./Wallet";
import { AuctionParticipants } from "./AuctionParticipants";
import { Fraud } from "./Fraud";

@Index("nft_id", ["nftId"], {})
@Index("wallet_address", ["sellerWalletId"], {})
@Index("current_winner_wallet", ["currentWinnerWallet"], {})
@Entity("auction", { schema: "nft_marketplace" })
export class Auction {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "blockchain_auction_id", unsigned: true })
  blockchainAuctionId: number;

  @Column("int", { name: "nft_id", unsigned: true })
  nftId: number;

  @Column("int", { name: "seller_wallet_id" })
  sellerWalletId: number;

  @Column("timestamp", { name: "auction_start_date" })
  auctionStartDate: Date;

  @Column("timestamp", { name: "auction_end_date" })
  auctionEndDate: Date;

  @Column("double", { name: "min_bid", unsigned: true, precision: 22 })
  minBid: number;

  @Column("double", { name: "min_step", unsigned: true, precision: 22 })
  minStep: number;

  @Column("double", { name: "current_bid", unsigned: true, precision: 22 })
  currentBid: number;

  @Column("int", { name: "current_winner_wallet" })
  currentWinnerWallet: number;

  @Column("smallint", {
    name: "status",
    comment: "1:pending;2:completed;3:canceled",
  })
  status: number;

  @Column("timestamp", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @ManyToOne(() => Nft, (nft) => nft.auctions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "nft_id", referencedColumnName: "id" }])
  nft: Nft;

  @ManyToOne(() => Wallet, (wallet) => wallet.auctions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "seller_wallet_id", referencedColumnName: "id" }])
  sellerWallet: Wallet;

  @ManyToOne(() => Wallet, (wallet) => wallet.auctions2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "current_winner_wallet", referencedColumnName: "id" }])
  currentWinnerWallet2: Wallet;

  @OneToMany(
    () => AuctionParticipants,
    (auctionParticipants) => auctionParticipants.auction
  )
  auctionParticipants: AuctionParticipants[];

  @OneToMany(() => Fraud, (fraud) => fraud.auction)
  frauds: Fraud[];
}
