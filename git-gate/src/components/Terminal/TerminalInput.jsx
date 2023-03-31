import React, { useState } from "react";

function TerminalInput(props) {
    const [directory, setDirectory] = useState("tamamo\\github\\program");
    
    function changeDirectory(event) {
        if (event.key === "Enter" && event.target.value!=="") {
            evaluateInput(event.target.value)
            event.target.value = "";
        }
    }

    function checkTaskCompletion(command) {
        switch (command) {
            case "ls":
                if (document.querySelector('.task').id==="viewLocations") {
                    props.setTasks({...props.tasks, viewLocations: true});
                }
                break;
            case "touch":
                if (document.querySelector('.task').id==="filecreation") {
                    props.setTasks({...props.tasks, filecreation: true});
                }
                break;
            case "rm":
                if (document.querySelector('.task').id==="filedestruction") {
                    props.setTasks({...props.tasks, filedestruction: true});
                }
                break;
            case "git init":
                if (document.querySelector('.task').id==="repoInit") {
                    props.setTasks({...props.tasks, repoInit: true});
                }
                break;
            case "git name":
                if (document.querySelector('.task').id==="gitName") {
                    props.setTasks({...props.tasks, gitName: true});
                }
                break;
            case "git email":
                if (document.querySelector('.task').id==="gitEmail") {
                    props.setTasks({...props.tasks, gitEmail: true});
                }
                break;
            case "git add":
                if (document.querySelector('.task').id==="addFiles" && props.repo.trackedFiles.length > 0) {
                    props.setTasks({...props.tasks, addFiles: true});
                }
                break;
            case "git commit":
                if (document.querySelector('.task').id==="commitFiles" && props.repo.stagedFiles.length > 0) {
                    props.setTasks({...props.tasks, commitFiles: true});
                }
                break;
            default:
                break;
        }
    }

    function evaluateInput(userInput) {
        const commandRegex = {
            "stdir": /^stdir (.+)$/,
            "git init": /^git init$/,
            "git clone": /^git clone "(.+)"/,
            "git name": /^git config --global user\.name "(.+)"$/,
            "git email": /^git config --global user\.email "(.+)"$/,
            "git details": /^git details$/,
            "git add": /^git add (.+)$/,
            "git commit": /^git commit -m "(.+)"$/,
            "git status": /^git status$/,
            "git log": /^git log$/,
            "git push": /^git push$/,
            "git pull": /^git pull$/,
            "touch": /^touch (.+)$/,
            "ls": /^ls$/,
            "rm": /^rm (.+)$/
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
                            branches: [{ name: "main", head: null }],
                            activeBranch: "main",
                            commits: [],
                            currentCommit: null,
                            trackedFiles: []
                        };
                        props.setRepo(newRepo);
                        sendToLog(userInput, "Initialized empty Git repository.");
                        break;

                    case "git clone":
                        if (props.repo.initialized) {
                            sendToLog(userInput, "Git repository already exists.");
                            break;
                        }
                        const url = match[1];
                        const name = url.split("/").pop();
                        if (!url) {
                            sendToLog(userInput, "Please provide a valid URL.");
                            break;
                        }
                        // Check if remote repository exists
                        if (!props.remoteRepo || props.remoteRepo.url !== url) {
                            sendToLog(userInput, `Could not find remote repository "${name}".`);
                            break;
                        }

                        // Clone remote repository
                        const newCommits = JSON.parse(JSON.stringify(props.remoteRepo.commits)); // Deep clone
                        const newBranches = props.remoteRepo.branches.map(branch => ({ ...branch })); // Shallow clone
                        const clonedRepo = {
                            name: name,
                            initialized: true,
                            branches: newBranches,
                            activeBranch: props.remoteRepo.activeBranch,
                            currentCommit: props.remoteRepo.currentCommit,
                            commits: newCommits,
                            stagedFiles: [],
                            trackedFiles: []
                        };

                        props.setRepo(clonedRepo);
                        sendToLog(userInput, `Cloned repository from ${url}`)

                        break;

                    case "git name":
                        props.setAuthor({
                            ...props.author,
                            name: match[1]
                        })
                        sendToLog(userInput, "Name has been set.")
                        break;
                    case "git email":
                        props.setAuthor({
                            ...props.author,
                            email: match[1]
                        })
                        sendToLog(userInput, "Email has been set.")
                        break;
                    case "git details":
                        sendToLog(userInput, "Username: " + props.author.name + "\nEmail: " + props.author.email)
                        break;

                    case "git add":
                        if (!props.repo.initialized) {
                            sendToLog(userInput, "Git repository not initialized.");
                            break;
                        }
                        
                        const fileName = match[1];
                        const stagedFiles = [...props.repo.stagedFiles]
                        
                        if (fileName === "." || fileName === "*") {
                            if (props.repo.trackedFiles.length < 1) {
                                sendToLog(userInput, "No files to add to staging area.")
                                break;
                            }
                            props.repo.trackedFiles.forEach(file => {
                                if (!props.repo.stagedFiles.includes(file)) {
                                    stagedFiles.push(file);
                                }
                            });
                            props.setRepo({
                                ...props.repo,
                                stagedFiles,
                                trackedFiles: []
                            });
                            sendToLog(userInput, "All files staged for commit.");
                        } else {
                            const fileNames = props.files.map(file => file.name);
                            if (!fileNames.includes(fileName)) {
                                sendToLog(userInput, "File doesn't exist.")
                                break;
                            }
                            const f = props.repo.trackedFiles.find((file) => file.name === fileName);
                            if (!f) {
                                sendToLog(userInput, "Doesn't match the name of any edited files.")
                                break;
                            }
                            if (!props.repo.stagedFiles.includes(f)) {
                                stagedFiles.push(f);
                                sendToLog(userInput, "Staged file.")
                            } else {
                                sendToLog(userInput, "File " + f.name + " already staged.")
                            }
                            
                            props.setRepo({
                                ...props.repo,
                                stagedFiles,
                                trackedFiles: props.repo.trackedFiles.filter(files => files.name !== f.name)
                            });
                        }
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
                            hash: (props.repo.commits.length + 1).toString(),
                            author: props.author.name,
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

                        var statusMessage = ""

                        const stagedFilesToShow = props.repo.stagedFiles.map(file => file.name);
                        const stagedFilesToShowList = ["Changes ready to be committed:"];
                        if (stagedFilesToShow.length > 0) {
                            stagedFilesToShow.forEach(file => stagedFilesToShowList.push(file));
                            statusMessage = statusMessage + stagedFilesToShowList.join("\n");
                        } else {
                            statusMessage = statusMessage + "No changes ready to be committed.\n";
                        }

                        const trackedFilesToShow = props.repo.trackedFiles.map(file => file.name);
                        const trackedFilesToShowList = ["\nChanges being tracked:"];
                        if (trackedFilesToShow.length > 0) {
                            trackedFilesToShow.forEach(file => trackedFilesToShowList.push(file));
                            statusMessage = statusMessage + trackedFilesToShowList.join("\n");
                        } else {
                            statusMessage = statusMessage + "\nNo files currently being tracked.\n";
                        }

                        sendToLog(userInput, statusMessage)

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
                            commitHistoryList.push(`Commit ${commit.hash}: ${commit.message} (${commit.timestamp})`);
                        });
                        sendToLog(userInput, commitHistoryList.join("\n"));
                        break;
                        
                    case "git push":
                        if (!props.repo.initialized) {
                            sendToLog(userInput, "Git repository not initialized.");
                            break;
                        }
                        const currentBranch = props.repo.activeBranch;
                        const remoteBranch = currentBranch;
                        const remoteRepo = props.remoteRepo;
                        if (!remoteRepo) {
                            sendToLog(userInput, `Could not find remote repository "${remoteRepo.name}".`);
                            break;
                        }
                        if (!remoteRepo.branches.includes(remoteBranch)) {
                            sendToLog(userInput, `Branch "${remoteBranch}" not found on remote repository.`);
                            break;
                        }
                        if (props.repo.stagedFiles.length !== 0){
                            sendToLog(userInput, "Commit or unstage files before pushing.") 
                            break;
                        }

                        const localCommits = props.repo.commits.filter(commit => {
                            return !remoteRepo.commits.some(remoteCommit => remoteCommit.hash === commit.hash);
                        });
                        if (localCommits.length === 0) {
                            sendToLog(userInput, "No local commits to push.");
                            break;
                        }
                        // create a new branch on the remote repository if it doesn't exist yet
                        if (!remoteRepo.branches.includes(remoteBranch)) {
                            const newBranches = [...remoteRepo.branches, remoteBranch];
                            props.setRemoteRepo(prevState => ({ ...prevState, branches: newBranches }));
                        }
                        // add the local commits to the remote repository
                        // update the current commit of the remote repository
                        props.setRemoteRepo(prevState => ({
                            ...prevState,
                            commits: [...prevState.commits, ...localCommits],
                            currentCommit: localCommits[localCommits.length - 1].hash
                          }));

                        sendToLog(userInput, "Pushed");
                        break;
                    
                    case "git pull":
                        if (!props.repo.initialized) {
                            sendToLog(userInput, "Git repository not initialized.");
                            break;
                        }
                        if (!props.remoteRepo) {
                            sendToLog(userInput, `Could not find remote repository "${props.remoteRepo.name}".`);
                            break;
                        }

                        const remoteCommits = props.remoteRepo.commits.filter(commit => !props.repo.commits.some(localCommit => localCommit.hash === commit.hash));
                        if (remoteCommits.length === 0) {
                            sendToLog(userInput, "No new commits to pull.");
                            break;
                        }
                        props.setRepo(prevState => ({
                            ...prevState,
                            commits: [...prevState.commits, ...remoteCommits],
                            currentCommit: remoteCommits[remoteCommits.length - 1].hash
                          }));

                        sendToLog(userInput, "Pulled");
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
                            const newFile = { name: filename, content: "" };
                            props.setFiles([...props.files, newFile]);
                            sendToLog(userInput, "Created: " + filename);
                            props.setRepo({
                                ...props.repo,
                                trackedFiles: [...props.repo.trackedFiles, newFile]
                            })
                        } else {
                            sendToLog(userInput, "File '" + filename + "' already exists.");
                        }
                        break;

                    case "ls":
                        const fileNamesList = props.files.map((file) => file.name).join("\n");
                        sendToLog(userInput, fileNamesList);
                        break;

                    case "stdir":
                        setDirectory(match[1])
                        break;
                    
                    default:
                        sendToLog(userInput, "'" + userInput + "' is not recognized as an internal or external command, operable program or batch file.");
                }
                checkTaskCompletion(command)
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