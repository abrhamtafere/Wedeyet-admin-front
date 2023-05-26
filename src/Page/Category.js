import React from 'react'
import { Box, useTheme } from "@mui/material";
import Header from '../components/global/Header';
import { Grid } from '@mui/material';
import SummaryCard from '../components/Category/SummaryCard';
import PropTypes from 'prop-types';
import { tokens } from "../theme";
import CategoryTabs from '../components/Category/Tabs';
import Cards from '../components/Category/Cards';
import { useDispatch,useSelector } from 'react-redux';
import { setactive } from '../redux/tab';
function Category() {
  const activeTab = useSelector((state) => state.tabstate.tab);
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(activeTab);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setactive(newValue))
  };
  console.log("tab persist")
  console.log(localStorage.getItem('persist:root').tab)
  return (
    <>
      <Header title={" Add Category"} />
      <Cards />

      <CategoryTabs
        active={value}
        handleChange={handleChange}
      />


    </>

  )
}

export default Category