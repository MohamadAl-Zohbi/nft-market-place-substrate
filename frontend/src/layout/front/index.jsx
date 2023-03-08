import { useState, useContext, useEffect } from "react";
import UserContext from "@/context/user-context";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileImage from "@img/profile-icon.png";
import Logo from "@img/logo.png";
import "./style.css";

//import from mui
import { FaTwitterSquare, FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare, FaWhatsappSquare } from 'react-icons/fa';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import CollectionsIcon from '@mui/icons-material/Collections';
import SegmentIcon from "@mui/icons-material/Segment";
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

function Layout({ element }) {
    const userData = useContext(UserContext);
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();
    const OpenDrower = () => {
        setOpenDrawer(true);
    };

    const logout = () => {
        localStorage.removeItem('token')
    }

    const login = () => {
        navigate('/login')
    }

    useEffect(() => {
        if (localStorage.getItem("admin")) {
            navigate("/admin");
            return;
        }
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }
    }, [navigate]);

    return (
        <div>
            <div id="front-header">
                <div className="container" >
                    <div className="flex justify-between align-i-center gap-4 ">
                        <img src={Logo} alt="logo" style={{ width: '6rem' }} />
                        <ul className="nav-desktop flex justify-center align-i-center gap-4 italic">
                            <TextField
                                placeholder="Search"
                                size="small"
                                id="search-bar"
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        background: "var(--light-gray)",
                                        borderRadius: '50px',
                                        minWidth: '300px',
                                        "& input": {
                                            fontSize: "14px",
                                            padding: '6px 15px',
                                        },
                                        "& input::placeholder": {
                                            fontSize: "14px",
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: "var(--second-color-hover)",

                                        }
                                    },
                                }}
                            />
                            <NavLink to="/">
                                <li>Explore</li>
                            </NavLink>
                            <NavLink to="/">
                                <li>Create</li>
                            </NavLink>
                            <NavLink to="/">
                                <li>Sell</li>
                            </NavLink>
                        </ul>

                        <div className="nav-desktop nav-button flex justify-center align-i-center gap-1 p-2">
                            {userData.user ? (
                                <div className="profile flex align-i-center">
                                    <span className="name">{userData.user.firstName}</span>
                                    <img src={ProfileImage} className="pointer" alt="profile" style={{ width: '1.5rem' }} />
                                    <div className="menu">
                                        <NavLink to="/user/my-profile">
                                            <li><AccountCircleIcon sx={{ marginRight: '5px', fontSize: '18px' }} />Profile</li>
                                        </NavLink>
                                        <NavLink to="/">
                                            <li><AccountBalanceWalletIcon sx={{ marginRight: '5px', fontSize: '18px' }} />Wallet</li>
                                        </NavLink>
                                        <NavLink to="/user/my-collection">
                                            <li><CollectionsBookmarkIcon sx={{ marginRight: '5px', fontSize: '18px' }} />My Collection</li>
                                        </NavLink>
                                        <NavLink to="/user/my-nft">
                                            <li><CollectionsIcon sx={{ marginRight: '5px', fontSize: '18px' }} />My NFT</li>
                                        </NavLink>
                                        <NavLink to="/user/create-collection">
                                            <li><CreateNewFolderIcon sx={{ marginRight: '5px', fontSize: '18px' }} />Create Collection</li>
                                        </NavLink>
                                        <NavLink to="/user/create-nft">
                                            <li><MovieFilterIcon sx={{ marginRight: '5px', fontSize: '18px' }} />Create NFT</li>
                                        </NavLink>
                                        <NavLink to="/login" onClick={() => logout()}>
                                            <li><LogoutIcon sx={{ marginRight: '5px', fontSize: '18px' }} />Signout</li>
                                        </NavLink>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <button className="btn" onClick={() => login()}>
                                        login
                                    </button>
                                    <img src={ProfileImage} className="pointer" alt="profile" style={{ width: '1.5rem' }} />
                                </>
                            )}
                        </div>

                        <button
                            className="btn-open-menu flex justify-center align-i-center btn"
                            onClick={() => OpenDrower()}
                        >
                            <SegmentIcon className="fs-24" sx={{ color: "var(--white-color)" }} />
                        </button>
                    </div>
                    <Drawer
                        className="front-nav-mobile"
                        open={openDrawer}
                        onClose={() => setOpenDrawer(false)}
                    >
                        <div className="body column align-i-center">
                            <img src={Logo} alt="logo" style={{ width: "125px", padding: "20px 50px" }} />
                            <ul className="column">
                                <NavLink to="/">
                                    <li>Explore</li>
                                </NavLink>
                                <NavLink to="/">
                                    <li>Create</li>
                                </NavLink>
                                <NavLink to="/">
                                    <li>Sell</li>
                                </NavLink>
                                <li>
                                    <button className="btn" style={{ color: "#a2ae32" }}>
                                        Reward
                                    </button>
                                </li>
                                <Divider className="divider" />
                                {userData.user ? (
                                    <>
                                        <NavLink to="/">
                                            <li>
                                                <img src={ProfileImage} alt="profile" className="pointer" style={{ width: '1.5rem' }} />
                                            </li>
                                        </NavLink>
                                        <li>
                                            <button className="btn" onClick={() => logout()}>
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn" onClick={() => login()}>
                                            login
                                        </button>
                                        <img src={ProfileImage} alt="profile" className="pointer" style={{ width: '1.5rem' }} />
                                    </>
                                )}

                            </ul>
                        </div>
                    </Drawer>
                </div>
            </div>

            <div id="user-content" style={{ background: '#0e0a38' }}>{element}</div>

            <div id="user-footer">
                <div className="container">
                    <div className="footer-content flex align-i-center justify-around" >

                        <div className="nfts-information flex gap-4">
                            <div className="link">
                                <h3>AIRNFTS</h3>
                                <a href="/"><p>Create</p></a>
                                <a href="/"><p>Explore</p></a>
                                <a href="/"><p>Collections</p></a>
                            </div>
                            <div className="link">
                                <h3>INFORMATION</h3>
                                <a href="/"><p>Get verified</p></a>
                                <a href="/"><p>Privacy policiy</p></a>
                                <a href="/"><p>Terms of service</p></a>
                            </div>
                        </div>
                        <div className="copy-right column align-i-center justify-center">
                            <img src={Logo} alt="logo" style={{ width: '10rem' }} />
                            <p>Copy Right © 2023 -NFT</p>
                        </div>

                        <div className="subscribe-follow align-i-center">
                            <div>
                                <h3>Subscribe to our newsletter</h3>
                                <div className="subscribe-follow-container flex align-i-start">
                                    <TextField
                                        margin="dense"
                                        required
                                        fullWidth
                                        size="small"
                                        placeholder='Enter your email'
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                background: "var(--light-gray)",
                                                borderRadius: '10px',
                                                "& input::placeholder": {
                                                    fontSize: "12px"
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: "var(--second-color-hover)",
                                                }
                                            },
                                        }}
                                    />
                                    <button>Subscribe</button>
                                </div>
                            </div>
                            <div>
                                <h3>Follow Us on</h3>
                                <div className="icon flex align-i-center gap-1">
                                    <a href="/" className="icon">
                                        <FaFacebookSquare style={{ color: 'var(--white-color)', fontSize: "40px" }} />
                                    </a>
                                    <a href="/">
                                        <FaTwitterSquare style={{ color: 'var(--white-color)', fontSize: "40px" }} />
                                    </a>
                                    <a href="/">
                                        <FaInstagramSquare style={{ color: 'var(--white-color)', fontSize: "40px" }} />
                                    </a>
                                    <a href="/">
                                        <FaYoutubeSquare style={{ color: 'var(--white-color)', fontSize: "40px" }} />
                                    </a>
                                    <a href="/">
                                        <FaWhatsappSquare style={{ color: 'var(--white-color)', fontSize: "40px" }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Layout