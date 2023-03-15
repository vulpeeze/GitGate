import React, { useState } from "react";
import TerminalInput from "./TerminalInput";
import TerminalLog from "./TerminalLog";

function Terminal() {
    const [log, setLog] = useState();

    return (<div id="terminal">
        <TerminalLog log={log} />
        <TerminalInput setLog={setLog} />
    </div>
    )
}

export default Terminal;