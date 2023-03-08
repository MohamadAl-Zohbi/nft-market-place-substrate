import {
    createBrowserRouter
} from "react-router-dom";
import FrontHomePage from "../view/front/home";
import FrontLayout from "@/layout/front"
import FrontLoginPage from "@/view/front/login"
import FrontRegisterPage from "@/view/front/register"
import ContactUsFrontPage from "../view/front/contact-us";
import AboutUsFrontPage from "../view/front/about-us";
import CreateNftUserPage from "../view/user/create-nft"
import FrontExplorePage from "../view/front/explore";
import FrontCollectionPage from "../view/front/collections";
import FrontCardInfoPage from "../view/front/card-info";
import UserCollectionPage from "../view/user/collection";
import CreateCollectionPage from "../view/user/create-collection";
import UserNftPage from "../view/user/user-nft";
import UserPage from "../view/user/page-user"
import UserProfilePage from "../view/user/profile"



const router = createBrowserRouter([

    // Signup Signin Route
    { path: "/login", element: <FrontLoginPage /> },
    { path: "/register", element: <FrontRegisterPage /> },

    // Front Route
    { path: "/", element: <FrontLayout element={<FrontHomePage />} /> },
    { path: "/card/:id", element: <FrontLayout element={<FrontCardInfoPage />} /> },
    { path: "/collection", element: <FrontLayout element={<FrontCollectionPage />} /> },
    { path: "/explore", element: <FrontLayout element={<FrontExplorePage />} /> },
    { path: "/contact-us", element: <FrontLayout element={<ContactUsFrontPage />} /> },
    { path: "/about-us", element: <FrontLayout element={<AboutUsFrontPage />} /> },

    //User Route
    { path: "/user/my-profile", element: <FrontLayout element={<UserProfilePage />} /> },
    { path: "/user/create-collection", element: <FrontLayout element={<CreateCollectionPage />} /> },
    { path: "/user/create-nft", element: <FrontLayout element={<CreateNftUserPage />} /> },
    { path: "/user/collection",element: <FrontLayout element={ <UserCollectionPage />}/>},
    { path: "/user/my-collection",element: <FrontLayout element={ <UserCollectionPage />}/>},
    { path: "/user/my-nft",element: <FrontLayout element={ <UserNftPage />}/>},
    { path: "/user/page",element: <FrontLayout element={ <UserPage />}/>},


]);
export default router;