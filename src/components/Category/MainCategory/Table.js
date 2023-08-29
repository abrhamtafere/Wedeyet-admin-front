import React from 'react'
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import MainCatData from "../../../data/MainCatData.json"
import categorys from "../../../data/category.json"
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Actions from './Actions';
import { tokens } from "../../../theme";
import { styled } from '@mui/material/styles';
import Iconify from '../../../Utils/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { setData, deleteRows } from '../../../redux/mainCategory';

const StyledIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: 40,
    height:40,
    justifyContent: 'center',

  }));
function Table({rowsData, setMainCategoryName}) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const data = useSelector((state) => state.mainCategoryState);
    const rowsDatas = rowsData?.Services?.map((service) => ({
    id: service._id,
    name: service.name,
  }));
console.log(rowsData)
 const columns = [
        // {
        //     field: "id",
        //     headerName: " ID",
        //     minWidth: 50,
        //     flex: 0.3,
        // },
        {
            field: "Name",
            headerName: "Main Catagory",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                console.log('params: ', params)
                return (
                    <Box display="flex" alignItems="center" justifyContent={"center"} gap={"5px"}>
                        <Box backgroundColor={"#F3F6F9"} padding={"3px"}  borderRadius={"5px"}>
                            <StyledIcon
                                sx={{
                                    color: colors.orange[500],

                                }}
                            >
                                {/* <Iconify icon={params.row?.image} width={30} height={30} /> */}
                                <img src={params.row?.image} width={30} height={30} />
                            </StyledIcon>

                        </Box>
                        <Box gap={"1px"} alignItems="center" justifyContent={"center"}  >
                            <Box >{params?.row?.name} </Box> <p ></p>
                           {
                           data.subServices.SubServices.filter((item)=> item.category.name === params.row?.name).length?  
                           <p> {`${(data.subServices.SubServices.filter((item)=> item.category.name === params.row?.name).length)} subcatagory`} </p>
                           :<p>no sub category</p>
                           }
                        </Box>

                    </Box>
                )
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions setMainCategoryName={setMainCategoryName}editRoute={"w"} id={params.row.id} name={(params.row.name) } rowData={params.row}/>
                );
            },
        },
    ];


    return (
        <>
            <Typography variant="h5"
                color={colors.grey[100]}
                fontWeight="500">
                Main Catagory
            </Typography>
            <DataGrid
                // checkboxSelection
                rows={rowsData?rowsData:0}
                columns={columns}
                pageSize={4}
                disableSelectIconOnClick
                sx={{
                    boxShadow: 0,
                    border: 0,
                    '& .MuiDataGrid-checkboxSelection': {
                        backgroundColor: '#ffe500',
                        color: 'white',
                    },
                }}
            />
        </>
    )
}

export default Table