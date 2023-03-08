import { DataSource, Repository } from "typeorm";
import { Admin } from "./entities/Admin";
import { Auction } from "./entities/Auction";
import { AuctionParticipants } from "./entities/AuctionParticipants";
import { Collection } from "./entities/Collection";
import { Content } from "./entities/Content";
import { Country } from "./entities/Country";
import { Faq } from "./entities/Faq";
import { Log } from "./entities/Log";
import { Login } from "./entities/Login";
import { Nft } from "./entities/Nft";
import { NftInfo } from "./entities/NftInfo";
import { NftOwnerHistory } from "./entities/NftOwnerHistory";
import { Listing } from "./entities/Listing";
import { Offer } from "./entities/Offer";
import { Settings } from "./entities/Settings";
import { User } from "./entities/User";
import { Wallet } from "./entities/Wallet";
import { SellingHistory } from "./entities/SellingHistory";
import { Image } from "./entities/Image";
import { Favorite } from "./entities/Favorite";
const appDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 4306,
  username: "root",
  password: "",
  cache: { type: "database", duration: 10000 },
  logging: "all",
  maxQueryExecutionTime: 1000,
  logger: "file",
  database: "nft_marketplace",
  entities: ["entities//*.*"],
});
const AdminRepository: Repository<Admin> = appDataSource.getRepository(Admin);
const AuctionRepository: Repository<Auction> =
  appDataSource.getRepository(Auction);
const AuctionParticipantsRepository: Repository<AuctionParticipants> =
  appDataSource.getRepository(AuctionParticipants);
const CollectionRepository: Repository<Collection> =
  appDataSource.getRepository(Collection);
const ContentRepository: Repository<Content> =
  appDataSource.getRepository(Content);
const CountryRepository: Repository<Country> =
  appDataSource.getRepository(Country);
const FaqRepository: Repository<Faq> = appDataSource.getRepository(Faq);
const LogRepository: Repository<Log> = appDataSource.getRepository(Log);
const LoginRepository: Repository<Login> = appDataSource.getRepository(Login);
const NftRepository: Repository<Nft> = appDataSource.getRepository(Nft);
const NftInfoRepository: Repository<NftInfo> =
  appDataSource.getRepository(NftInfo);
const NftOwnerHistoryRepository: Repository<NftOwnerHistory> =
  appDataSource.getRepository(NftOwnerHistory);
const ListingRepository: Repository<Listing> =
  appDataSource.getRepository(Listing);
const OfferRepository: Repository<Offer> = appDataSource.getRepository(Offer);
const SettingsRepository: Repository<Settings> =
  appDataSource.getRepository(Settings);
const UserRepository: Repository<User> = appDataSource.getRepository(User);
const WalletRepository: Repository<Wallet> =
  appDataSource.getRepository(Wallet);
const SellingHistoryRepository: Repository<SellingHistory> =
  appDataSource.getRepository(SellingHistory);
const ImageRepository: Repository<Image> = appDataSource.getRepository(Image);
const FavoriteRepository: Repository<Favorite> =
  appDataSource.getRepository(Favorite);
export {
  AdminRepository,
  AuctionRepository,
  AuctionParticipantsRepository,
  CollectionRepository,
  ContentRepository,
  CountryRepository,
  FaqRepository,
  LogRepository,
  LoginRepository,
  NftRepository,
  NftInfoRepository,
  NftOwnerHistoryRepository,
  ListingRepository,
  OfferRepository,
  SettingsRepository,
  UserRepository,
  WalletRepository,
  SellingHistoryRepository,
  ImageRepository,
  FavoriteRepository,
};
export default appDataSource;
