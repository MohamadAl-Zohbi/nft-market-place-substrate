import { useState, useEffect, useCallback } from "react";
import { generateRandomColor, addOpacityToHexColor } from '@/plugins/global'
import axiosFunction from "./api";
import Card from "@/components/cards/card";
import PaginationCard from "@/components/pagination"


import "./style.css";

// import MUI
import { Grid, Button, TextField } from '@mui/material';

export default function FrontExplorePage() {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [nft, setNfts] = useState([])

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const getNft = useCallback(() => {
        axiosFunction.getNft()
            .then((res) => {
                setNfts(res.data);
            })
    }, [])

    useEffect(() => {
        getNft()
    }, [getNft]);


    return (
        <div id="explore">
            <div className="container">
                <Grid container sx={{ padding: '50px 0' }} >
                    <Grid item xs={12}>
                        <div>
                            <h5 className="title">NFTs</h5>
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
                        nft.slice((currentPage - 1) * 12, currentPage * 12).filter((item) =>
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
                                            image={`http://localhost/backend/${item.image.path}`}
                                            title={item.name}
                                            label1={'Price'}
                                            data1={`${item.currentPrice} ETH`}
                                            label2={'Highest Bid'}
                                            data2={`3.64 wETH`}
                                        />
                                    </div>
                                </Grid>
                            )

                        })
                    }

                </Grid>

                <PaginationCard count={Math.ceil(nft.length / 12)}
                    page={currentPage}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    )
}