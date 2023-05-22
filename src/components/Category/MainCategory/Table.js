import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import MainCatData from "../../../data/MainCatData.json"
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Actions from './Actions';
import { tokens } from "../../../theme";
import { alpha, styled } from '@mui/material/styles';
import Iconify from '../../../Utils/Iconify';
const StyledIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: 40,
    height:40,
    justifyContent: 'center',
  
  }));
function Table() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "id",
            headerName: "Main Catagory ID",
            minWidth: 50,
            flex: 0.3,
        },
        {
            field: "Name",
            headerName: "Main Catagory",
            minWidth: 200,
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

                                <Iconify icon={params.row.image} width={30} height={30} />
                            </StyledIcon>
                            
                        </Box>
                        <Box gap={"1px"} alignItems="center" justifyContent={"center"}  >
                            <Box >{params.row.Name} </Box> <p ></p>
                            <p>{params.row.num} subcatagory </p>
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
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (

                    <Actions editRoute={"w"} id={params.row.id} name={(params.row.Name)} />
                );
            },
        },



    ];
    const rows = [];
    console.log(MainCatData)
    return (
        <>
            <Typography variant="h5"
                color={colors.grey[100]}
                fontWeight="500">
                Main Catagory
            </Typography>
            <DataGrid
                checkboxSelection
                rows={MainCatData.mainCat}
                columns={columns}
                pageSize={7}
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