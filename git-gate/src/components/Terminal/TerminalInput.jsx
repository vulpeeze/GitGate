import React, { useState } from "react";

function TerminalInput() {
    const [directory, setDirectory] = useState("a");
    
    function changeDirectory(event) {
        if (event.key === "Enter") {
            var folder = event.target.value;
            // var folder = "C:\\Users\\tamoo\\github\\program"
            // folder = folder.slice(-20)
            setDirectory(folder)
        }
    }

    return (<div id="terminalInputBox">
        <p className="TerminalDirectory">{directory}</p>
        <input onKeyDown={changeDirectory} type="text" name="" className="terminalInput"></input>
    </div>
    )
}

export default TerminalInput;