import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("settings", { schema: "nft_marketplace" })
export class Settings {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "support_email", length: 50 })
  supportEmail: string;

  @Column("varchar", { name: "contact_number", length: 15 })
  contactNumber: string;

  @Column("varchar", { name: "node_url", length: 100 })
  nodeUrl: string;
}
