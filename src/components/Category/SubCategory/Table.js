import React from 'react'
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import MainCatData from "../../../data/MainCatData.json"
import categorys from "../../../data/category.json"
import subcategorys from "../../../data/category.json"
import { Box, IconButton, Typography, tableSortLabelClasses, useTheme } from "@mui/material";
import Actions from './Actions';
import { tokens } from "../../../theme";
import { alpha, styled } from '@mui/material/styles';
import Iconify from '../../../Utils/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { setData, deleteRows } from '../../../redux/mainCategory';
import axios from 'axios'

const StyledIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center',

}));
function Table({ main }) {
    const dispatch = useDispatch();
    const maincategoryData = useSelector((state) => state.mainCategoryState.mainCategory);
    const [allSubService, setAllSubService] = useState([])
    useEffect(() => {
        //    setRowData(categorys.MainCategories)
        dispatch(setData(subcategorys))
    }, [subcategorys])
    var testAllSubService 
    //  const maincategoryData = useSelector((state) => state.mainCategoryState.mainCategory);
    const [rowData, setRowData] = useState([])
    const auth = useSelector((state) => state.persistedReducer.user);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const sub = useSelector((state) => state.mainCategoryState.sub);
    const all = useSelector((state) => state.mainCategoryState);
    console.log("Table Data SubCategory ", sub, all, maincategoryData)
    axios.get('https://wedeyet.herokuapp.com/api/subservice/all/', {
        headers:
        {
            "Authorization": "Bearer " + auth.token,
            "Content-Type": "application/json",
        }
    }).then(res => {
        // console.log("Res ", res)
        console.log(" Response Data ", res.data.SubServices)
        testAllSubService = res.data.SubServices
        testAllSubService =testAllSubService.map((item) => ({
            ...item,
            id: item._id,
         }));
        console.log(" Computed  Data ", testAllSubService)
        setAllSubService(testAllSubService)
    }).catch(err => { 
        console.error("Error ",err)
    })
    const columns = [
        {
            field: "id",
            headerName: " ID",
            minWidth: 50,
            flex: 0.3,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "category",
            headerName: "Main Catagory",
            minWidth: 200,
            flex: 0.5,
            renderCell: (params) => {
                const category = params.row.category;
                const categoryName = category ? category.name : '';
                const categoryID = category ? category.id : '';
                return (
                    <Box display="flex" alignItems="center" justifyContent={"center"} gap={"5px"}>
                        <Box backgroundColor={"#F3F6F9"} padding={"3px"} borderRadius={"5px"}>
                            <StyledIcon
                                sx={{
                                    color: colors.orange[500],
                                }}
                            >
                                {/* <Iconify icon={params.row?.image} width={30} height={30} /> */}
                            </StyledIcon>

                        </Box>
                        <Box gap={"1px"} alignItems="center" justifyContent={"center"}  >
                            <Box value={categoryID}>{categoryName} </Box> <p ></p>
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

                    <Actions editRoute={"w"} id={params.row.id} name={(params.row.name)} rowData={params.row} />
                );
            },
        },



    ];
    const rows = [];

    return (
        <>
            
            <DataGrid
                rows={allSubService}
                columns={columns}
                pageSize={8}
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
            {/* <Typography variant="h5"
                color={colors.grey[100]}
                fontWeight="500">
                Main Catagory
            </Typography> */}
        </>
    )
}

export default Table