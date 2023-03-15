import React from "react";
import Files from "./Files";
import Footer from "./Footer";
import Terminal from "./Terminal/Terminal";
import TextBox from "./TextBox";
import Visuals from "./Visual";
import {ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#292a6d',
            light: '#5f60b2',
            dark: '#1c1d4d',
        },
        secondary: {
            main: '#a5c9f9',
            light: '#c3d9fc',
            dark: '#628bc8',
        },
    }
  });

function App() {
    return (<div className="container">
        <ThemeProvider theme={theme}>
            <Visuals />
            <TextBox />
            <Files />
            <Terminal />
            <Footer />
        </ThemeProvider>
    </div>
    )
}

export default App;