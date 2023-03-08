import fileUploader from '../file-middleware';
import { AdminRepository } from "../data-source";
import { encode } from "../utils/jwt"

async function adminLogin(data : any) {
  const loginData = await AdminRepository.findOneOrFail({
    where : {email : data.email , password : data.password}
  });
  let jwt_token = encode({ userId: loginData.id,email : loginData.email , isAdmin: true , walletAddress : loginData.publicKey });
  return jwt_token;
}

export {adminLogin}; 