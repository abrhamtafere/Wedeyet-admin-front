import React from 'react'
import { Box, useTheme } from "@mui/material";
import Header from '../components/global/Header';
import { Grid } from '@mui/material';
import SummaryCard from '../components/Category/SummaryCard';
import PropTypes from 'prop-types';
import { tokens } from "../theme";
import CategoryTabs from '../components/Category/Tabs';
import Cards from '../components/Category/Cards';

function Category() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
    <Header title={" Add Category"} />
      <Cards/>    

      <CategoryTabs
        active={value}
        handleChange={handleChange}
      />


    </>

  )
}

export default Category