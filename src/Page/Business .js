import React from 'react'
import { Box, Grid } from "@mui/material";
import Header from '../components/global/Header';
import BusinessComponent from '../components/Business/BusinessComponent';
import BusinessTable from '../components/Business/BusinessTable';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setServiceData } from '../redux/Services';
const initialData  = {
  "id":1,
    "businessName": "Business Name 1",
    "businessImages": [
        "blob:http://localhost:3000/7486b7bb-40b7-411a-b4bc-84a0546e531e",
        "blob:http://localhost:3000/3bfb50fc-eaad-471f-ae10-91ea2861e13a",
        "blob:http://localhost:3000/9de45ef9-bde1-4ed6-8eb3-8c91737b385d",
        "blob:http://localhost:3000/9068ca9d-091d-4471-9dd4-af9786c8ea02"
    ],
    "selectedMainCategory": "Main Category 2",
    "subcategory": " sub Category 3",
    "servicePlace": "Sebara Babur",
    "servicePhone": "+251953054815",
    "serviceLocation": "Busniness Location",
    "serviceTelegram": "@AbmanWolde",
    "aboutService": "About Comapny",
    "services": [
        "Free Delivery"
    ],
    "Branchs": [
        {
            "id": 1,
            "branchName": "Branch Name 1",
            "file": [
                "blob:http://localhost:3000/a32c26fb-89a2-46c2-825f-93c9901feeaf",
                "blob:http://localhost:3000/3fae755b-c65a-434c-b8fb-c359a1f370da"
            ],
            "phone": "+251947081180",
            "selectplace": "Saris abo",
            "branchTelegramUserName": "@BranchTelegram",
            "branchLocation": "Branch Location"
        }
       ] ,}
function Business() {
  const dispatch=useDispatch()
  // useEffect(()=>{
  //   dispatch(setServiceData(initialData))
  // },[])
  const serviceData=useSelector((state) => state.serviceState.service);

  return (<>
  <Header title={"Add Business"} />
  <BusinessComponent/>
    <Box mt={"30px"} /* bgcolor={"white"} */ width="100%" display="flex" flexDirection="row" justifyContent="center" alignItems="center">

      <BusinessTable serviceData={serviceData}/>
    </Box>
  </>
  )
}

export default Business