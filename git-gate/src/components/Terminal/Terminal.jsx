import React from "react";
import TerminalInput from "./TerminalInput";
import TerminalLog from "./TerminalLog";

function Terminal() {
    return (<div id="terminal">
        <TerminalLog />
        <TerminalInput />
    </div>
    )
}

export default Terminal;