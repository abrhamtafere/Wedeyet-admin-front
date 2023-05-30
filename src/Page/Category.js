import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, useTheme } from "@mui/material";
import Header from '../components/global/Header';
import { Grid } from '@mui/material';
import SummaryCard from '../components/Category/SummaryCard';
import PropTypes from 'prop-types';
import { tokens } from "../theme";
import CategoryTabs from '../components/Category/Tabs';
import Cards from '../components/Category/Cards';
import { useDispatch, useSelector } from 'react-redux';
import { setactive } from '../redux/tab';
import { setData, setMainCategory } from '../redux/mainCategory';
function Category() {
  const [mCategory, setMCategory] = useState({})
  const activeTab = useSelector((state) => state.tabstate.tab);
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(activeTab);
  const theme = useTheme();
  const [mainCategory, setMainCategoryData]=useState({})
  const colors = tokens(theme.palette.mode);
  const auth = useSelector((state) => state.persistedReducer.user);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setactive(newValue))
  };
  console.log("tab persist")
  console.log(localStorage.getItem('persist:root').tab)
  useEffect(() => {
    axios.get('https://wedeyet.herokuapp.com/api/service/category/all', {
      headers: {
        'Authorization': `Bearer${auth.token}`
      },
    })
      .then(res => {

        setMCategory(res.data);

      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);
  useEffect(() => {
    axios.get('https://wedeyet.herokuapp.com/api/service/all', {
      headers: {
        'Authorization': `Bearer${auth.token}`
      },
    })
    .then(res => {

      setMainCategoryData(res?.data);
    
    })
    .catch(err => {
      console.log('err', err);
    });
  }, []);
  dispatch(setMainCategory(mainCategory))
  dispatch(setData(mCategory))
  const data = useSelector((state) => state.mainCategoryState.ServiceSubService);
  console.log(data)
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