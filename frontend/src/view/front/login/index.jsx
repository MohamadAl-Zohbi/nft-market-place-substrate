import "./style.css";
import { useState, useEffect } from "react";
import LoginImage from "@img/login-image.png"
import { Link } from "react-router-dom";
import FrontTextField from "../../../components/front-textfield"
import FrontTextFieldPassword from "../../../components/front-text-field-password"
import axiosFunction from "./api";

//import from mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const initialData = { email: '', password: '' }

export default function LoginPage() {
    const [data, setData] = useState(initialData);
    const [handelError, sethandelError] = useState({
        email: false,
        password: false,
    })

    const loginHandleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value });
        sethandelError(false)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.email === "") {
            sethandelError({ ...handelError, email: true })
        }
        else if (data.password === "") {
            sethandelError({ ...handelError, password: true })
        }
        else {
            axiosFunction
                .login(data)
                .then((res) => {
                    if (res.status === 200) {
                        setData(initialData);
                        localStorage.setItem("token", res.data);
                        window.location.replace("/");
                    }
                })
        }
    }

    useEffect(() => {
    }, []);

    return (
        <div id="login-page">
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid item xs={0} md={6} className="login-image">
                    <img className="login-img" src={LoginImage} alt="login" />
                </Grid>

                <Grid item xs={12} md={6} className="column align-i-center justify-center"
                    style={{ padding: '20px', backgroundColor: 'var(--primary-color)' }} >

                    <form onSubmit={handleSubmit} style={{ width: '75%', minWidth: '300px' }}>

                        <h1 className="fs-24" style={{ color: 'var(--yellow-color)' }}>Login</h1>
                        <FrontTextField
                            label="Email"
                            placeholder="Enter Your Email Address"
                            name="email"
                            value={data.email}
                            onChange={loginHandleChange}
                            handleError={handelError.email}
                            messageError={'Email is required'}
                        />

                        <FrontTextFieldPassword
                            label="Set Password"
                            placeholder="Enter Your Password"
                            name="password"
                            value={data.password}
                            onChange={loginHandleChange}
                            handleError={handelError.password}
                            messageError={'Password is required'}
                        />
                        <Button
                            type="confirm"
                            fullWidth
                            variant="contained"
                            className="login-button"
                        >
                            Confirm
                        </Button>
                        <div className="sign-up">
                            Don't have an account?
                            <Link to="/register" variant="body2">
                                SignUp
                            </Link>
                        </div>
                    </form>

                </Grid>
            </Grid>
        </div>
    )
}
