import { useState, useEffect, useCallback } from "react";
import Table from '@/components/table/table'
import axiosFunction from "./api";
import PaginationCard from "@/components/pagination"

import "./style.css";

// import MUI
import { Grid, Button, TextField } from '@mui/material';


const colomn = [
    { name: 'Top Collections', flex: 10 },
    { name: 'Total Vol', flex: 5 },
    { name: 'Owners', flex: 5 },
    { name: 'Items', flex: 5 },
]

export default function FrontCollectionPage() {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [allcollection, setAllCollections] = useState([])

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const getAllCollection = useCallback(() => {
        axiosFunction.getAllCollections()
            .then((res) => {
                setAllCollections(res.data);
            })
    }, [])


    useEffect(() => {
        getAllCollection()
    }, [getAllCollection]);

    return (
        <div id="collection">
            <div className="container">
                <Grid container sx={{ padding: '50px 0' }} >
                    <Grid item xs={12}>
                        <div>
                            <h5 className="title">Rankings</h5>
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
                    <Grid item xs={12} >
                        <div>
                            <Table colomn={colomn} row={allcollection.slice((currentPage - 1) * 12, currentPage * 12).filter((item) =>
                                item.name.toLowerCase().includes(search.toLowerCase())
                            )} />
                        </div>
                    </Grid>
                </Grid>
                <PaginationCard count={Math.ceil(allcollection.length / 12)}
                    page={currentPage}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    )
}