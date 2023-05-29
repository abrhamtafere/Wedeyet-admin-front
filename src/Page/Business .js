import React from 'react'
import { Box, Grid } from "@mui/material";
import Header from '../components/global/Header';
import BusinessComponent from '../components/Business/BusinessComponent';
import BusinessTable from '../components/Business/BusinessTable';
function Business() {
  return (<>
  <Header title={"Add Business"} />
  <BusinessComponent/>
    <Box mt={"30px"} bgcolor={"white"} width="100%" display="flex" flexDirection="row" justifyContent="center" alignItems="center">

      <BusinessTable/>
    </Box>
  </>
  )
}

export default Business