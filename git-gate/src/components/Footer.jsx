import React from "react";
import HelpIcon from '@mui/icons-material/Help';
import { Button, IconButton } from "@mui/material";
import { Person, VolumeUp } from "@mui/icons-material";

function Footer() {
    const footerStyle = {
        backgroundColor: "#292a6d"
    };
    const buttonText = {
        color: "#000"
    }
    const gitGateLogo = {
        display: "inline",
        justifySelf: "center",
        alignSelf: "center",
        color: "white",
        fontSize: "2em",
        margin: "0",
        fontFamily: "Lucida Console, Courier New, monospace"
    }
    return (<footer style={footerStyle}>
        <div>
            <Button color="secondary" style={buttonText} variant="contained">Main Menu</Button>
            <Button color="secondary" style={buttonText} variant="contained">Restart</Button>
            <Button color="secondary" style={buttonText} variant="contained">Next Level</Button>
            <IconButton color="secondary"><VolumeUp /></IconButton>
            <IconButton color="secondary"><Person /></IconButton>
        </div>
        <p color="secondary" style={gitGateLogo}>Git Gate</p>
        <IconButton color="secondary" style={{justifySelf: "flex-end"}}><HelpIcon /></IconButton>
    </footer>)
}

export default Footer;