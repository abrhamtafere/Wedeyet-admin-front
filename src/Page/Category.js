import React from 'react'
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Header from '../components/global/Header';
import { Grid, Container } from '@mui/material';
import SummaryCard from '../components/Category/SummaryCard';
function Category() {
  return (
    <>  <Header title={" Add Category"}/>
        <Box /* bgcolor="blue" */ display="flex"flexDirection="row" justifyContent="center" alignItems="center"   m="2.5rem 5rem">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard title="Restaurant " total={71} icon={'material-symbols:restaurant'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Services" total={40} icon={'material-symbols:home-repair-service'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Shop" total={4} icon={'material-symbols:shopping-cart'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Others" total={90} icon={'material-symbols:add-box-outline-rounded'} />
          </Grid>
          </Grid>
        </Box></>

  )
}

export default Category