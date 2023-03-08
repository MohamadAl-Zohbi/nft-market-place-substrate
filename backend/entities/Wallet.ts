import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Auction } from "./Auction";
import { AuctionParticipants } from "./AuctionParticipants";
import { Collection } from "./Collection";
import { Listing } from "./Listing";
import { Nft } from "./Nft";
import { NftOwnerHistory } from "./NftOwnerHistory";
import { Offer } from "./Offer";
import { SellingHistory } from "./SellingHistory";
import { User } from "./User";

@Index("wallet_address", ["walletAddress"], {})
@Index("user_id", ["userId"], {})
@Entity("wallet", { schema: "nft_marketplace" })
export class Wallet {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "wallet_address", length: 64 })
  walletAddress: string;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @OneToMany(() => Auction, (auction) => auction.sellerWallet)
  auctions: Auction[];

  @OneToMany(() => Auction, (auction) => auction.currentWinnerWallet2)
  auctions2: Auction[];

  @OneToMany(
    () => AuctionParticipants,
    (auctionParticipants) => auctionParticipants.wallet
  )
  auctionParticipants: AuctionParticipants[];

  @OneToMany(() => Collection, (collection) => collection.wallet)
  collections: Collection[];

  @OneToMany(() => Listing, (listing) => listing.buyerWallet)
  listings: Listing[];

  @OneToMany(() => Listing, (listing) => listing.sellerWallet)
  listings2: Listing[];

  @OneToMany(() => Nft, (nft) => nft.ownerWallet)
  nfts: Nft[];

  @OneToMany(
    () => NftOwnerHistory,
    (nftOwnerHistory) => nftOwnerHistory.walletAddress
  )
  nftOwnerHistories: NftOwnerHistory[];

  @OneToMany(() => Offer, (offer) => offer.offerMaker)
  offers: Offer[];

  @OneToMany(() => Offer, (offer) => offer.recipient)
  offers2: Offer[];

  @OneToMany(() => SellingHistory, (sellingHistory) => sellingHistory.seller)
  sellingHistories: SellingHistory[];

  @OneToMany(() => SellingHistory, (sellingHistory) => sellingHistory.buyer)
  sellingHistories2: SellingHistory[];

  @ManyToOne(() => User, (user) => user.wallets, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
