import React from 'react'
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Header from '../components/global/Header';
import FaqComponent from '../components/FAQ/FaqComponent';
function Faq() {
  return (
    <>
      <Header title={"Add FAQ"} />
      <Box m={"30px 30px"} width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <FaqComponent />
      </Box>
    </>
  )
}

export default Faq