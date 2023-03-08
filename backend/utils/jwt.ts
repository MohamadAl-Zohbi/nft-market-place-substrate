import * as jwt from "jsonwebtoken";
import { decrypt, encrypt } from "./encryption";
// let json = {
//   userId: 1,
//   email: "test@test.com",
//   isAdmin: true,
// };
//Checking the crypto module

const password = "jdiwbsyagiansoansuhvauabaimamjasnjabshsuahaushaijsiajwiwn";
//Encrypting text

const encode = (data: { userId: number; email: string; isAdmin: boolean; walletAddress : string}) => {
  return jwt.sign(encrypt(JSON.stringify(data)), password);
};
const decode = (data: string) => {
  return JSON.parse(decrypt(jwt.verify(data,password)));
};

export { encode, decode };
