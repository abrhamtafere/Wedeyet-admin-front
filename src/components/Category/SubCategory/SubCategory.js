import React from 'react'
import { useState } from 'react';
import { tokens } from "../../../theme";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FileChooserButton } from './FileChooserButton';
import Table from './Table';
import { setData, addNewSubCategory } from '../../../redux/mainCategory';
import { useDispatch, useSelector } from 'react-redux';
import { generateRandomId } from '../../../Utils/randomID';
import Iconify from '../../../Utils/Iconify';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
const StyledIcon = styled('div')(() => ({
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: 40,
  height: 40,
  justifyContent: 'center',

}))
function SubCategory() {
  const dispatch = useDispatch();
  const [subCategoryName, setSubCategoryName] = useState("")
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [fileName, setFileName] = useState('');
  const fileInputRef = React.useRef(null);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("")
  const [branchImages, setBranchImages] = useState("");
  const [inputValue, setInputValue] = useState('');
  const auth = useSelector((state) => state.persistedReducer.user);
  const maincategoryData = useSelector((state) => state.mainCategoryState.mainCategory);
  const Service = useSelector((state) => state.mainCategoryState.ServiceSubService);

  const handleAddSubCategory = () => {
    const data = {
      category,
      name: subCategoryName,
      image: branchImages
    }
    console.log(" Handle Add Sub Category ", data)
    //  axios post with image data
    axios.post('https://wedeyet.herokuapp.com/api/subservice/create/', data, {
      headers: {
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(" Response ", res.data.SubService)
      dispatch(addNewSubCategory(res.data.SubService))
    }).catch(err => {
      console.log("Error ", err)
     })

  }
  
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
          Main Category
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
              label="Category"
              autoWidth
              onChange={(e)=>{setCategory(e.target.value)}}
            >   
          {Service?.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
         </Select>
          </Typography>
          
          <Typography
            variant="h6"
            color={colors.grey[100]}
            fontWeight="600"
          >
           Sub Category Name
          </Typography>

          <TextField
            fullWidth
            label="Main Category Name"
            onChange={(e) => setSubCategoryName(e.target.value)}
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
          <input type="file"  onChange={(e) => setBranchImages(e.target.files[0])} />
          {/* <FileChooserButton fileName={fileName} setFileName={setFileName} inputRef={fileInputRef} /> */}
          <Button variant="text" sx={{
            "&.MuiButton-root": {
              borderRadius: "4px !important",
              width: "100px",
              height: "50px",
              marginTop: "20px",
              backgroundColor: colors.greenAccent[500],
              border: "none !important",
              color: "White !important",
              textTransform: "none",
              fontSize: "15px"
            },

          }}
            onClick={handleAddSubCategory}>
            Add
          </Button>
        </Box>
      </Box>
  
       <Box borderRadius="10px" bgcolor="white" width="40vw" height="400px" marginTop="20px" padding=" 1rem 3rem">
        <Table />
       </Box> 
    </>
  )
}

export default SubCategory