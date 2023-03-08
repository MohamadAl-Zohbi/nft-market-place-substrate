import LinearProgress from "@mui/material/LinearProgress";
function Loader({ loader }) {
    if (loader) {
        return <div className="loader"><LinearProgress color="secondary" /></div>
    }
    else {
        return <div></div>
    }
} export default Loader;