import { Box, Grid } from "@mui/material"
import TextFieldComponent from "../global/TextFieldComponent"
import { useState, useRef } from "react";
import Lable from "../global/Lable";
import { FileChooserButton } from "../Category/MainCategory/FileChooserButton";
function BusinessComponent() {
  const [businessName, setbusinessName] = useState('');
  const [fileName, setFileName] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [branch, setBranch] = useState(false);
  const [place, setPlace] = useState('');
  const [location, setLocation] = useState('');
  const [telegramUserName, settelegramUserName] = useState('');
  const [about, setAbout] = useState('');
  const fileInputRef = useRef(null);
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');

  const handlebusinessNameChange = (event) => {
    setbusinessName(event.target.value);
  };
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" pt={"10px"} pb={"10px"} pl={"50px"} pr={"50px"} mb={"30px"} bgcolor={"white"} width={"100%"}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={6}>
          <Box padding={"2px"}>
            <Box mb={"5px"}>
              <Lable text="Business Name" />
              <TextFieldComponent label="Business Name" onChange={handlebusinessNameChange} />
            </Box>
            <Lable text="Business Images" />
            <FileChooserButton fileName={fileName} setFileName={setFileName} inputRef={fileInputRef} />
            <Box mb={"5px"}>
              <Lable text="Main Category Name" />
              <TextFieldComponent label="Business Name" onChange={handlebusinessNameChange} />
            </Box>
          </Box>

        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box bgcolor={"blue"} padding={"2px"}>xc</Box>
        </Grid>

      </Grid>

    </Box>
  )
}

export default BusinessComponent