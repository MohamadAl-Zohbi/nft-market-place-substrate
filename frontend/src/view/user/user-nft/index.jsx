import { useState, useEffect, useCallback } from "react";
import axiosFunction from "./api";
import { generateRandomColor, addOpacityToHexColor } from '@/plugins/global'
import Card from "@/components/cards/card";
import PaginationCard from "@/components/pagination";
import { Link } from "react-router-dom";


import "./style.css";

// import MUI
import { Grid, Button, TextField } from '@mui/material';

export default function UserNftPage() {
    const [search, setSearch] = useState('')
    const [nftByUser, setNftByUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const getNftByUser = useCallback(() => {
        axiosFunction.getNftByUser()
            .then((res) => {
                console.log("s", res.data)
                setNftByUser(res.data);
            })
    }, [])

    useEffect(() => {
        getNftByUser();
    }, [getNftByUser]);


    return (
        <div id="user-nft-page">
            <div className="container">
                <Grid container sx={{ padding: '50px 0' }} >
                    <Grid item xs={12}>
                        <div>
                            <h5 className="title">My NFTs</h5>
                        </div>
                    </Grid>
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
                        nftByUser.slice((currentPage - 1) * 12, currentPage * 12).filter((item) =>
                            item.name.toLowerCase().includes(search.toLowerCase())
                        ).map(item => {
                            const color = generateRandomColor()
                            const backgroundColor1 = addOpacityToHexColor(color, .4)
                            const backgroundColor2 = addOpacityToHexColor(color, .3)
                            return (
                                <Grid item key={item} xs={12} sm={6} md={4} lg={3}>
                                    <div>
                                        <Link to={`/card/${item.id}`}>
                                            <Card
                                                color={color}
                                                backgroundColor1={backgroundColor1}
                                                backgroundColor2={backgroundColor2}
                                                image={`${item?.image?.path}/${item?.image?.uuid}`}
                                                title={item.name}
                                                label1={'Price'}
                                                data1={item?.currentPrice}
                                                label2={'Likes'}
                                                data2={item?.favoriteCount}
                                            />
                                        </Link>
                                    </div>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <PaginationCard count={Math.ceil(nftByUser.length / 12)}
                    page={currentPage}
                    onChange={handleChangePage} />
            </div>
        </div >
    )
}
