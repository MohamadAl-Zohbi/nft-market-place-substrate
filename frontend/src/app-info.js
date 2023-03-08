import React, { useState, useEffect } from 'react';
import Loader from './components/loader'
import Snackbar from '@mui/material/Snackbar';
import eventEmitter from "@/plugins/event-emitter";

function AppInfo() {
    const [loader, setLoader] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [snkMsg, setSnkMsg] = useState("");
    useEffect(() => { }, [])
    eventEmitter.on('snackbar', (msg) => {
        if (msg === undefined) {
            setSnkMsg('An error has occurred. Please try again later.')
        } else {
            setSnkMsg(msg)
        }
        setSnackbar(true);
    });
    function closeSnackBar() {
        setSnackbar(false);
    }
    eventEmitter.on('loading', (mode) => {
        setLoader(mode)
    });
    return <><Loader loader={loader}></Loader>
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={2000}
            onClose={(e) => { closeSnackBar() }}
            open={snackbar}
            message={snkMsg}
        /></>
}
export default AppInfo