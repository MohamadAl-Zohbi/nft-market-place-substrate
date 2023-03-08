import { Login } from '../entities/Login';
import fileUploader from '../file-middleware';
import { LoginRepository, UserRepository, WalletRepository } from "../data-source";
import { encode } from "../utils/jwt"
import { encrypt } from '../utils/encryption';

async function  userLogin(data: any) {
  
  const loginData = await UserRepository.findOneOrFail({
      where: {login:{email: data.email, password: data.password , verified : 1}}, 
      relations: ["login"]
  });

  let wallet = await WalletRepository.findOneOrFail({
    where : {userId : loginData.id}
  });
  // await emailSender("New Login" , loginData.email , "We Noticed A Login to ypur account " , "Login" , user.firstName);
  let jwt_token = encode({ userId: loginData.id,email : loginData.login.email , isAdmin: false , walletAddress : wallet.walletAddress });
  return jwt_token;
}

export {userLogin};