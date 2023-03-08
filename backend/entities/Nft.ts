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
import { FavoriteNft } from "./FavoriteNft";
import { Listing } from "./Listing";
import { Collection } from "./Collection";
import { Image } from "./Image";
import { NftInfo } from "./NftInfo";
import { Wallet } from "./Wallet";
import { NftOwnerHistory } from "./NftOwnerHistory";
import { SellingHistory } from "./SellingHistory";

@Index("collection_id", ["collectionId"], {})
@Index("image_id", ["imageId"], {})
@Index("nft_info_id", ["nftInfoId"], {})
@Index("owner_wallet", ["ownerWalletId"], {})
@Entity("nft", { schema: "nft_marketplace" })
export class Nft {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "description", length: 100 })
  description: string;

  @Column("double", {
    name: "current_price",
    unsigned: true,
    precision: 22,
    default: () => "'0'",
  })
  currentPrice: number;

  @Column("int", {
    name: "favorite_count",
    unsigned: true,
    default: () => "'0'",
  })
  favoriteCount: number;

  @Column("int", { name: "collection_id", unsigned: true })
  collectionId: number;

  @Column("int", { name: "blockchain_nft_id", unsigned: true })
  blockchainNftId: number;

  @Column("int", { name: "image_id", nullable: true, unsigned: true })
  imageId: number | null;

  @Column("int", { name: "nft_info_id", unsigned: true })
  nftInfoId: number;

  @Column("int", { name: "owner_wallet_id" })
  ownerWalletId: number;

  @Column("timestamp", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @OneToMany(() => Auction, (auction) => auction.nft)
  auctions: Auction[];

  @OneToMany(() => FavoriteNft, (favoriteNft) => favoriteNft.nft)
  favoriteNfts: FavoriteNft[];

  @OneToMany(() => Listing, (listing) => listing.nft)
  listings: Listing[];

  @ManyToOne(() => Collection, (collection) => collection.nfts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "collection_id", referencedColumnName: "id" }])
  collection: Collection;

  @ManyToOne(() => Image, (image) => image.nfts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "image_id", referencedColumnName: "id" }])
  image: Image;

  @ManyToOne(() => NftInfo, (nftInfo) => nftInfo.nfts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "nft_info_id", referencedColumnName: "id" }])
  nftInfo: NftInfo;

  @ManyToOne(() => Wallet, (wallet) => wallet.nfts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "owner_wallet_id", referencedColumnName: "id" }])
  ownerWallet: Wallet;

  @OneToMany(() => NftOwnerHistory, (nftOwnerHistory) => nftOwnerHistory.nft)
  nftOwnerHistories: NftOwnerHistory[];

  @OneToMany(() => SellingHistory, (sellingHistory) => sellingHistory.selling)
  sellingHistories: SellingHistory[];
}
