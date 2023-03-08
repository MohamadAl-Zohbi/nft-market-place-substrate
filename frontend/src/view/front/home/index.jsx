import { useState, useEffect, useCallback } from "react";
import axiosFunction from "./api";
import { generateRandomColor, addOpacityToHexColor } from '@/plugins/global'
import Card from "@/components/cards/card";
import Table from '@/components/table/table'
import Slider from "react-slick";
import "@/assets/css/slick.css"
import "@/assets/css/slick-theme.css"
import { Link } from "react-router-dom"

import "./style.css";

// import image
import AI from '@img/AI.png'
import wallet from '@img/wallet.png'
import Camera from '@img/camera.png'
import NFT from '@img/NFT.png'
import nft_sell from '@img/nft_sell.png'


// import MUI
import { Grid, Button } from '@mui/material';

const colomn = [
    { name: 'Top Collections', flex: 15 },
    { name: 'Total Vol', flex: 5 },
    { name: 'Owners', flex: 5 },
    { name: 'Items', flex: 5 },
]

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

export default function FrontHomePage() {
    const [lastNfts, setLastNfts] = useState([])
    const [topNfts, setTopTenNfts] = useState([])
    const [topcollections, settopCollections] = useState([])
    const [topCreators, setTopCreators] = useState([])

    const getLastNfts = useCallback(() => {
        axiosFunction.getLastNfts()
            .then((res) => {
                setLastNfts(res.data);
            })
    }, [])

    const getTopTenNft = useCallback(() => {
        axiosFunction.getTopTenNfts()
            .then((res) => {
                setTopTenNfts(res.data);
            })
    }, [])

    const getTopCollection = useCallback(() => {
        axiosFunction.getTopCollections()
            .then((res) => {
                settopCollections(res.data);
            })
    }, [])

    const getTopCreators = useCallback(() => {
        axiosFunction.getTopCreators()
            .then((res) => {
                setTopCreators(res.data);
            })
    }, [])

    useEffect(() => {
        getTopTenNft();
        getTopCollection();
        getLastNfts();
        getTopCreators();
    }, [getTopTenNft, getTopCollection, getLastNfts, getTopCreators]);


    return (
        <div id="home">

            <div className="first-section" >
                <div className='container'>
                    <div className='content'>
                        <h1>Get The Most Popular <span>NFT Collection</span> Here</h1>
                        <div className='text'>The world’s first and largest digital marketplace for crypto collectibles
                            and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.</div>
                        <img src={AI} alt="" />
                    </div>
                </div>
            </div>

            <div className='container'>

                <div className='activities'>
                    <h5 className="title">What we can actually do ?</h5>
                    <Grid container sx={{ margin: '50px 0 0' }} >
                        <Grid item xs={12} sm={6} md={3}>
                            <div className='activity' style={{
                                background: 'rgba(1 179 237 / 20%)',
                                border: '2px solid #01b3ed',
                                boxShadow: '0px 0px 5px 0px #01b3ed',
                            }}>
                                <div className='content' style={{ boxShadow: `inset 0px 0px 5px 0px #01b3ed` }}>
                                    <div style={{ boxShadow: `0 -20px 80px 52px #01b3ed` }} />
                                    <h3>Setup your Wallet</h3>
                                    <div className='text'>Once you've setup your wallet of choise, connect</div>
                                </div>
                                <div className="img">
                                    <img src={wallet} alt="" />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div className='activity' style={{
                                background: 'rgba(9 255 0 / 20%)',
                                border: '2px solid #09FF00',
                                boxShadow: '0px 0px 5px 0px #09FF00',
                            }}>
                                <div className='content' style={{ boxShadow: `inset 0px 0px 5px 0px #09FF00` }}>
                                    <div style={{ boxShadow: `0 -20px 80px 52px #09FF00` }} />
                                    <h3>Setup your Wallet</h3>
                                    <div className='text'>Once you've setup your wallet of choise, connect</div>
                                </div>
                                <div className="img">
                                    <img src={Camera} alt="" />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div className='activity' style={{
                                background: 'rgba(255 0 169 / 20%)',
                                border: '2px solid #FF00A9',
                                boxShadow: '0px 0px 5px 0px #FF00A9',
                            }}>
                                <div className='content' style={{ boxShadow: `inset 0px 0px 5px 0px #FF00A9` }}>
                                    <div style={{ boxShadow: `0 -20px 80px 52px #FF00A9` }} />
                                    <h3>Setup your Wallet</h3>
                                    <div className='text'>Once you've setup your wallet of choise, connect</div>
                                </div>
                                <div className="img">
                                    <img src={nft_sell} alt="" />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div className='activity' style={{
                                background: 'rgba(211 255 0 / 20%)',
                                border: '2px solid #D3FF00',
                                boxShadow: '0px 0px 5px 0px #D3FF00',
                            }}>
                                <div className='content' style={{ boxShadow: `inset 0px 0px 5px 0px #D3FF00` }}>
                                    <div style={{ boxShadow: `0 -20px 80px 52px #D3FF00` }} />
                                    <h3>Setup your Wallet</h3>
                                    <div className='text'>Once you've setup your wallet of choise, connect</div>
                                </div>
                                <div className="img">
                                    <img src={NFT} alt="" />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className="nft-items">
                    <h5 className="title">Last NFTs</h5>
                    <div className="carousel">
                        <Slider {...settings}>
                            {
                                lastNfts.map(item1 => {
                                    const color = generateRandomColor()
                                    const backgroundColor1 = addOpacityToHexColor(color, .4)
                                    const backgroundColor2 = addOpacityToHexColor(color, .3)
                                    return (
                                        <div key={item1}>
                                            <Link to={`/card/${item1.id}`}>
                                                <Card
                                                    color={color}
                                                    backgroundColor1={backgroundColor1}
                                                    backgroundColor2={backgroundColor2}
                                                    image={`${item1?.image?.path}/${item1?.image?.uuid}`}
                                                    title={item1.name}
                                                    label1={'Price'}
                                                    data1={`${item1.currentPrice} ETH`}
                                                    label2={'Highest Bid'}
                                                    data2={`0.64 wETH`}
                                                />
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                    <div className="flex justify-center align-i-center">
                        <Link to="/explore">
                            <Button className="button-nft">Load more</Button>
                        </Link>
                    </div>
                </div>

                <div className="nft-items">
                    <h5 className="title">Top NFTs</h5>
                    <div className="carousel">
                        <Slider {...settings}>
                            {
                                topNfts.map(item2 => {
                                    const color = generateRandomColor()
                                    const backgroundColor1 = addOpacityToHexColor(color, .4)
                                    const backgroundColor2 = addOpacityToHexColor(color, .3)
                                    return (
                                        <div key={item2}>
                                            <Link to={`/card/${item2.id}`}>
                                                <Card
                                                    color={color}
                                                    backgroundColor1={backgroundColor1}
                                                    backgroundColor2={backgroundColor2}
                                                    image={`${item2?.image?.path}/${item2?.image?.uuid}`}
                                                    title={item2.name}
                                                    label1={'Price'}
                                                    data1={`${item2.currentPrice} ETH`}
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
                        <Link to="/explore">
                            <Button className="button-nft">Load more</Button>
                        </Link>
                    </div>
                </div>

                <div className="nft-items">
                    <h5 className="title">Top Collections</h5>
                    <Grid item xs={12} >
                        <div>
                            <Table colomn={colomn} row={topcollections} />
                        </div>
                    </Grid>

                    <div className="flex justify-center align-i-center">
                        <Link to="/collection">
                            <Button className="button-nft">See all collections</Button>
                        </Link>
                    </div>
                </div>

                <div className="nft-items">
                    <h5 className="title">Top Creators</h5>
                    <div className="carousel">
                        <Slider {...settings}>
                            {
                                topCreators.map(item3 => {
                                    const color = generateRandomColor()
                                    const backgroundColor1 = addOpacityToHexColor(color, .4)
                                    const backgroundColor2 = addOpacityToHexColor(color, .3)
                                    return (
                                        <div key={item3}>
                                            <Card
                                                color={color}
                                                backgroundColor1={backgroundColor1}
                                                backgroundColor2={backgroundColor2}
                                                image={`${item3?.image?.path}/${item3?.image?.uuid}`}
                                                title={`${item3?.firstName} ${item3?.lastName}`}
                                                label1={'Nft Count'}
                                                data1={item3?.nftCount}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                    <div className="flex justify-center align-i-center">
                        <Button className="button-nft">Load more</Button>
                    </div>
                </div>

            </div >
        </div >
    )
}