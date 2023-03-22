import React from "react";
import File from "./File";

function Files(props) {
    return (<div id="files">
        {props.files.map((file, index) => (
            <File 
                key={index}
                name={file.name}
                content={file.content}
                files={props.files}
                setFiles={props.setFiles}
                repo={props.repo}
                setRepo={props.setRepo} />
        ))}
    </div>
    )
}

export default Files;