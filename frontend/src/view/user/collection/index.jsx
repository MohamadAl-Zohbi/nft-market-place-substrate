import "./style.css";
import { useState, useEffect, useCallback } from "react";
import axiosFunction from "./api";
import { FaTwitterSquare, FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare, FaWhatsappSquare } from 'react-icons/fa';
import { generateRandomColor, addOpacityToHexColor } from '@/plugins/global'
import Card from "@/components/cards/card";
import { Link } from "react-router-dom";


//import from mui
import Grid from '@mui/material/Grid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LanguageIcon from '@mui/icons-material/Language';
import { TextField, Button } from "@mui/material";
import PaginationCard from "@/components/pagination"

// import images
import ArtImage from '@img/robot-three.png'
import Eth from '@img/icon-ethereu.png'


export default function UserCollectionPage() {
    const [search, setSearch] = useState('')
    const [collectionById, setCollectionById] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const getCollectionByUser = useCallback(() => {
        axiosFunction.getCollectionByUser()
            .then((res) => {
                console.log("coolecbyid", res.data)
                setCollectionById(res.data);
            })
    }, [])

    useEffect(() => {
        getCollectionByUser();
    }, [getCollectionByUser]);

    return (
        <div id="user-collection-page">
            <Grid container component="main">
                <Grid item xs={12} className='bgd-img'>
                    <div>
                        <BorderColorIcon sx={{ position: 'absolute', bottom: '10px', right: '10px', cursor: 'pointer' }} />
                    </div>
                </Grid>

                <Grid item xs={12} sx={{ backgroundColor: 'var(--primary-color)', borderBottom: '3px solid #fb0', borderTop: '3px solid #fb0' }}>
                    <div className='container'>
                        <Grid container xs={12} className='justify-between' sx={{
                            padding: '25px 0',
                        }}>

                            <Grid item xs={12} lg={4} sx={{ textAlign: 'center' }}>
                                <div className="art-block-container">
                                    <div className="block-img">
                                        <img src={ArtImage} alt="" />
                                    </div>
                                    <div className="art-title">
                                        <h1 style={{ color: 'var(--fushia-color)', textShadow: 'white 2px -1px 5px' }}>Art Blocks</h1>
                                    </div>
                                    <div className="flex justify-center" style={{ gap: '5%' }}>
                                        <div>
                                            <h3>Items</h3>
                                            <span>8.9K</span>
                                        </div>
                                        <div>
                                            <h3>Owners</h3>
                                            <span>2.8K</span>
                                        </div>
                                        <div>
                                            <h3>Total Vol</h3>
                                            <div className="flex justify-center align-i-center">
                                                <img width={20} src={Eth} alt='' />
                                                <span>13K</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3>Floor</h3>
                                            <div className="flex justify-center align-i-center">
                                                <img width={20} src={Eth} alt='' />
                                                <span>0.00322</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} lg={7}>
                                <div className="genesis-collection">
                                    <h1>R Planet - Genesis Collection</h1>
                                    <p>R Planet is a reality that mirrors our own. Where powers, gfts, talents, and culture fuse to create
                                        the world we wanted. Here, actions matter. The dreamers, the builders, and the enthusiasts are
                                        celebrated –– creating a more impactful, decentralized future. R Planet Genesis NFTs grant holders
                                        access to the R Planet ecosystem — connecting utility & financial opportunity with purpose & IRL impact.</p>
                                    <div className="genesis-collection-icon flex align-i-center justify-between">
                                        <div className="icon-link flex align-i-center gap-3">
                                            <LanguageIcon sx={{ color: 'var(--white-color)', fontSize: "40px", cursor: 'pointer' }} />
                                            <Link className="gap-3" style={{ color: 'var(--white-color)' }}>artsblock.io</Link>
                                        </div>
                                        <div className="icon flex gap-1">
                                            <a href="/">
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
                            </Grid>
                        </Grid>
                    </div>
                </Grid >
            </Grid >
            <div className="container">
                <Grid container sx={{ padding: '50px 0' }} >
                    <Grid item xs={12}>
                        <div className="content-search flex gap-2">
                            <TextField
                                required
                                fullWidth
                                size="small"
                                placeholder='Search by NFTs'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                sx={{
                                    maxWidth: '500px',
                                    border: '2px solid #6A2597',
                                    borderRadius: '50px',
                                    margin: '10px 5px',
                                    '& .MuiOutlinedInput-root': {
                                        background: "var(--yellow-color)",
                                        borderRadius: '50px',
                                        "& input": {
                                            padding: "10px 30px",
                                            fontSize: "14px",
                                            color: "#6A2597",
                                            fontStyle: "italic",
                                            fontWeight: "800",
                                        },
                                        "& input::placeholder": {
                                            fontSize: "14px",
                                            color: "#6A2597",
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: "none",
                                        }
                                    },
                                }}
                            />
                            <div className="flex justify-center align-i-center gap-2">
                                <Button className="button-nft">Filter</Button>
                                <Button className="button-nft">Trending</Button>
                            </div>
                        </div>
                    </Grid>
                    {
                        collectionById.slice((currentPage - 1) * 12, currentPage * 12).filter((item) =>
                            item.name.toLowerCase().includes(search.toLowerCase())
                        ).map(item => {
                            const color = generateRandomColor()
                            const backgroundColor1 = addOpacityToHexColor(color, .4)
                            const backgroundColor2 = addOpacityToHexColor(color, .3)
                            return (
                                <Grid item key={item} xs={12} sm={6} md={4} lg={3}>
                                    <div>
                                        <Card
                                            color={color}
                                            backgroundColor1={backgroundColor1}
                                            backgroundColor2={backgroundColor2}
                                            image={`http://localhost/backend/${item?.frontImage2?.path}`}
                                            title={item.name}
                                            label1={'Block Nb'}
                                            data1={item?.blockNumber}
                                            label2={'Nft Count'}
                                            data2={item?.nftCount}
                                        />
                                    </div>
                                </Grid>

                            )
                        })
                    }
                </Grid>

                <PaginationCard count={Math.ceil(collectionById.length / 12)}
                    page={currentPage}
                    onChange={handleChangePage} />
            </div>
        </div >
    )
}
