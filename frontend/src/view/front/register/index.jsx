import "./style.css";
import { useState } from "react";
import RegisterImage from "@img/register-image.png"
import FrontTextField from "../../../components/front-textfield"
import FrontTextFieldPassword from "../../../components/front-text-field-password"
import { Link } from "react-router-dom";
import { loading, snackbarMsg } from "@/plugins/global";
import axiosFunction from "./api";
import { useNavigate } from "react-router-dom";

//import from mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PhotoCamera from "@mui/icons-material/PhotoCamera";


export default function RegisterPage() {
    const navigate = useNavigate()
    const [file, setFile] = useState();
    const [filepreview, setFilePreview] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [handleConfirmPassword, setHandleConfirmPassword] = useState(false);
    const [handelError, sethandelError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        gender: false,
        profileImg: false,
    })

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: "",
        gender: 0,
        password: "",
        profileImg: "No File Chosen",
    });

    const registerHandleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value });
        sethandelError(false)
        if (name === 'confirmPassword') {
            setConfirmPassword(value)
            if (value === data.password) {
                setHandleConfirmPassword(false)
            } else {
                setHandleConfirmPassword(true)
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.firstName === "") {
            sethandelError({ ...handelError, firstName: true })
        }
        else if (data.lastName === "") {
            sethandelError({ ...handelError, lastName: true })

        }
        else if (data.email === "") {
            sethandelError({ ...handelError, email: true })

        }
        else if (data.password === "") {
            sethandelError({ ...handelError, password: true })

        }
        else if (data.gender === 0) {
            sethandelError({ ...handelError, gender: true })

        }
        else if (data.profileImg === "No File Chosen") {
            sethandelError({ ...handelError, profileImg: true })
        }
        else if (handleConfirmPassword === false) {
            var formData = new FormData();
            formData.append("profileImg", file);
            formData.append("firstName", data.firstName);
            formData.append("lastName", data.lastName);
            formData.append("email", data.email);
            formData.append("gender", data.gender);
            formData.append("password", data.password);
            loading(true);
            axiosFunction
                .signup(formData)
                .then((res) => {
                    loading(false);
                    navigate("/login");
                })
                .catch((_e) => {
                    loading(false);
                    snackbarMsg("Register Error");
                });
        }
        else {
            snackbarMsg("confirm password does not match")
        }
    };

    const handelChangeImage = (e) => {
        e.preventDefault();
        try {
            setFilePreview(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0]);
            setData({ ...data, profileImg: e.target.files[0].name });
            sethandelError(false)
        } catch (Ex) { }
    };

    return (
        <div id="register-page">
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid item xs={0} md={6} className="login-image">
                    <img className="login-img" src={RegisterImage} alt="login" />
                </Grid>

                <Grid item xs={12} md={6} className="column align-i-center justify-center"
                    style={{ padding: '20px', backgroundColor: 'var(--primary-color)' }} >
                    <div>
                        <form onSubmit={handleSubmit} style={{ width: '100%', minWidth: '300px' }}>

                            <h1 className="fs-24" style={{ color: 'var(--yellow-color)' }}>Sign up on Blockchain</h1>
                            <div className="firstname-lastname">
                                <div className='fn-ln'>
                                    <FrontTextField
                                        onChange={registerHandleChange}
                                        label="First Name"
                                        placeholder="Enter Your First Name"
                                        value={data.email}
                                        name='firstName'
                                        handleError={handelError.firstName}
                                        messageError={'First Name is required'}

                                    />

                                </div>
                                <div className='fn-ln'>
                                    <FrontTextField
                                        onChange={registerHandleChange}
                                        label="Last Name"
                                        placeholder="Enter Your Last Name"
                                        value={data.lastName}
                                        name='lastName'
                                        handleError={handelError.lastName}
                                        messageError={'Last Name is required'}

                                    />
                                </div>
                            </div>
                            <FrontTextField
                                onChange={registerHandleChange}
                                label="Email"
                                placeholder="Enter Your Email Address"
                                value={data?.email}
                                name='email'
                                handleError={handelError.email}
                                messageError={'Email is required'}
                            />
                            <FrontTextFieldPassword
                                onChange={registerHandleChange}
                                label="Set Password"
                                placeholder="Set Password"
                                value={data.password}
                                name='password'
                                handleError={handelError.password}
                                messageError={'Password is required'}
                            />
                            <FrontTextFieldPassword
                                label="Confirm Password Password"
                                placeholder="Confirm Password"
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={registerHandleChange}
                                handleError={handleConfirmPassword}
                                messageError={'password does not match'}
                            />

                            <div className="register-textfield-info">
                                <label className="type">Gender:</label>
                                <FormControl sx={{ marginLeft: "10px" }}>
                                    <RadioGroup row name="gender" onChange={registerHandleChange} >
                                        <FormControlLabel
                                            value="1"
                                            control={<Radio />}
                                            label="Male"
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: "18px",

                                                },
                                                "& .MuiTypography-root": {
                                                    fontSize: "14px",
                                                },
                                                "& .MuiButtonBase-root": {
                                                    color: "#3D5A80"
                                                }
                                            }}
                                        />
                                        <FormControlLabel
                                            value="2"
                                            control={<Radio />}
                                            label="Female"
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: "18px",
                                                },

                                                "& .MuiTypography-root": {
                                                    fontSize: "14px",
                                                },
                                                "& .MuiButtonBase-root": {
                                                    color: "#3D5A80"
                                                }
                                            }}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            {
                                handelError.gender &&
                                <span className="handle-error">Gender is required</span>
                            }
                            <div className="register-textfield-info">
                                <label className="type">Image:</label>
                                <IconButton color="primary" component="label">
                                    <PhotoCamera />
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={handelChangeImage}
                                    />
                                </IconButton>

                            </div>
                            {filepreview && (
                                <img
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                    src={filepreview === null ? "" : filepreview}
                                    alt=""
                                />
                            )}


                            {
                                handelError.profileImg &&
                                <span className="handle-error">No File Chosen</span>
                            }

                            <Button
                                type="confirm"
                                fullWidth
                                variant="contained"
                                className="register-button"
                            >
                                Confirm
                            </Button>
                            <div className="sign-in">
                                Already have an account?
                                <Link to="/login" variant="body2">
                                    Log In
                                </Link>
                            </div>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div >
    )
}
