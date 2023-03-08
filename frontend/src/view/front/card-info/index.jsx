import { useState, useEffect, useCallback, useContext } from "react";
import axiosFunction from "./api";
import UserContext from "@/context/user-context";
import { generateRandomColor, addOpacityToHexColor } from '@/plugins/global'
import Card from "@/components/cards/card";
import Slider from "react-slick";
import { useParams, Link } from "react-router-dom";
import Image from "../../../components/image";

import "./style.css";

// import MUI
import { Grid, Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

// import image
import ethereu from '@img/icon-ethereu.png'


const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1224,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 3
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

export default function FrontCardInfoPage() {
    let { id } = useParams();
    const userData = useContext(UserContext);
    const [nftById, setNftById] = useState([])
    const [nftByThisCollection, setNftByThisCollection] = useState([])

    const getNftById = useCallback(() => {
        axiosFunction.getNftById(id)
            .then((res) => {
                setNftById(res.data);
            })
    }, [id])

    const getNftByThisCollection = useCallback(() => {
        axiosFunction.getNftByThisCollection(nftById.collection?.id)
            .then((res) => {
                setNftByThisCollection(res.data);
            })
    }, [nftById.collection?.id])

    useEffect(() => {
        getNftById();
        getNftByThisCollection();
    }, [getNftById, getNftByThisCollection]);

    return (
        <div id="card-info">

            <Grid container >
                <Grid item xs={12} sx={{
                    background: '#210644',
                    padding: '30px 0',
                    borderTop: '3px solid #fb0',
                    borderBottom: '3px solid #fb0',
                }}>
                    <div className="container">
                        <div className="card-content">
                            <Grid container sx={{ justifyContent: 'space-between' }} >
                                <Grid item xs={12} lg={6} xl={4} className='flex justify-center'>
                                    <div className="img-section">
                                        <div className="box-img">
                                            <Image src={`http://localhost/backend/${nftById.image?.path}`} style={{ objectFit: 'cover', borderRadius: '15px', height: '320px', width: '300px', border: "2px solid #fb0" }} />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} lg={6} xl={7} className='flex alin-i-center'>
                                    <div className="info-section">
                                        <h1>{nftById?.name}</h1>
                                        <div className="description">{nftById?.description}
                                        </div>
                                        <div className="flex justify-between align-i-center flex-wrap" style={{ padding: '5px 10px 10px' }}>
                                            <div className="buy-section ">
                                                <h3>Current Price</h3>
                                                <div className="flex justify-between align-i-center">
                                                    <img src={ethereu} alt="" />
                                                    <span>{nftById?.currentPrice} ($2771.39)</span>
                                                </div>
                                            </div>
                                            {userData.user ? (
                                                <Link to='/buy'>
                                                    <Button className="button-nft">Buy Now</Button>
                                                </Link>
                                            ) : (
                                                <Link to='/login'>
                                                    <Button className="button-nft">Buy Now</Button>
                                                </Link>

                                            )}
                                        </div>
                                        <div className="box">
                                            <div className="box-head flex align-i-center">
                                                <LanguageIcon sx={{ color: 'white' }} />
                                                <h5 className="link">{nftById?.ownerWallet?.walletAddress}</h5>
                                            </div>
                                            <div className="section section1">
                                                <h5>Likes</h5>
                                                <h6>{nftById?.favoriteCount}</h6>
                                            </div>
                                            <div className="section section1">
                                                <h5>Collection ID</h5>
                                                <h6>{nftById?.collection?.id}</h6>
                                            </div>
                                            <div className="section section2">
                                                <h5>Collection Name</h5>
                                                <h6>{nftById?.collection?.name}</h6>
                                            </div>
                                            <div className="section section3">
                                                <h5>Owner</h5>
                                                <h6>{nftById?.ownerWallet?.user?.firstName} {nftById?.ownerWallet?.user?.lastName}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} sx={{ padding: '50px 0 40px' }}>
                    <div className="container">

                        <div className="nft-items">
                            <h5 className="title text-center">More from this collection</h5>
                            <div className="carousel">
                                <Slider {...settings}>
                                    {
                                        nftByThisCollection.map(item => {
                                            const color = generateRandomColor()
                                            const backgroundColor1 = addOpacityToHexColor(color, .4)
                                            const backgroundColor2 = addOpacityToHexColor(color, .3)
                                            return (
                                                <div key={item}>
                                                    <Link to={`/card/${item.id}`}>
                                                        <Card
                                                            color={color}
                                                            backgroundColor1={backgroundColor1}
                                                            backgroundColor2={backgroundColor2}
                                                            image={`http://localhost/backend/${item.image.path}`}
                                                            title={item.name}
                                                            label1={'Price'}
                                                            data1={`${item.currentPrice} ETH`}
                                                            label2={'Highest Bid'}
                                                            data2={`3.64 wETH`}
                                                        />
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                            <div className="flex justify-center align-i-center">
                                <Link to="/collection">
                                    <Button className="button-nft">View Collection</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Grid>

            </Grid>

        </div>
    )
}