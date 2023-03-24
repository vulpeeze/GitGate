import React, { useState } from "react";
import TerminalInput from "./TerminalInput";
import TerminalLog from "./TerminalLog";

function Terminal(props) {
    const [log, setLog] = useState();

    return (<div id="terminal">
        <TerminalLog log={log} />
        <TerminalInput files={props.files} setFiles={props.setFiles} repo={props.repo} setRepo={props.setRepo} remoteRepo={props.remoteRepo} setRemoteRepo={props.setRemoteRepo} author={props.author} setAuthor={props.setAuthor} setLog={setLog} tasks={props.tasks} setTasks={props.setTasks} />
    </div>
    )
}

export default Terminal;