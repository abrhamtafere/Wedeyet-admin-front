import React from 'react'
import { tokens } from "../../theme";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
function Lable({ text }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Typography
            variant="h6"
            color={colors.grey[100]}
            fontWeight="600"
            pb={"5px"}
        >
            {text}
        </Typography>
    )
}

export default Lable