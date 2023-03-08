import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Admin } from "./Admin";

@Index("updated_by", ["updatedBy"], {})
@Entity("content", { schema: "nft_marketplace" })
export class Content {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "title", length: 100 })
  title: string;

  @Column("varchar", { name: "slug", length: 30 })
  slug: string;

  @Column("longtext", { name: "page" })
  page: string;

  @Column("smallint", { name: "updated_by", unsigned: true })
  updatedBy: number;

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

  @Column("smallint", {
    name: "archived",
    unsigned: true,
    default: () => "'0'",
  })
  archived: number;

  @ManyToOne(() => Admin, (admin) => admin.contents, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "updated_by", referencedColumnName: "id" }])
  updatedBy2: Admin;
}
