import React, { useRef, useState } from "react";
import FileIcon from '@mui/icons-material/InsertDriveFile';
import { IconButton, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

function File(props) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(props.content);
    const ogText = useRef();

    function openFile() {
        setEditing(true);
        ogText.current = text;
    }

    function handleSave() {
        setEditing(false);
    }

    function handleCancel() {
        setText(ogText.current);
        setEditing(false);
    }

    function handleTextChange(event) {
        setText(event.target.value);
    }

    return (
        <div className="file">
            {editing ? (
                <div>
                    <TextField
                        label={props.name}
                        multiline
                        rows={5}
                        value={text}
                        onChange={handleTextChange}
                        className="fileTextField"
                        sx={{
                            '& .MuiInputBase-input': {
                                color: '#ffffff',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#a5c9f9',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#a5c9f9',
                                },
                            },
                        }}
                    />
                    <div>
                        <IconButton onClick={handleSave} aria-label="save">
                            <SaveIcon sx={{color: '#a5c9f9'}} />
                        </IconButton>
                        <IconButton onClick={handleCancel} aria-label="cancel">
                            <CloseIcon sx={{color: '#a5c9f9'}} />
                        </IconButton>
                    </div>
                </div>
            ) : (
                <div onClick={openFile} className="file">
                    <FileIcon color="white" fontSize="60px" className="fileIcon" />
                    <p className="fileName">{props.name}</p>
                </div>
            )}
        </div>
    );
}

export default File;