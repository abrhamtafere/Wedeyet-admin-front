import React from 'react'
import { Box, Grid } from "@mui/material";
import Header from '../components/global/Header';
function Business() {
  return (<>
  <Header title={"Add Business"} />
   <Box display="flex"flexDirection="row" justifyContent="center" alignItems="center"  pl={"50px"} pr={"50px"} mb={"30px"} bgcolor={"white"}  width={"100%"}>
    <Grid container spacing={5}>
      <Grid  item xs={12} sm={12} md={6}>
        <Box bgcolor={"red"} padding={"2px"}>zx</Box>
      </Grid>
      <Grid  item xs={12} sm={12} md={6}>
        <Box bgcolor={"blue"} padding={"2px"}>xc</Box>
      </Grid>

    </Grid>

   </Box>
    <Box height="100%" bgcolor={"blue"} width="100%" display="flex" flexDirection="row" justifyContent="center" alignItems="center">

      <p style={{ fontSize: "30px", fontWeight: "bold" }}>Add Business Page</p>
    </Box>
  </>
  )
}

export default Business