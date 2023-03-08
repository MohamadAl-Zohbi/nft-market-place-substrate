import "./style.css";
import { useState } from "react";
import { FaTwitterSquare, FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare, FaWhatsappSquare } from 'react-icons/fa';
import { generateRandomColor, addOpacityToHexColor } from '@/plugins/global'
import PaginationCard from "../../../components/pagination"
import Card from "@/components/cards/card";
import { Link } from "react-router-dom";


//import from mui
import Grid from '@mui/material/Grid';
import LanguageIcon from '@mui/icons-material/Language';
import { TextField, Button } from "@mui/material";

// import images
import ArtImage from '@img/robot-three.png'
import Eth from '@img/icon-ethereu.png'
import project from '@img/project.png'
import project1 from '@img/project1.png'
import project2 from '@img/project2.png'
import project3 from '@img/project3.png'
import project4 from '@img/project4.png'
import project5 from '@img/project5.png'
import project6 from '@img/project6.png'
import project7 from '@img/project7.png'
import project8 from '@img/project8.png'

export default function UserCollectionPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const num = []
    for (let index = 0; index < 55; index++) {
        num.push(index)
    }

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div id="user-page">
            <Grid container component="main">

                <Grid item xs={12} sx={{ borderBottom: '3px solid #fb0', borderTop: '3px solid #fb0' }} className='user-page-bdg'>
                    <div className='container'>
                        <Grid container xs={12} className='justify-between' sx={{
                            padding: '10px 0',
                        }}>

                            <Grid item xs={12} md={12} lg={5}>
                                <div className='card' style={{
                                    background: '#3e2964',
                                    border: `2px solid var(--yellow-color)`,
                                    boxShadow: `0px  1px 8px 2px rgb(255 0 169)`,
                                    padding: '22px 5px',
                                    maxWidth: '350px'
                                }}>
                                    <div className="card-body">
                                        <img src={ArtImage} alt='' style={{ border: '2px solid var(--yellow-color)', height: '250px', borderRadius: '10px', boxShadow: `0px  1px 6px 2px rgb(255 0 169)` }} />
                                        <div className="content">
                                            <h6 style={{ marginBottom: '15px' }}>Arts Bloks</h6>
                                            <div className="flex justify-between align-i-center">
                                                <div className="column justify-between gap-1">
                                                    <label>Price</label>
                                                    <span>8.9K</span>
                                                </div>
                                                <div className="column justify-between align-i-end gap-1">
                                                    <label>Highest Bid</label>
                                                    <span>0.032K</span>
                                                </div>
                                                <div className="column justify-between align-i-end gap-1">
                                                    <label>Total Vol</label>
                                                    <div className="flex justify-center align-i-center">
                                                        <img src={Eth} alt='' style={{ width: '15px' }} />
                                                        <span>13K</span>
                                                    </div>
                                                </div>
                                                <div className="column justify-between align-i-end gap-1">
                                                    <label>Floor</label>
                                                    <div className="flex justify-center align-i-center">
                                                        <img src={Eth} alt='' style={{ width: '15px' }} />
                                                        <span>0.00322</span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} lg={7} className='flex align-i-center justify-center'>
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
                        num.slice((currentPage - 1) * 12, currentPage * 12).map(item => {
                            const color = generateRandomColor()
                            const backgroundColor1 = addOpacityToHexColor(color, .4)
                            const backgroundColor2 = addOpacityToHexColor(color, .3)
                            const array = [project, project1, project2, project3, project4, project5, project6, project7, project8]
                            const random = Math.floor(Math.random() * array.length);
                            return (
                                <Grid item key={item} xs={12} sm={6} md={4} lg={3}>
                                    <div>
                                        <Card
                                            color={color}
                                            backgroundColor1={backgroundColor1}
                                            backgroundColor2={backgroundColor2}
                                            image={array[random]}
                                            title='Bad Ape'
                                            price='0.2013 ETH'
                                            highestBid='1.226 wETH'
                                        />
                                    </div>
                                </Grid>

                            )
                        })
                    }
                </Grid>
                <PaginationCard count={Math.ceil(num.length / 12)}
                    page={currentPage}
                    onChange={handleChangePage} />
            </div>
        </div >
    )
}
