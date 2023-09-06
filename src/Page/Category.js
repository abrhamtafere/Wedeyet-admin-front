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
import { setData, setMainCategory, setSubServices } from '../redux/mainCategory';
import { Loading } from '../components/Loading';
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
  // axios.get('https://wedeyet.herokuapp.com/api/service/all', {
   
    useEffect(() => {
      axios.get('https://wedeyet.herokuapp.com/api/service/category/all', {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        },
      })
        .then(res => {
          
          setMCategory(res.data);
  console.log('mcategoty', res.data)
        })
        .catch(err => {
          console.log('err', err);
        });
    }, []);
  useEffect(() => {
    axios.get('https://wedeyet.herokuapp.com/api/service/all', {
      headers: {
        'Authorization': `Bearer  ${auth.token}`
      },
    })
      .then(res => {
      console.log(" SubCategory ",res.data)
      setMainCategoryData(res?.data);
    })
    .catch(err => {
      console.log('err', err);
    });
  }, []);

  //sub services
  useEffect(() => {
    axios.get('https://wedeyet.herokuapp.com/api/subservice/all', {
      headers: {
        'Authorization': `Bearer ${auth.token}`
      },
    })
      .then(res => {
        dispatch(setSubServices(res.data))
        // setMCategory(res.data); setSubServices
console.log('mcategotySUB ', res.data)
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);
  
  dispatch(setMainCategory(mainCategory)) //the right one service=maincategory.services
  dispatch(setData(mCategory))
  const data = useSelector((state) => state.mainCategoryState.ServiceSubService);
  console.log("jk ser data", data)

  if (!mainCategory.Services ||  !data) {
    return <Loading />
  }
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

