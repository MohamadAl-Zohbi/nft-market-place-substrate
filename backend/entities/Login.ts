import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("archived", ["archived"], {})
@Entity("login", { schema: "nft_marketplace" })
export class Login {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "email", length: 80 })
  email: string;

  @Column("varchar", { name: "password", length: 50 })
  password: string;

  @Column("varchar", { name: "private_key", length: 200 })
  privateKey: string;

  @Column("varchar", {
    name: "password_reset_token",
    nullable: true,
    length: 15,
  })
  passwordResetToken: string | null;

  @Column("smallint", { name: "verified", default: () => "'0'" })
  verified: number;

  @Column("varchar", { name: "verification_token", length: 15 })
  verificationToken: string;

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
    comment: "0:not archived;1:archived",
    default: () => "'0'",
  })
  archived: number;

  @OneToMany(() => User, (user) => user.login)
  users: User[];
}
