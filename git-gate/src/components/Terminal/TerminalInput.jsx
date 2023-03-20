import React, { useState } from "react";

function TerminalInput(props) {
    const [directory, setDirectory] = useState("tamamo\\github\\program");
    
    function changeDirectory(event) {
        if (event.key === "Enter" && event.target.value!=="") {
            evaluateInput(event.target.value)
            event.target.value = "";
        }
    }

    function evaluateInput(userInput) {
        const commandRegex = {
            "git init": /^git init$/,
            "git add": /^git add\s+(.+)$/,
            "git commit": /^git commit\s+-m\s+"(.+)"$/,
            "git status": /^git status$/,
            "git log": /^git log$/,
            "git push": /^git push$/,
            "git pull": /^git pull$/,
            "touch": /^touch\s+(.+)$/,
            "ls": /^ls$/,
            "rm": /^rm\s+(.+)$/
        };
      
        for (let [command, regexPattern] of Object.entries(commandRegex)) {
            const match = userInput.match(regexPattern);
            if (match) {
                switch (command) {
                    case "git init":
                        if (props.repo.initialized) {
                            sendToLog(userInput, "Git repository already exists.");
                            break;
                        }
                        const newRepo = {
                            initialized: true,
                            stagedFiles: [],
                            committedFiles: [],
                            branches: [{ name: "master", head: null }],
                            activeBranch: "master",
                            commits: [],
                            currentCommit: null,
                            history: []
                        };
                        props.setRepo(newRepo);
                        sendToLog(userInput, "Initialized empty Git repository.");
                        break;

                    case "git add":
                        if (!props.repo.initialized) {
                            sendToLog(userInput, "Git repository not initialized.");
                            break;
                        }
                        const fileName = match[1];
                        const stagedFiles = [...props.repo.stagedFiles]
                        
                        if (fileName === "." || fileName === "*") {
                            props.files.forEach(file => {
                                if (!props.repo.stagedFiles.includes(file)) {
                                    stagedFiles.push(file);
                                }
                            });
                            sendToLog(userInput, "All files staged for commit.");
                        } else {
                            const fileNames = props.files.map(file => file.name);
                            console.log(fileName);
                            if (!fileNames.includes(fileName)) {
                                console.log("File doesn't exist.");
                                break;
                            }
                            const f = props.files.filter((file) => file.name === fileName)[0];
                            if (!props.repo.stagedFiles.includes(f)) {
                                stagedFiles.push(f);
                            } else {
                                console.log("Already here");
                            }
                        }
                        props.setRepo({
                            ...props.repo,
                            stagedFiles
                        })
                        break;
                        
                    case "git commit":
                        if (!props.repo.initialized) {
                            sendToLog(userInput, "Git repository not initialized.");
                            break;
                        }
                        if (props.repo.stagedFiles.length === 0) {
                            sendToLog(userInput, "No files staged for commit.");
                            break;
                        }
                        const commitMessage = match[1];
                        const commit = {
                            id: props.repo.commits.length + 1,
                            message: commitMessage,
                            timestamp: new Date().toISOString(),
                            changes: [...props.repo.stagedFiles]
                        };
                        props.setRepo({
                            ...props.repo,
                            commits: [...props.repo.commits, commit],
                            stagedFiles: []
                        });
                        sendToLog(userInput, `Committed Changes with message: ${commitMessage}`);
                        break;

                    case "git status":
                        if (!props.repo.initialized) {
                            sendToLog(userInput, "Git repository not initialized.");
                            break;
                        }
                        const stagedFilesToShow = props.repo.stagedFiles.map(file => file.name);
                        const stagedFilesToShowList = ["Changes ready to be committed:"];
                        if (stagedFilesToShow.length > 0) {
                            stagedFilesToShow.forEach(file => stagedFilesToShowList.push(file));
                            sendToLog(userInput, stagedFilesToShowList.join("\n"))
                        } else {
                            sendToLog(userInput, "No changes ready to be committed.");
                        }
                        break;

                    case "git log":
                        if (!props.repo.initialized) {
                            sendToLog(userInput, "Git repository not initialized.");
                            break;
                        }
                        const commitHistory = props.repo.commits;
                        if (commitHistory.length === 0) {
                            sendToLog(userInput, "No commits yet.");
                            break;
                        }
                        const commitHistoryList = ["Commit History:"];
                        commitHistory.forEach(commit => {
                            commitHistoryList.push(`Commit ${commit.id}: ${commit.message} (${commit.timestamp})`);
                        });
                        sendToLog(userInput, commitHistoryList.join("\n"));
                        break;
                        
                    case "git push":
                        sendToLog(userInput, "Pushed");
                        break;
                    case "git pull":
                        sendToLog(userInput, "Pulled");
                        console.log(props.repo);
                        break;
                    case "rm":
                        const filenameToRemove = match[1];
                        const updatedFilesList = props.files.filter((file) => file.name !== filenameToRemove);
                        if (updatedFilesList.length < props.files.length) {
                            props.setFiles(updatedFilesList);
                            sendToLog(userInput, "Removed: " + filenameToRemove);
                        } else {
                            sendToLog(userInput, "File '" + filenameToRemove + "' not found.");
                        }
                        break;

                    case "touch":
                        const filename = match[1];
                        if (!props.files.some((file) => file.name === filename)) {
                            props.setFiles([...props.files, { name: filename, content: "" }]);
                            sendToLog(userInput, "Created: " + filename);
                        } else {
                            sendToLog(userInput, "File '" + filename + "' already exists.");
                        }
                        break;

                    case "ls":
                        const fileNamesList = props.files.map((file) => file.name).join("\n");
                        sendToLog(userInput, fileNamesList);
                        break;

                    default:
                        sendToLog(userInput, "'" + userInput + "' is not recognized as an internal or external command, operable program or batch file.");
                }
                return;
            }
        }
        sendToLog(userInput, "'" + userInput + "' is not recognized as an internal or external command, operable program or batch file.");
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