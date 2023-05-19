import React from 'react'
import { Box,TextField, Button, useTheme } from "@mui/material";
export function FileChooserButton(props) {
    const [fileName, setFileName] = React.useState('');
  
    const handleFileChange = (event) => {
      setFileName(event.target.files[0].name);
    };
  
    return (
      <div style={{ display: 'flex',marginTop:"10px" }}>
        <Button variant="contained" color="primary" onClick={() => props.inputRef.current.click()}>
          Choose
        </Button>
        <TextField value={fileName} label="Selected file" style={{ flexGrow: 1 }} />
        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={props.inputRef} />

      </div>
    );
  }