import React from 'react'
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import MainCatData from "../../../data/MainCatData.json"
import categorys from "../../../data/category.json"
import subcategorys from "../../../data/category.json"
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Actions from './Actions';
import { tokens } from "../../../theme";
import { alpha, styled } from '@mui/material/styles';
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
function Table({main}) {
    const dispatch = useDispatch();
     const maincategoryData = useSelector((state) => state.mainCategoryState.mainCategory);
    useEffect(()=>{
//    setRowData(categorys.MainCategories)
      dispatch(setData(subcategorys))
   },[subcategorys])
    //  const maincategoryData = useSelector((state) => state.mainCategoryState.mainCategory);
    const [rowData, setRowData]= useState([])
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const sub = useSelector((state) => state.mainCategoryState.sub);
console.log(sub)

 const columns = [
        {
            field: "id",
            headerName: " ID",
            minWidth: 50,
            flex: 0.3,
        },
        {
            field: "subName",
            headerName: "Sub Catagory",
            minWidth: 100,
            flex: 1,
            renderCell: (params) => {
  
                return (
                    <Box display="flex" alignItems="center" justifyContent={"center"} gap={"5px"}>
                        <Box backgroundColor={"#F3F6F9"} padding={"3px"}  borderRadius={"5px"}>
                            <StyledIcon
                                sx={{
                                    color: colors.orange[500],
                                }}
                            >
                                <Iconify icon={params.row?.image} width={30} height={30} />
                            </StyledIcon>

                        </Box>
                        <Box gap={"1px"} alignItems="center" justifyContent={"center"}  >
                          
                            <Box >{params.row.subcategoriename}</Box> <p ></p>
                           {/* {params.row.subcategories?.length?  <p> {`${params.row.subcategories?.length} subcatagory`} </p>:<p>no sub category</p>} */}
                        </Box>

                    </Box>
                )
            },
        },
        {
            field: "Name",
            headerName: "Main Catagory",
            minWidth: 200,
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <Box display="flex" alignItems="center" justifyContent={"center"} gap={"5px"}>
                        <Box backgroundColor={"#F3F6F9"} padding={"3px"}  borderRadius={"5px"}>
                            <StyledIcon
                                sx={{
                                    color: colors.orange[500],
                                }}
                            >
                                <Iconify icon={params.row?.image} width={30} height={30} />
                            </StyledIcon>

                        </Box>
                        <Box gap={"1px"} alignItems="center" justifyContent={"center"}  >
                            <Box >{params.row.name} </Box> <p ></p>
                           {/* {main.name===params.row.name? <p> {`${main.subcategories?.length} subcatagory`} </p>:<p>no sub category</p>} */}
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

                    <Actions editRoute={"w"} id={params.row.id} name={(params.row.name) } rowData={params.row}/>
                );
            },
        },



    ];
    const rows = [];

    return (
        <>
            <Typography variant="h5"
                color={colors.grey[100]}
                fontWeight="500">
                Main Catagory
            </Typography>
            <DataGrid
                // checkboxSelection
                rows={sub}
                columns={columns}
                pageSize={4}
                groupModel={{
                    field: 'subName',
                  }}
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