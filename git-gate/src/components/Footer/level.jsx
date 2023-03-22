import { Button } from "@mui/material";
import React from "react";
import levelInfo from "./levelInfo.json";

function Level(props) {
    const info = levelInfo[props.id];
    const changeLevel = e => {
        props.handleClose()
        props.setText(<div id="textBox">
            <h1>{info['title']}</h1>
            <p>{info['description']}</p>
            <p className="hint">{info['hint']}</p>
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

    return (
      <div className="levelButtonGroup">
        <Button color="secondary" onClick={changeLevel} className="levelButton" variant="contained">
          {props.id}
        </Button>
        <p style={{ display: "inline-block" }}>{info['name']}</p>
      </div>
    );
  }

export default Level;