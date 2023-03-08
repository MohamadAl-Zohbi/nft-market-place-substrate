import { useState } from "react";
import Image from '@/components/image'
import "./style.css";
import axiosFunction from "./api";
import { useNavigate } from "react-router-dom";

//import from mui
import {
    Grid,
    IconButton,
    Button,
    TextField
} from '@mui/material';

import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';

export default function CreateCollectionPage() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState({ backImage: '', frontImage: '' });
    const [backgroundImg, setBackgroundImg] = useState('');
    const [profile, setProfile] = useState('');
    const [data, setData] = useState({
        name: '',
        description: '',
        backImage: '',
        frontImage: '',
    });

    const handleFileSelect = (event) => {
        const { name, files } = event.target
        setSelectedFile({ ...selectedFile, [name]: files[0] });
        if (name === 'backImage') setBackgroundImg(URL.createObjectURL(files[0]))
        else setProfile(URL.createObjectURL(files[0]))

    };

    const HandleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("backImage", selectedFile.backImage);
        formData.append("frontImage", selectedFile.frontImage);
        formData.append("name", data.name);
        formData.append("description", data.description);
        axiosFunction.createCollection(formData)
            .then((res) => {
                alert('Success')
                navigate("/user/my-collection");
            }
            )
    }

    return (
        <div id="create-collection-page">
            <Grid container component="main">
                <Grid item xs={12} className="text-align-center" sx={{ backgroundColor: 'var(--primary-color)', color: 'var(--light-white-color)', marginBottom: '10px' }}>
                    <div>
                        <h1 style={{ margin: '15px', fontSize: '30px' }}>Create Collection</h1>
                    </div>
                </Grid>

                <Grid item xs={12} className="text-align-center" >
                    <div className="container" style={{ position: 'relative' }}>
                        <div className="create-background-image">
                            <Image src={backgroundImg} className="background-image"
                                style={{ width: '100%', height: '100%', borderRadius: '14px' }} />

                            <IconButton
                                component="label"
                                className="icon-change-background"
                                sx={{
                                    position: 'absolute',
                                    color: "#981fdd",
                                    bottom: "0px",
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: '#66666638',
                                    borderRadius: '0',
                                    opacity: 0,
                                    transition: '.3s'
                                }} >
                                <BorderColorSharpIcon fontSize="26px" />
                                <input
                                    type="file"
                                    name="backImage"
                                    onChange={handleFileSelect}
                                    accept="image/*"
                                    hidden
                                />
                            </IconButton>
                        </div>
                        <div className="create-profile-image">
                            <Image src={profile} className="profile-image"
                                style={{ width: '100%', height: '100%', borderRadius: '14px' }} />
                            <IconButton
                                component="label"
                                className="icon-change-profile"
                                sx={{
                                    position: 'absolute',
                                    color: "#981fdd",
                                    bottom: "0px",
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: '#66666638',
                                    borderRadius: '0',
                                    opacity: 0,
                                    transition: '.3s'
                                }} >
                                <BorderColorSharpIcon fontSize="26px" />
                                <input
                                    type="file"
                                    name="frontImage"
                                    onChange={handleFileSelect}
                                    accept="image/*"
                                    hidden
                                />
                            </IconButton>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} className="text-align-center" sx={{ color: 'var(--light-white-color)', margin: '60px 0' }}>
                    <div className="container" style={{ position: 'relative' }}>
                        <div className="textfield-create-nft">
                            <label>Collection Name</label>
                            <TextField
                                margin="dense"
                                fullWidth
                                name='name'
                                size="small"
                                placeholder='Enter the NFT title here'
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
                            <label style={{ marginBottom: '10px' }}>Collection Description</label>
                            <TextField
                                margin="dense"
                                fullWidth
                                name='description'
                                size="small"
                                placeholder='Enter the NFT title here'
                                onChange={HandleChange}
                                value={data?.description}
                                multiline
                                minRows={4}
                                maxRows={4}

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

                        <Button className="button-nft" onClick={handleSubmit}>Create</Button>
                    </div>
                </Grid>
            </Grid>
        </div >
    )
}
