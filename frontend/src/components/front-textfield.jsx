import TextField from '@mui/material/TextField';



function FrontTextField({ onChange, label, placeholder, helperText, error, name,handleError,messageError }) {
    return (
        <div>
            <div className="textfield-login-register">
                <label>{label}</label>
                <TextField
                    margin="dense"
                    fullWidth
                    name={name}
                    size="small"
                    placeholder={placeholder}
                    onChange={onChange}
                    error={error}
                    helpertext={helperText ?? null}
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
                {
                    handleError &&
                    <span className="handle-error">{messageError}</span>
                }
            </div>
        </div>
    )
}

export default FrontTextField