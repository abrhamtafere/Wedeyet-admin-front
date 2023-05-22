import React from 'react'
import { Box, Grid } from "@mui/material";
import SummaryCard from './SummaryCard';
import categorys from "../../data/category.json"
function Cards() {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" m="2.5rem 10rem">
    <Grid container spacing={2}>

        {categorys.MainCategories.map((main)=><Grid item xs={12} sm={6} md={3}><SummaryCard title={main.name} total={main.subcategories.length} icon={main.image} /> </Grid>)}
    </Grid>
  </Box>
  )
}

export default Cards