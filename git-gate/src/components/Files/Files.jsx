import React from "react";
import File from "./File";

function Files(props) {
    return (<div id="files">
        {props.files.map(file => (
            <File name={file.name} content={file.content} />
        ))}
    </div>
    )
}

export default Files;