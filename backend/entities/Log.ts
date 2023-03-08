import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("log", { schema: "nft_marketplace" })
export class Log {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: string;

  @Column("int", { name: "user_id", nullable: true, unsigned: true })
  userId: number | null;

  @Column("varchar", { name: "api_name", length: 50 })
  apiName: string;

  @Column("text", { name: "error" })
  error: string;

  @Column("timestamp", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;
}
