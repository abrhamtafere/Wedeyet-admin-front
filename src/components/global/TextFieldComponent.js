import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme";
const TextFieldComponent = ({ text, value, label, onChange }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
    <TextField
      label={label}
      variant="outlined"
      onChange={onChange}
      value={value&&value}
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root:hover": {
          "& > fieldset": {
            borderColor: colors.greenAccent[400]

          },
          width: "100%",
        },
        "& .MuiTextField-root:focused": {
          "& > fieldset": {
            borderColor: colors.greenAccent[400]
          }
        },
        flexGrow: 1
      }}
      name="Main Category Name"
    />
    </>
  );
};

export default TextFieldComponent;