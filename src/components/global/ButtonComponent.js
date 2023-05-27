import React from 'react'
import { tokens } from "../../theme";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
function ButtonComponent({ buttonText, onClick, isicon, startIcon }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Button variant="text" sx={{
      "&.MuiButton-root": {
        borderRadius: "4px !important",
        width: "100px",
        height: "50px",
        marginTop: isicon ? "0px" : "20px",
        backgroundColor: colors.greenAccent[500],
        border: "none !important",
        color: "White !important",
        textTransform: "none",
        fontSize: "15px"
      },

    }}
      startIcon={isicon && startIcon}
      onClick={onClick}>
      {buttonText}
    </Button>
  )
}

export default ButtonComponent