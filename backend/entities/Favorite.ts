import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("favorite", { schema: "nft_marketplace" })
export class Favorite {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { name: "nft_id", unsigned: true })
  nftId: number;

  @Column("timestamp", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;
}
