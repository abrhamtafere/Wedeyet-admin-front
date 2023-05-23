import React from 'react'
import {  TextField, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
export function FileChooserButton(props) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleFileChange = (event) => {
    props.setFileName(event.target.files[0].name);
  };

  return (
    <div style={{ display: 'flex'}}>
      <Button variant="text" disableElevation={true} sx={{
        "&.MuiButton-root": {
          borderRadius: "0px !important",
          width: "120px",
          backgroundColor: "#DADADA",
          border: "none !important",
          color: "White !important",
          textTransform: "none"
        },
      }}
        onClick={() => props.inputRef.current.click()}>
        Choose SVG
      </Button>
      <TextField  placeholder='Choose SVG' value={!props.edit?props.fileName:props.value} label="Selected file" style={{ flexGrow: 1 } } sx={{  "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": {
                borderColor: colors.greenAccent[400]
              },
              width: "100%",
            },
            "& .MuiTextField-root:focused": {
              "& > fieldset": {
                borderColor: colors.greenAccent[400]
              }
            },}}/>
      <input  type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={props.inputRef} />

    </div>
  );
}