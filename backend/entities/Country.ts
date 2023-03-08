import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("country", { schema: "nft_marketplace" })
export class Country {
  @PrimaryGeneratedColumn({ type: "smallint", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("smallint", { name: "archived", default: () => "'0'" })
  archived: number;

  @OneToMany(() => User, (user) => user.country)
  users: User[];
}
