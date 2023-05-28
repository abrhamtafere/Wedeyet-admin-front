import React from 'react'
import { Box, Grid } from "@mui/material";
import Header from '../components/global/Header';
import BusinessComponent from '../components/Business/BusinessComponent';
function Business() {
  return (<>
  <Header title={"Add Business"} />
  <BusinessComponent/>
    <Box height="100%" width="100%" display="flex" flexDirection="row" justifyContent="center" alignItems="center">

      <p style={{ fontSize: "30px", fontWeight: "bold" }}>Add Business Page</p>
    </Box>
  </>
  )
}

export default Business