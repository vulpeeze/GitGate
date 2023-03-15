import React, { useState } from "react";

function TerminalInput(props) {
    const [directory, setDirectory] = useState("tamoo\\github\\program");
    
    function changeDirectory(event) {
        if (event.key === "Enter" && event.target.value!=="") {
            evaluateInput(event.target.value)
            event.target.value = "";
        }
    }

    function evaluateInput(userInput) {
        // console.log(userInput);
        switch (userInput) {
            // case "cd"
            case "git add":
                sendToLog(userInput, "Staged for commit")
                break;
            case "git push":
                sendToLog(userInput, "Pushed")
                break;
            default:
                sendToLog(userInput, "'" + userInput + "' is not recognized as an internal or external command, operable program or batch file.")
                break;
        }
    }

    function sendToLog(userInput, logMessage) {
        var log = document.querySelector("#terminalLog");
        var directory = document.querySelector(".TerminalDirectory").innerText
        userInput = "\n" + directory + "> " + userInput
        logMessage = "\n" + logMessage
        document.querySelector("#terminalLog").innerText = log.innerText + userInput + logMessage + "\n"
        log.scrollTop = log.scrollHeight;
    }

    return (<div id="terminalInputBox">
        <p className="TerminalDirectory">{directory}</p>
        <input onKeyDown={changeDirectory} type="text" name="" className="terminalInput"></input>
    </div>
    )
}

export default TerminalInput;