import React, { useState } from "react";
import HelpIcon from '@mui/icons-material/Help';
import { Button, IconButton } from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Person, VolumeUp } from "@mui/icons-material";
import Level from "./level";

function Footer(props) {
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
    const dialogPaper = {
        backgroundColor: "#292a6d",
        maxWidth: 'false',
        maxHeight: 'false',
        width: '100%',
        height: '100%',
        margin: 0,
    }

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    return (<footer style={footerStyle}>
        <div>
            <Button color="secondary" style={buttonText} variant="contained" onClick={() => setOpen(true)}>Level Select</Button>
            <Button color="secondary" style={buttonText} variant="contained">Restart</Button>
            <Button color="secondary" style={buttonText} variant="contained">Next Level</Button>
            <IconButton color="secondary"><VolumeUp /></IconButton>
            <IconButton color="secondary"><Person /></IconButton>
        </div>
        <p color="secondary" style={gitGateLogo}>Git Gate</p>
        <IconButton color="secondary" style={{justifySelf: "flex-end"}}><HelpIcon /></IconButton>

        <Dialog open={open} onClose={handleClose} PaperProps={{ style: dialogPaper}}>
        <DialogTitle className="dialogTitle" >Level Select</DialogTitle>
        <DialogContent>
            <ul className="levelButtons">
                <Level id={1} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} />
                <Level id={2} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} />
                <Level id={3} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} />
                {/* <Level text="Level 4" id={4} title="Tamamo Cat" handleClose={handleClose} setText={props.setText} />
                <Level text="Level 5" id={5} title="Tamamo Vitch" handleClose={handleClose} setText={props.setText} />
                <Level text="Level 6" id={6} title="Tamamo Gucci" handleClose={handleClose} setText={props.setText} />
                <Level text="Level 7" id={7} title="Tamamo Shark" handleClose={handleClose} setText={props.setText} />
                <Level text="Level 8" id={8} title="Tamago no Mae" handleClose={handleClose} setText={props.setText} /> */}
            </ul>
        </DialogContent>
        </Dialog>
    </footer>
    )
}

export default Footer;