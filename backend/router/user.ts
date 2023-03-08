const userRoute = require("express").Router();
import userUploader from "../router-upload";
import {
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
} from "../module/user";
import ErrorLogger from "../utils/error-loger";
import { adminRouteGuard, userRouteGuard } from "../utils/guard";

userRoute.get("/top-ten-users", async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'It is an API to get top ten users'
  // #swagger.summary = 'Get top ten users'
  try {
    const result = await getTopTenUsers();
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.post("/signup", userUploader.any(), async (req, res) => {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['firstName'] = {
                type: "string",
                in: 'formData',
        }
        #swagger.parameters['lastName'] = {
                type: "string",
                in: 'formData',  
        }
        #swagger.parameters['email'] = {
                type: "string",
                in: 'formData',  
        }
        #swagger.parameters['profileImg'] = {
                type: "file",
                in: 'formData', 
        }
        #swagger.parameters['countryId'] = {
                type: "integer",
                in: 'formData',
        }
        #swagger.parameters['gender'] = {
                type: "integer",
                in: 'formData',
        }
         #swagger.parameters['password'] = {
                type: "string",
                in: 'formData',
        } */
  // #swagger.description = 'It is an API Sign up user that takes all require info to user'
  // #swagger.summary = 'Signup user'
  try {
    let result = await userSignUp(req.body, req.files);
    if (result) {
      res.status(200).send("Sign up  successful !!!");
    } else {
      res.status(500).send("Please try again !!!");
    }
  } catch (e) {
    console.log(e);
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.get("/verify-email", async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'It is an API to let user verify his email '
  /*
      #swagger.parameters['token'] = {
                type: "integer",
                in: 'request.query',
        }
    */
  // #swagger.summary = 'verify email'
  try {
    let result = await verifyEmail(req.query.token);
    if (result) {
      res.status(200).send("Email verified");
    } else {
      res.status(403).send("Cannot verify");
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.get("/get-top-sellers", async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'It is an API to get top 3 sellers'
  // #swagger.summary = 'get top 3 sellers'

  try {
    const result = await getTopThreeUsersWithMostListings();
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.get("/get-last-users", async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'It is an API to get last 3 users signed up to the nft marketplace'
  // #swagger.summary = 'get last 3 users'
  try {
    const result = await getLast3Users();
    res.status(200).send(result);
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.post("/user-info", userUploader.any(), async (req, res) => {
  // #swagger.tags = ['Users' , 'User']
  // #swagger.description = 'It is an API to get user inforamtion by user'
  /*
        #swagger.parameters['userId'] = {
                type: "integer",
                in: 'formData',
        }
    */
  // #swagger.summary = 'get user info'
  try {
    const auth = adminRouteGuard(req);
    if (auth) {
      let result = await getUserInfo(req.body);
      res.status(200).send(result);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.post("/forgot-password", userUploader.none(), async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'It is an API to let user forgot his password'
  /*
      #swagger.parameters['email'] = {
                type: "string",
                in: 'formData',
        }
    */
  // #swagger.summary = 'user forgot password'
  try {
    const userData = userRouteGuard(req);
    if (userData) {
      await forgotPassword(req.body);
      res.status(200).send("Password reseted");
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.post("/reset-password", userUploader.none(), async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'It is an API to let user reset his password'
  /*
      #swagger.parameters['email'] = {
                type: "string",
                in: 'formData',
        }
        #swagger.parameters['verificationToken'] = {
                type: "string",
                in: 'formData',
        }
    */
  // #swagger.summary = 'user reset password'
  try {
    const result = await resetPassword(req.body);
    if (result) {
      res.status(200).send("Password reseted");
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.get("/profile-info", async (req, res) => {
  try {
    // #swagger.tags = ['Users']
    // #swagger.description = 'It is an API to let user to get his profile information'
    // #swagger.summary = 'get user profile info'
    const auth = userRouteGuard(req);
    if (auth) {
      const result = await getProfileInfo(auth.authData.userId);
      res.status(200).send(result);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.post("/edit-profile-info", userUploader.any(), async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'It is an API to let user edit his profile info'
  /*
      #swagger.parameters['firstName'] = {
                type: "string",
                in: 'formData',
        }
        #swagger.parameters['lastName'] = {
                type: "string",
                in: 'formData',
        }
        #swagger.parameters['email'] = {
                type: "string",
                in: 'formData',
        }
        #swagger.parameters['gender'] = {
                type:"integer",
                in : 'formData',
        }
        #swagger.parameters['countryId'] = {
                type:"integer",
                in : 'formData',
        }
        #swagger.parameters['userId'] = {
                type:"integer",
                in : 'token data',
        }
    */
  // #swagger.summary = 'edit user profile info'
  try {
    const auth = userRouteGuard(req);
    if (auth) {
      const result = await editProfileInfo(req.body, auth.authData.userId);
      if (result != null) {
        res.status(200).send(result);
      } else {
        res.status(403).send("Not authorized");
      }
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.post("/get-user-info", userUploader.any(), async (req, res) => {
  // #swagger.tags = ['Users' , 'Admin']
  // #swagger.description = 'It is an API to let admin to get specific user information by his id '
  /*
      #swagger.parameters['userId'] = {
                type: "integer",
                in: 'formData',
        }
    */
  // #swagger.summary = 'get user info'
  try {
    const auth = adminRouteGuard(req);
    if (auth) {
      let result = await getUserInfo(req.body);
      res.status(200).send(result);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

// userRoute.post("/forgot-password" , userUploader.none(),async (req , res) => {
//     try{
//       const userData = userRouteGuard(req);
//       if(userData){
//         await forgotPassword(req.body);
//         res.status(200).send("Password reseted");
//       }else{
//         res.status(403).send("Not authorized");
//       }}
//    catch (e) {
//     ErrorLogger(e, req.originalUrl);
//     res.status(400).send("An error has occurred");
//   }
// });

userRoute.get("/users-nft-count", async (req, res) => {
  // #swagger.tags = ['Users' , 'Admin']
  // #swagger.description = 'It is an API to let admin to get all users and their nft count'
  // #swagger.summary = 'get users nft count'
  try {
    const auth = adminRouteGuard(req);
    if (auth) {
      let result = await getUserNftCount();
      res.status(200).send(result);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    console.log(e);
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.post("/change-password", userUploader.any(), async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'It is an API to let user change his password '
  /*
      #swagger.parameters['password'] = {
                type: "string",
                in: 'formData',
        }
        #swagger.parameters['newPassword'] = {
                type: "string",
                in: 'formData',
        }
        #swagger.parameters['userId'] = {
                type: "integer",
                in: 'token data',
        }
    */
  // #swagger.summary = 'change password'
  try {
    const auth = userRouteGuard(req);
    if (auth) {
      let result = await changePassword(req.body, auth.authData.userId);
      if (result) {
        res.status(200).send("Password changed !!!!");
      } else {
        res.status(500).send("cannot change password !!!");
      }
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.get("/get-user-nft", async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'It is an API to let user get hist nft '
  /*
      #swagger.parameters['walletAddress'] = {
                type: "string",
                in: 'token data',
        }
    */
  // #swagger.summary = 'get user nft'
  try {
    const auth = userRouteGuard(req);
    if (auth) {
      const result = await getUserNft(auth.authData.walletAddress);
      res.status(200).send(result);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

userRoute.get("/nft-collection-count/:wallet", async (req, res) => {
  // #swagger.tags = ['Users' , 'Admin']
  // #swagger.description = 'It is an API to let admin get count of user nft and collection by user wallet address'
  /*
      #swagger.parameters['wallet'] = {
                type: "string",
                in: 'request.params',
        }
    */
  // #swagger.summary = 'get user nft and collection count'
  try {
    const auth = adminRouteGuard(req);
    if (auth) {
      let result = await getCountOfUserNftAndCollection(req.params.wallet);
      res.status(200).send(result);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (e) {
    console.log(e);
    ErrorLogger(e, req.originalUrl);
    res.status(400).send("An error has occurred");
  }
});

export default userRoute;
