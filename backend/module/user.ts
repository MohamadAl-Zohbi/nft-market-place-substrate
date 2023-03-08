import { User } from "../entities/User";
import { Login } from "../entities/Login";
import fileUploader from "../file-middleware";
import {
  UserRepository,
  LoginRepository,
  NftRepository,
  WalletRepository,
  ListingRepository,
} from "../data-source";
import { generateToken } from "../utils/token-generator";
// import { createUserWalletAndRegisterIt } from '../blockchain-module/user';
import { IsNull, Not } from "typeorm";
import { encrypt } from "../utils/encryption";
import { emailSender, emailVerificationSender } from "../utils/mail";
import { Listing } from "../entities/Listing";
import { Wallet } from "../entities/Wallet";
import { Nft } from "../entities/Nft";
import { Collection } from "../entities/Collection";
const fs = require("fs-extra");

async function userSignUp(data: any, files) {
  let file = files.find((element) => {
    return element.fieldname === "profileImg";
  });
  console.log(file);
  //let wallet = await createUserWalletAndRegisterIt((data.firstName + data.lastName).trim)
  let wallet = new Wallet();
  wallet.walletAddress = "dafadfa";
  const newLogin = new Login();
  newLogin.email = data.email;
  newLogin.password = encrypt(data.password);
  newLogin.verified = 0;
  newLogin.verificationToken = generateToken();
  newLogin.privateKey = "afdafauqe";
  let user = new User();
  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.gender = data.gender;
  user.countryId = 1;
  user.profileImg = fileUploader("../uploads", user.id, data.profileImg);
  const checkEmail = await UserRepository.findOne({
    where: {
      login: { email: data.email },
    },
  });
  if (!checkEmail) {
    let login = await LoginRepository.save(newLogin);
    user.loginId = login.id;
    user = await UserRepository.save(user);
    wallet.userId = user.id;
    await WalletRepository.save(wallet);
    let imgPath = `${user.id + generateToken().slice(1, 6)}.png`;
    user.profileImg = imgPath;
    await fs.ensureDir(`./uploads/user/${user.id}`, (err) => {
      if (err) throw err;
      console.log("Directory created or already existed");
    });
    user = await UserRepository.save(user);
    // data.firstName;
    // console.log("Path :  ", file.path);
    await fs
      .move(file.path, `./uploads/user/${user.id}/${imgPath}`)
      .catch((err) => console.error("error", err));
    await emailVerificationSender(
      "Email verification",
      "Your verification link is : ",
      data.email,
      login.verificationToken,
      data.firstName
    );
    await UserRepository.save(user);
    return true;
  }
  return false;
}

async function verifyEmail(token: string) {
  let login = await LoginRepository.findOneOrFail({
    where: { verificationToken: token },
  });

  login.verified = 1;
  await LoginRepository.save(login);
  return true;
}

async function forgotPassword(body: { email: string }) {
  const token = generateToken();
  let user = await UserRepository.findOneOrFail({
    where: { login: { email: body.email } },
  });
  let login = await LoginRepository.findOneOrFail({
    where: { id: user.loginId },
  });
  login.passwordResetToken = token;
  await UserRepository.save(user);
  await LoginRepository.save(login);
  await emailSender(
    "Reset password",
    login.email,
    `Your password reset code is :  ${token}`,
    "reset-password",
    user.firstName
  );
  return user;
}

async function resetPassword(body: {
  email: any;
  verificationToken: any;
  password: string;
}) {
  let login = await LoginRepository.findOneOrFail({
    where: { email: body.email, verificationToken: body.verificationToken },
  });
  if (login) {
    login.verificationToken = null;
    login.password = encrypt(body.password);
    await LoginRepository.save(login);
    return true;
  }
  return false;
}

async function getLast3Users() {
  const users = await UserRepository.find({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      gender: true,
      profileImg: true,
    },
    where: { profileImg: Not(IsNull()) },
    take: 3,
  });

  return users;
}

async function getProfileInfo(userId: number) {
  const data = await UserRepository.findOneOrFail({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      loginId: true,
      gender: true,
      profileImg: true,
      countryId: true,
      createdDate: true,
      login: {
        email: true,
      },
      wallets: {
        id: true,
        walletAddress: true,
      },
      country: {
        id: true,
        name: true,
      },
    },
    where: { id: userId },
    relations: ["login", "wallets", "country"],
  });

  return data;
}

async function editProfileInfo(
  body: {
    firstName: string;
    lastName: string;
    gender: number;
    countryId: number;
    email: string;
  },
  userId: any
) {
  if (Object.keys(body).length > 0) {
    let user = await UserRepository.findOneOrFail({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        gender: true,
        profileImg: true,
        countryId: true,
        loginId: true,
      },
      where: { id: userId },
    });

    let login = await LoginRepository.findOneOrFail({
      where: { id: user.loginId },
    });

    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.gender = body.gender;
    user.countryId = body.countryId;

    let checkLogin = await LoginRepository.findOne({
      where: { email: body.email },
    });
    if (checkLogin != null) {
      return null;
    }

    login.email = body.email;
    login.verificationToken = generateToken();
    login.verified = 0;
    await LoginRepository.save(login);
    return await UserRepository.save(user);
  }
  return null;
}

async function changePassword(
  body: { password: string; newPassword: string },
  userId: number
) {
  let user = await UserRepository.findOneOrFail({
    where: { id: userId },
  });

  let login = await LoginRepository.findOneOrFail({
    where: { id: user.loginId },
  });

  if (encrypt(body.password) === login.password) {
    login.password = encrypt(body.newPassword);
    await LoginRepository.save(login);
    return true;
  }
  return false;
}

async function getUserNft(userWalletAddress) {
  const data = await NftRepository.find({
    select: {
      id: true,
      name: true,
      description: true,
      currentPrice: true,
      favoriteCount: true,
      blockchainNftId: true,
      imageId: true,
      nftInfoId: true,
      ownerWallet :{
        id : true,
        walletAddress : true,
        user : {
          id : true,
          firstName : true,
          lastName : true,
          profileImg : true,
        }
      },
      collection : {
        id : true,
        name : true
      },
      image : {
        id : true,
        uuid : true,
        path : true
      }
    },
    relations: ["image", "ownerWallet" , "ownerWallet.user" , "collection"],
    where: { ownerWallet: {walletAddress : userWalletAddress} },
  });

  return data;
}

async function getUserInfo(body: { userId: any }) {
  const data = await UserRepository.findOneOrFail({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      loginId: true,
      gender: true,
      profileImg: true,
      countryId: true,
      createdDate: true,
      login: {
        email: true,
      },
      wallets: {
        id: true,
        walletAddress: true,
      },
      country: {
        id: true,
        name: true,
      },
    },
    where: { id: body.userId },
    relations: ["login", "wallets", "country"],
  });

  return data;
}

async function getUserNftCount() {
  const result = await NftRepository.createQueryBuilder("nft")
    .leftJoin("nft.ownerWallet", "wallet")
    .leftJoin("wallet.user", "user")
    .select("user.id", "userId")
    .addSelect("COUNT(nft.id)", "nftCount")
    .groupBy("user.id")
    .getRawMany();
  const nftCounts = result.map((row) => ({
    userId: row.userId,
    nftCount: row.nftCount,
  }));

  return nftCounts;
}

async function getTopThreeUsersWithMostListings() {
  const data = await ListingRepository.createQueryBuilder("listing")
    .leftJoinAndSelect("listing.sellerWallet", "sellerWallet")
    .leftJoinAndSelect("sellerWallet.user", "user")
    .select(
      "listing.sellerWalletId, COUNT(*) AS count , sellerWallet.walletAddress AS wallet_address , user.firstName , user.lastName , user.profileImg"
    )
    .groupBy("listing.sellerWalletId")
    .orderBy("count", "DESC")
    .limit(3)
    .getRawMany();

  return data;
}

async function getTopTenUsers() {
  const data = await UserRepository.find({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      nftCount: true,
      wallets: {
        id: true,
        walletAddress: true,
      },
      country: {
        id: true,
        name: true,
      },
      profileImg: true,
    },
    relations: ["wallets", "country"],
    order: { nftCount: "DESC" },
    take: 10,
  });

  return data;
}

async function getCountOfUserNftAndCollection(walletId) {
  const result = await NftRepository.createQueryBuilder("nft")
    .innerJoinAndSelect("nft.ownerWallet", "wallet", "wallet.id = :walletId", {
      walletId,
    })
    .innerJoinAndSelect("nft.collection", "collection")
    .select("count(nft.id) as nftCount")
    .addSelect("count(DISTINCT collection.id) as collectionCount")
    .getRawOne();

  return result;
}

export {
  userSignUp,
  verifyEmail,
  getLast3Users,
  resetPassword,
  forgotPassword,
  getProfileInfo,
  editProfileInfo,
  getUserNft,
  changePassword,
  getUserInfo,
  getUserNftCount,
  getTopThreeUsersWithMostListings,
  getCountOfUserNftAndCollection,
  getTopTenUsers,
};
