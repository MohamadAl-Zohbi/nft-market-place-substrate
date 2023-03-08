import React, { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import AppInfo from "./app-info";
import axios from "@/plugins/http.service";
import UserContext from "./context/user-context";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 451,
      md: 768,
      lg: 1025,
      xl: 1281,
      xxl: 1441,
    },
  },
  palette: {
    primary: {
      main: "#3D5A80",
    },
    secondary: {
      main: "#DC2D53",
    },
  },
});
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("user/profile-info")
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((_e) => {});
    }
  }, []);

  return (
    <div className="">
      <ThemeProvider theme={theme}>
        <div>
          <UserContext.Provider value={{ user }}>
            <RouterProvider router={router}></RouterProvider>
          </UserContext.Provider>
          <AppInfo />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
