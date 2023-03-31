import React, { useState } from "react";
import HelpIcon from '@mui/icons-material/Help';
import { Button, IconButton } from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Person, VolumeUp } from "@mui/icons-material";
import Level from "./level";
import levelInfo from "./levelInfo.json";

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

    const [currentLevel, setCurrentLevel] = useState(0);

    function reset() {
        var info = levelInfo[currentLevel]
        console.log(levelInfo);
        console.log(info['files']);
        props.setFiles(info['files'])
        props.setRepo({
            initialized: info['repo']['initialized'],
            stagedFiles: info['repo']['stagedFiles'],
            branches: info['repo']['branches'],
            activeBranch: info['repo']['activeBranch'],
            commits: info['repo']['commits'],
            currentCommit: info['repo']['currentCommit'],
            trackedFiles: info['repo']['trackedFiles']
        })
    }
    function nextLevel() {
        var info = levelInfo[currentLevel+1];
        setCurrentLevel(currentLevel+1)
        const description = info['description'].map(para => <p>{para}</p>)
        props.setText(<div id="textBox">
            <h1>{info['title']}</h1>
            {description}
            <p className="hint">{info['hint']}</p>
            <div className="task" id={info['taskName']}>{info['task']}</div>
        </div>)
        props.setFiles(info['files'])
        props.setRepo({
            initialized: info['repo']['initialized'],
            stagedFiles: info['repo']['stagedFiles'],
            branches: info['repo']['branches'],
            activeBranch: info['repo']['activeBranch'],
            commits: info['repo']['commits'],
            currentCommit: info['repo']['currentCommit'],
            trackedFiles: info['repo']['trackedFiles']
        })
    }

    return (<footer style={footerStyle}>
        <div>
            <Button color="secondary" style={buttonText} variant="contained" onClick={() => setOpen(true)}>Level Select</Button>
            <Button color="secondary" style={buttonText} variant="contained" onClick={reset}>Restart</Button>
            <Button color="secondary" style={buttonText} variant="contained" onClick={nextLevel}>Next Level</Button>
            <IconButton color="secondary"><VolumeUp /></IconButton>
            <IconButton color="secondary"><Person /></IconButton>
        </div>
        <p color="secondary" style={gitGateLogo}>Git Gate</p>
        <IconButton color="secondary" style={{justifySelf: "flex-end"}}><HelpIcon /></IconButton>

        <Dialog open={open} onClose={handleClose} PaperProps={{ style: dialogPaper}}>
        <DialogTitle className="dialogTitle" >Level Select</DialogTitle>
        <DialogContent>
            <ul className="levelButtons">
                <Level id={1} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} setLevel={setCurrentLevel} />
                <Level id={2} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} setLevel={setCurrentLevel} />
                <Level id={3} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} setLevel={setCurrentLevel} />
                <Level id={4} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} setLevel={setCurrentLevel} />
                <Level id={5} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} setLevel={setCurrentLevel} />
                <Level id={6} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} setLevel={setCurrentLevel} />
                <Level id={7} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} setLevel={setCurrentLevel} />
                <Level id={8} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} setLevel={setCurrentLevel} />
                <Level id={9} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} setLevel={setCurrentLevel} />
                <Level id={10} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} setLevel={setCurrentLevel} />
                <Level id={11} handleClose={handleClose} setText={props.setText} setFiles={props.setFiles} setRepo={props.setRepo} setRemoteRepo={props.setRemoteRepo} setLevel={setCurrentLevel} />
            </ul>
        </DialogContent>
        </Dialog>
    </footer>
    )
}

export default Footer;