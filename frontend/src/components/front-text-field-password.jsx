import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';


function FrontTextFieldPassword({ onChange, label, placeholder, name, error, helperText, message, handleError, messageError }) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <div>
            <div className="textfield-login-register">
                <label>{label}</label>
                <FormControl variant="outlined" margin="dense"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            background: "var(--light-gray)",
                            borderRadius: '10px',
                            "& input::placeholder": {
                                fontSize: "12px"
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: "var(--second-color-hover)",

                            },

                        },
                    }}>
                    <OutlinedInput
                        size="small"
                        id="password"
                        name={name}
                        margin="dense"
                        placeholder={placeholder}
                        autoComplete="on"
                        type={showPassword ? 'text' : 'password'}
                        onChange={onChange}
                        helpertext={helperText}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {{ showPassword } ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {!error === "" && (
                        <FormHelperText error>
                            {message}
                        </FormHelperText>
                    )}

                </FormControl>
                {
                    handleError &&
                    <span className="handle-error">{messageError}</span>
                }
            </div>
        </div>
    )
}

export default FrontTextFieldPassword