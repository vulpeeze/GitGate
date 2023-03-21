import React, { useState } from "react";
import Files from "./Files/Files";
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
        white: {
            main: '#ffffff',
        },
    }
  });

function App() {
    const [filesList, setFilesList] = useState([
        {name: "File C", content: "Tamamo no Mae"},
        {name: "File A", content: "Tamamo Vitch"},
        {name: "File R", content: "Tamamo Gucci"}
    ]);

    const [authorDetails, setAuthorDetails] = useState({
        name: "Filler Name",
        email: "filler@email.com"
    })

    const [gitRepo, setGitRepo] = useState({
        initialized: false,
        stagedFiles: [],
        branches: [],
        activeBranch: "main",
        commits: [],
        currentCommit: null
    });

    const [gitRemoteRepo, setGitRemoteRepo] = useState({
        name: "remoteRepo",
        url: "https://github.com/your-username/your-repo.git",
        branches: ["main"],
        activeBranch: "main",
        commits: [
            {
                hash: "a5c5f5e",
                message: "Initial commit",
                branch: 'main',
                author: "John Doe",
                date: "2022-01-01 10:00:00",
                changes: [
                    { type: "add", name: "index.html" },
                    { type: "add", name: "styles.css" },
                    { type: "add", name: "script.js" }
                ]
            },
            {
                hash: "1",
                message: "Update styles",
                branch: 'main',
                author: "Jane Smith",
                date: "2022-01-02 14:30:00",
                changes: [
                    { type: "edit", name: "styles.css" }
                ]
            }
        ],
        currentCommit: "a5c5f5e"
    });

    return (<div className="container">
        <ThemeProvider theme={theme}>
            <Visuals />
            <TextBox />
            <Files files={filesList} />
            <Terminal files={filesList} setFiles={setFilesList} repo={gitRepo} setRepo={setGitRepo} remoteRepo={gitRemoteRepo} setRemoteRepo={setGitRemoteRepo} author={authorDetails} setAuthor={setAuthorDetails} />
            <Footer />
        </ThemeProvider>
    </div>
    )
}

export default App;