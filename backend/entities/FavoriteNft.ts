import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Nft } from "./Nft";
import { User } from "./User";

@Index("nft_id", ["nftId"], {})
@Index("user_id", ["userId"], {})
@Entity("favorite_nft", { schema: "nft_marketplace" })
export class FavoriteNft {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "nft_id" })
  nftId: number;

  @Column("timestamp", { name: "created_date" })
  createdDate: Date;

  @ManyToOne(() => Nft, (nft) => nft.favoriteNfts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "nft_id", referencedColumnName: "id" }])
  nft: Nft;

  @ManyToOne(() => User, (user) => user.favoriteNfts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
