import "./style.css";
import { useState, useCallback, useEffect, useContext } from "react";
import UserContext from "@/context/user-context";
import axiosFunction from "./api";
import { useNavigate } from "react-router-dom";
import Image from '@/components/image'

//import from mui
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from "@mui/material";


export default function CreateNftPage() {
    const navigate = useNavigate()
    const userData = useContext(UserContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [buttonVisible, setButtonVisible] = useState(true);
    const [collections, setCollections] = useState([]);

    const [data, setData] = useState({
        name: '',
        description: '',
        currentPrice: '',
        collectionId: '',
        ownerWalletId: '',
        image: '',
    });

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
        setButtonVisible(false);
    };

    const HandleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("currentPrice", data.currentPrice);
        formData.append("ownerWalletId", userData.user?.wallets[0]?.id);
        formData.append("collectionId", data.collectionId);
        axiosFunction.createNft(formData)
            .then((res) => {
                alert('Success')
                navigate("/user/my-nft");
            })
    }

    const getAllCollections = useCallback(() => {
        axiosFunction.getAllCollections()
            .then((res) => {
                setCollections(res.data);
            })
    }, [])

    useEffect(() => {
        getAllCollections();
    }, [getAllCollections]);



    return (
        <div id="create-nft-page">
            <Grid container component="main">

                <Grid item xs={12} className="text-align-center" sx={{ backgroundColor: 'var(--primary-color)', color: 'var(--light-white-color)', marginBottom: '20px' }}>
                    <div>
                        <h1 style={{ margin: '15px', fontSize: '30px' }}>Create Nft</h1>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} sx={{}} className="text-align-center" >
                    <div className="create-nft-img-container">
                        {buttonVisible && (
                            <label className="upload-button">
                                <input type="file" onChange={handleFileSelect}
                                />
                                Upload Image
                            </label>
                        )}
                        {selectedFile && (
                            <Image src={URL.createObjectURL(selectedFile)} alt="Selected file" style={{ width: '100%', height: '100%', maxHeight: '500px', borderRadius: '14px', objectFit: 'cover' }} />
                        )}

                    </div>
                </Grid>


                <Grid item xs={12} md={6} className="column align-i-center" >

                    <form style={{ width: '75%', minWidth: '300px' }}>
                        <div className="textfield-create-nft">
                            <label>NFT Name</label>
                            <TextField
                                margin="dense"
                                fullWidth
                                autoFocus
                                name='name'
                                size="small"
                                placeholder='Enter the NFT name here'
                                onChange={HandleChange}
                                value={data?.name}
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
                        </div>

                        <div className="textfield-create-nft">
                            <label>Current Price</label>
                            <TextField
                                margin="dense"
                                fullWidth
                                autoFocus
                                name='currentPrice'
                                size="small"
                                placeholder='Enter the current price here'
                                onChange={HandleChange}
                                value={data?.currentPrice}
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
                        </div>


                        <div className="textfield-create-nft">
                            <label style={{ marginBottom: '10px' }}>NFT Description</label>
                            <textarea
                                name="description"
                                placeholder='Enter the NFT description here'
                                id="description_input"
                                cols="30"
                                rows="5"
                                required
                                onChange={HandleChange}
                                value={data?.description}
                            ></textarea>
                        </div>

                        <div className="textfield-create-nft">
                            <label>Select Collection</label>
                            <div className="nft-collection">
                                <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        name="collectionId"
                                        value={data.collectionId}
                                        onChange={HandleChange}
                                    >
                                        {collections.map(item => {
                                            return (
                                                <MenuItem value={item?.id} key={item?.id}>{item?.name}</MenuItem>
                                            )
                                        })
                                        }
                                    </Select>
                                </FormControl>
                                <Button className="button-nft" onClick={handleSubmit}>Create</Button>
                                {/* <button onClick={handleSubmit}>Create</button> */}
                            </div>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </div >
    )
}
