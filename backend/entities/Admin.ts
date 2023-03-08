import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "./Content";

@Entity("admin", { schema: "nft_marketplace" })
export class Admin {
  @PrimaryGeneratedColumn({ type: "smallint", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "email", length: 50 })
  email: string;

  @Column("varchar", { name: "password", length: 50 })
  password: string;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "public_key", length: 64 })
  publicKey: string;

  @Column("varchar", { name: "secret_key", length: 300 })
  secretKey: string;

  @Column("timestamp", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @Column("timestamp", {
    name: "updated_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedDate: Date;

  @Column("smallint", { name: "archived", default: () => "'0'" })
  archived: number;

  @OneToMany(() => Content, (content) => content.updatedBy2)
  contents: Content[];
}
