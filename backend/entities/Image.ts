import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Collection } from "./Collection";
import { Nft } from "./Nft";

@Index("type", ["type"], {})
@Entity("image", { schema: "nft_marketplace" })
export class Image {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "path", length: 100 })
  path: string;

  @Column("varchar", { name: "uuid", length: 40 })
  uuid: string;

  @Column("smallint", {
    name: "type",
    comment:
      "1:nftImage;2:collectionImg;3:Collection Background;4 Collection Features",
    default: () => "'1'",
  })
  type: number;

  @Column("smallint", { name: "archived", default: () => "'0'" })
  archived: number;

  @OneToMany(() => Collection, (collection) => collection.frontImage2)
  collections: Collection[];

  @OneToMany(() => Collection, (collection) => collection.backgroundImage2)
  collections2: Collection[];

  @OneToMany(() => Nft, (nft) => nft.image)
  nfts: Nft[];
}
