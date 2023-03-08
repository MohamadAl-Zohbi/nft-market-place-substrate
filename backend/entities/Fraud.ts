import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Auction } from "./Auction";
import { Listing } from "./Listing";
import { Offer } from "./Offer";

@Index("auction_id", ["auctionId"], {})
@Index("listing_id", ["listingId"], {})
@Index("offer_id", ["offerId"], {})
@Entity("fraud", { schema: "nft_marketplace" })
export class Fraud {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "wallet_id" })
  walletId: number;

  @Column("int", { name: "auction_id", nullable: true })
  auctionId: number | null;

  @Column("int", { name: "listing_id", nullable: true })
  listingId: number | null;

  @Column("int", { name: "offer_id", nullable: true })
  offerId: number | null;

  @Column("int", { name: "created_date" })
  createdDate: number;

  @ManyToOne(() => Auction, (auction) => auction.frauds, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "auction_id", referencedColumnName: "id" }])
  auction: Auction;

  @ManyToOne(() => Listing, (listing) => listing.frauds, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "listing_id", referencedColumnName: "id" }])
  listing: Listing;

  @ManyToOne(() => Offer, (offer) => offer.frauds, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "offer_id", referencedColumnName: "id" }])
  offer: Offer;
}
