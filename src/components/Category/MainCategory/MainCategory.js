import React from 'react'
import { tokens } from "../../../theme";
import { Box,TextField, useMediaQuery, useTheme } from "@mui/material";
import { FileChooserButton } from './FileChooserButton';
function MainCategory() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fileInputRef = React.useRef(null);
  return (
    <Box  borderRadius="10px" bgcolor="white" width="40vw" padding=" 1rem 3rem">
    <Box
    display="grid"
    gap="30px"
    gridTemplateColumns="repeat(1, minmax(0, 1fr))"
   
  >
    <TextField
     fullWidth
      label="Email"
      id="outlined-search"
      type="search"
      sx={{ "& .MuiOutlinedInput-root:hover": {
        "& > fieldset": {
          borderColor: colors.greenAccent[400]
          
        },width: "100%",
      },
      "& .MuiOutlinedInput-root:focus": {
        "& > fieldset": {
          borderColor: colors.greenAccent[400]
          
        }
      },
      
      flexGrow:1
    }}
      // onBlur={handleBlur}
      // onChange={handleChange}
      // value={values.email}
      name="email"
      // error={Boolean(touched.email) && Boolean(errors.email)}
      // helperText={touched.email && errors.email}
      // sx={{ gridColumn: "span 4" }}
    />
    </Box>
 
   <FileChooserButton inputRef={fileInputRef} />
  </Box>
  )
}

export default MainCategory