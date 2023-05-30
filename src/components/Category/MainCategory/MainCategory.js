import React from 'react'
import { useState,useEffect } from 'react';

import { Box, Button, TextField, Avatar,Typography, useMediaQuery, useTheme } from "@mui/material";
import { FileChooserButton } from './FileChooserButton';
import Table from './Table';
import { setMainCategory } from '../../../redux/mainCategory';
import Actions from './Actions';
import { tokens } from "../../../theme";
import { styled } from '@mui/material/styles';
import Iconify from '../../../Utils/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { generateRandomId } from '../../../Utils/randomID';
import ButtonComponent from '../../global/ButtonComponent';
import { Add } from '@mui/icons-material';
import axios from 'axios'; 
import { DataGrid } from '@mui/x-data-grid';

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: 40,
  height:40,
  justifyContent: 'center',

}));
function MainCategory() {
  const [mainCategory, setMainCategoryData]=useState({})
  const [branchImages, setBranchImages] = useState([]);
  const dispatch = useDispatch();
  const [mainCategoryName, setMainCategoryName] = useState("")
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [fileName, setFileName] = useState('');
  const fileInputRef = React.useRef(null);
  const auth = useSelector((state) => state.persistedReducer.user);
 
  const data = useSelector((state) => state.mainCategoryState.mainCategory);
  console.log(data)
  const handleAdd = () => {
    const data = {
      id: generateRandomId(),
      name: mainCategoryName,
      image: fileName,
      // subcategories:"dsd"
    }
  }
  const handleSelectBranchImages = (event) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setBranchImages((prevImages) => prevImages.concat(fileArray));
      Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  
  const rowsData = data?.Services?.map((service) => ({
  id: service._id,
  name: service.name,
}));
console.log(rowsData)
const columns = [
      {
          field: "id",
          headerName: " ID",
          minWidth: 50,
          flex: 0.5,
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
                              {/* <Iconify icon={params.row?.image} width={30} height={30} /> */}
                          </StyledIcon>

                      </Box>
                      <Box gap={"1px"} alignItems="center" justifyContent={"center"}  >
                          <Box >{params?.row?.name} </Box> <p ></p>
                         {/* {params.row.subcategories?.length?  <p> {`${params.row.subcategories?.length} subcatagory`} </p>:<p>no sub category</p>} */}
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

                  <Actions editRoute={"w"} id={params?.row?.id} name={(params?.row.name) } rowData={params.row}/>
              );
          },
      },



  ];
 
  return (
    <>
   
      <Box borderRadius="10px" bgcolor="white" width="40vw" padding=" 1rem 3rem">
     
        <Box
          display="grid"
          gap="10px"
          gridTemplateColumns="repeat(1, minmax(0, 1fr))"

        >
          <Typography
            variant="h6"
            color={colors.grey[100]}
            fontWeight="600"
          >
            Main Category Name
          </Typography>
          <TextField
            fullWidth
            label="Main Category Name"
            onChange={(e) => setMainCategoryName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: colors.greenAccent[400]

                },
                width: "100%",
              },
              "& .MuiTextField-root:focused": {
                "& > fieldset": {
                  borderColor: colors.greenAccent[400]
                }
              },
              flexGrow: 1
            }}
            name="Main Category Name"
          />
          <Typography
            variant="h6"
            color={colors.grey[100]}
            fontWeight="600"
          >
            Choose Image
          </Typography>
          <Box mb={"5px"}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            '& > *': {
                                                m: 1,
                                            },
                                        }}
                                    >
                                        <Button variant="contained"  disableElevation={true} component="label" sx={{
                                            "&.MuiButton-root": {
                                                borderRadius: "0px !important",
                                                width: "120px",
                                                height: "53px",
                                                backgroundColor: "#DADADA",
                                                border: "none !important",
                                                color: "White !important",
                                                textTransform: "none"
                                            },
                                        }}>
                                            Select Images
                                            <input type="file" hidden multiple onChange={handleSelectBranchImages} />
                                        </Button>
                                        <TextField
                                            id="images"
                                            label="Images"
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            '& > *': {
                                                                m: 1,
                                                            },
                                                        }}
                                                    >
                                                        {branchImages.slice(0, 3).map((image) => (
                                                            <Avatar key={image} alt="Image" src={image} />

                                                        ))}
                                                        {branchImages.length > 3 && (
                                                            <Avatar>
                                                                <Box display="flex" alignItems="center" justifyContent={"center"}><Add /><p>{branchImages.slice(3, branchImages.length).length}</p></Box>
                                                            </Avatar>
                                                        )}
                                                    </Box>
                                                ),
                                            }}
                                        />
                                    </Box>
                                </Box>
          {/* <FileChooserButton fileName={fileName} setFileName={setFileName} inputRef={fileInputRef} /> */}
          <ButtonComponent buttonText={"Add"} onClick={handleAdd}/>
        </Box>
      </Box>

      <Box borderRadius="10px" bgcolor="white" width="40vw" height="400px" marginTop="20px" padding=" 1rem 3rem">
      <Table rowsData ={rowsData}/>    
    </Box>
    
    </>
  )
}

export default MainCategory