import React from 'react'
import { useState } from 'react';
import { tokens } from "../../../theme";
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FileChooserButton } from './FileChooserButton';
import Table from './Table';
import { setData, addNewSubCategory } from '../../../redux/mainCategory';
import { useDispatch, useSelector } from 'react-redux';
import { generateRandomId } from '../../../Utils/randomID';
import Iconify from '../../../Utils/Iconify';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
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
  const [inputValue, setInputValue] = useState('');
  const maincategoryData = useSelector((state) => state.mainCategoryState.mainCategory);
  const handleAddSubCategory = () => {
    const data = {
      id: generateRandomId(),
      mainID:value.id,
      name: value.name,
      image: fileName,
      subcategoriename:subCategoryName
      // subcategories:"dsd"
    }
    dispatch(addNewSubCategory(data))
    console.log(data)
    // console.log(maincategoryData)
    console.log(maincategoryData)
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
            Main Category Name
          </Typography>
          <Autocomplete
            id="country-select-demo"
            options={maincategoryData}
            autoHighlight
            getOptionLabel={(maincategoryData) => maincategoryData.name}
            value={value.name}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            // inputValue={value.name}
             renderOption={(props, maincategoryData) => (
              <Box sx={{ display: "flex",/* bgcolor:colors.greenAccent[500] */ alignItems: "center", justifyContent: "flex-start !important" }} {...props}>
                {/* <img
                  loading="lazy"
                  width="20"
                  src={}
                  alt=""
                /> */}

                <StyledIcon
                  sx={{
                    color: colors.orange[500],
                  }}
                >
                  <Iconify icon={maincategoryData.image} width={30} height={30} />
                </StyledIcon>
                {maincategoryData.name} {/* ({option.code}) +{option.phone} */}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Choose a Main Category"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
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
              />
            )}
          />
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

          <FileChooserButton fileName={fileName} setFileName={setFileName} inputRef={fileInputRef} />
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