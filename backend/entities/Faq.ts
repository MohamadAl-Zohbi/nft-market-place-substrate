import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("faq", { schema: "nft_marketplace" })
export class Faq {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "question", length: 300 })
  question: string;

  @Column("text", { name: "answer" })
  answer: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
