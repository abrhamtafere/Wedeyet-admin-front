import { Box, Grid } from "@mui/material"
import TextFieldComponent from "../global/TextFieldComponent"
import { useState, useEffect,useRef } from "react";
import Lable from "../global/Lable";
import { FileChooserButton } from "../Category/MainCategory/FileChooserButton";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';import { useSelector,useDispatch } from "react-redux";
import categorys from "../../data/category.json"
import { setData, deleteRows } from '../../redux/mainCategory';
function BusinessComponent() {

  const maincategoryData = useSelector((state) => state.mainCategoryState.mainCategory);
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
  const [age, setAge] = useState('');
  const [subcategory, setsubcategory] = useState([]);

  const index = maincategoryData.findIndex((d) => d.id == age)
  console.log(index)
  const subData =maincategoryData[index]/* .subcategories.map((m)=>m.name) */

const subcateData=subData?.subcategories.map((m)=>setsubcategory(m))
console.log(subcateData)
const dispatch = useDispatch();

    useEffect(()=>{
//    setRowData(categorys.MainCategories)
      dispatch(setData(categorys))
      // setsubcategory(subcateData)
   },[categorys])

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChangeSubCategory = (event) => {
    setsubcategory(event.target.value);
  };
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
            <Box mb={"5px"}>
              <FileChooserButton fileName={fileName} setFileName={setFileName} inputRef={fileInputRef} />
            </Box>
            <Box mb={"5px"}>
              <Lable text="Main Category Name" />
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  {maincategoryData.map((main)=> <MenuItem value={main.id}>{main.name}</MenuItem>)}

                </Select>
              </FormControl>
            </Box>
            <Box mb={"5px"}>
              <Lable text="Sub Category Name" />
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">Main Category</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={subcategory}
                  label="Sub Category"
                  onChange={handleChangeSubCategory}
                >

                  {subcategory.map((main)=> <MenuItem value={main.id}>{main.name}</MenuItem>)}

                </Select>
              </FormControl>
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