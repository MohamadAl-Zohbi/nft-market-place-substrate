import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FavoriteNft } from "./FavoriteNft";
import { Login } from "./Login";
import { Country } from "./Country";
import { Wallet } from "./Wallet";

@Index("login_id", ["loginId"], {})
@Index("country_id", ["countryId"], {})
@Entity("user", { schema: "nft_marketplace" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "first_name", length: 30 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 30 })
  lastName: string;

  @Column("int", { name: "login_id", unsigned: true })
  loginId: number;

  @Column("smallint", {
    name: "gender",
    comment: "1:male;2 :female",
    default: () => "'1'",
  })
  gender: number;

  @Column("varchar", { name: "profile_img", nullable: true, length: 15 })
  profileImg: string | null;

  @Column("int", { name: "nft_count", unsigned: true, default: () => "'0'" })
  nftCount: number;

  @Column("smallint", { name: "country_id", nullable: true, unsigned: true })
  countryId: number | null;

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

  @OneToMany(() => FavoriteNft, (favoriteNft) => favoriteNft.user)
  favoriteNfts: FavoriteNft[];

  @ManyToOne(() => Login, (login) => login.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "login_id", referencedColumnName: "id" }])
  login: Login;

  @ManyToOne(() => Country, (country) => country.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "country_id", referencedColumnName: "id" }])
  country: Country;

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: Wallet[];
}
