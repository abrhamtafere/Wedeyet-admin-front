import React from "react";
import { Box, Grid } from "@mui/material";
import SummaryCard from "./SummaryCard";
import categorys from "../../data/category.json";
import { useSelector } from "react-redux";
import Lable from "../global/Lable";

function Cards() {
  const data = useSelector((state) => state.mainCategoryState);
  console.log("from cards ", data);
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        m="2.5rem 10rem"
      >
        <Lable
          text={`${
            data.TotalServices
          } Total Services and 
          
          ${ data?.subServices.TotalSubServices
            // data?.ServiceSubService?.reduce(
            // (sum, service) => sum + service.totalSubService,
            // 0
          // )
        } 
          
          Sub Services`}//mainCategory
        />
        <Grid container spacing={2}>
          {data?.mainCategory.Services?.map((s) => (
            <Grid item xs={4} sm={6} md={3}>
              <SummaryCard
                title={s.name}
                total={data.subServices.SubServices.filter((item)=> item.category.id === s._id).length}  icon={s.image}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Cards;

/*
data.subServices.SubServices.filter((item)=> category.id === s._id).length
*/