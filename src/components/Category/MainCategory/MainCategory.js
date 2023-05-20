import React from 'react'
import { tokens } from "../../../theme";
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FileChooserButton } from './FileChooserButton';
function MainCategory() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fileInputRef = React.useRef(null);
  return (
    <>
    <Box borderRadius="10px" bgcolor="white" width="50vw" padding=" 1rem 3rem">
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

      <FileChooserButton inputRef={fileInputRef} />
      <Button variant="text" sx={{
        "&.MuiButton-root": {
          borderRadius: "4px !important",
          width: "100px",
          height:"50px",
          marginTop:"20px",
          backgroundColor: colors.greenAccent[500],
          border: "none !important",
          color: "White !important",
          textTransform: "none",
          fontSize:"15px"
        },

      }}
        onClick={() => {}}>
       Add
      </Button>
      </Box>
    </Box>

    <Box borderRadius="10px" bgcolor="white" width="50vw" marginTop="20px" padding=" 1rem 3rem">
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

      <FileChooserButton inputRef={fileInputRef} />
      <Button variant="text" sx={{
        "&.MuiButton-root": {
          borderRadius: "4px !important",
          width: "100px",
          height:"50px",
          marginTop:"20px",
          backgroundColor: colors.greenAccent[500],
          border: "none !important",
          color: "White !important",
          textTransform: "none",
          fontSize:"15px"
        },

      }}
        onClick={() => {}}>
       Add
      </Button>
      </Box>
    </Box>
    </>
  )
}

export default MainCategory