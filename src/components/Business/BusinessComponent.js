import { Box, Grid, Chip, Button, TextField } from "@mui/material"
import { styled } from '@mui/material/styles';
import TextFieldComponent from "../global/TextFieldComponent"
import { useState, useEffect, useRef } from "react";
import Lable from "../global/Lable";
import { FileChooserButton } from "../Category/MainCategory/FileChooserButton";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; import { useSelector, useDispatch } from "react-redux";
import categorys from "../../data/category.json"
import { setData, setFilterSub } from '../../redux/mainCategory';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { Add } from '@mui/icons-material';
// import { SwitchComponent } from "../../Utils/SwitchComponent";
import { CheckBoxOutlined } from "@mui/icons-material";
import ButtonComponent from "../global/ButtonComponent";
import Branch from "./Form/Branch";

function BusinessComponent() {

  const maincategoryData = useSelector((state) => state.mainCategoryState.mainCategory);
  const sub = useSelector((state) => state.mainCategoryState.sub);
  const [businessName, setbusinessName] = useState('');
  const [fileName, setFileName] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [branch, setBranch] = useState(false);
  const [place, setPlace] = useState('');
  const [location, setLocation] = useState('');
  const [telegramUserName, settelegramUserName] = useState('');
  const [about, setAbout] = useState('');
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');
  // const [text, setText] = useState('');

  const fileInputRef = useRef(null);
  const [selectedMainCategory, setSelectMainCategory] = useState('');
  const [subcategory, setsubcategory] = useState("");
  const [branchChecked, setBranchChecked] = useState(true);
  const [state, setState] = useState({
    checkedA: true,
  });
  // branch
  const [open, setOpen] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [file, setFile] = useState('');
  const [phone, setPhone] = useState('');
  const [selectplace, setAPlace] = useState('');
  const [avatar, setAvatar] = useState('');
  const [description, setDescription] = useState('');
  const [chips, setChips] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSetBranch = (event) => {
    setBranchName(event.target.value)
  }
  const handleSetPhone = (event) => {
    setPhone(event.target.value)
  }
  const handleClose = () => {
    setOpen(false);
  };
  console.log(selectplace)
  const handleSave = () => {
    setChips([...chips, branchName]);
    setOpen(false);
    setBranchName('');
    setFile('');
    setAvatar('');
    setDescription('');
  };

  //

  const handleSwitchChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  console.log(branchChecked)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setData(categorys))
  }, [])
  console.log(subcategory)
  console.log(selectedMainCategory)
  const handleChange = (event) => {
    setSelectMainCategory(event.target.value);
    console.log(event.target.value)
    setsubcategory(sub)
    const index = maincategoryData.findIndex((d) => d.id == event.target.value)
    console.log(index)
    const subData = maincategoryData[index]/* .subcategories.map((m)=>m.name) */
    dispatch(setFilterSub(event.target.value.id))
    console.log("subcategory")
    console.log(event.target.value)

  };
  const handleChangeSubCategory = (event) => {
    setsubcategory(event.target.value);
    console.log(event.target.value)
  };
  console.log(subcategory);
  const handlebusinessNameChange = (event) => {
    setbusinessName(event.target.key.value);
  };
  console.log(state.checkedA)
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
                <InputLabel id="demo-simple-select-helper-label">Select Main Category</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={selectedMainCategory}
                  // defaultValue={maincategoryData[0].name}
                  label="Select Main Category"
                  onChange={handleChange}
                >
                  {maincategoryData.map((main) => <MenuItem key={main.id} value={main}>{main.name}</MenuItem>)}

                </Select>
              </FormControl>
            </Box>
            <Box mb={"5px"}>
              <Lable text="Sub Category Name" />
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label1"> {selectedMainCategory ? sub[0]?.name : "Select Sub-Category"}</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label1"
                  id="demo-simple-select-helper1"
                  // value={subcategory}
                  label={sub[0]?.name}
                  onChange={handleChangeSubCategory}
                >
                  {sub.map((s) => <MenuItem value={s.name}>{s.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
            <Box mb={"5px"}>
              Branch
              <Switch checked={state.checkedA} onChange={handleSwitchChange} name="checkedA" sx={{

                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#52d869",

                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#52d869",
                },
              }} />
            </Box>
          </Box>
          {state.checkedA && <Box mb={"5px"}>
            <Lable text="Sub Category Name" />
            <Box gap={"5px"} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
              <TextField fullWidth disabled placeholder="Add Branch"  /* value={name} */ InputProps={{
                startAdornment: (
                  <div>
                    {chips.map((chip) => (
                      <Chip key={chip} label={chip} onDelete={() => setChips(chips.filter((c) => c !== chip))} />
                    ))}
                  </div>
                ),
              }} />
              <ButtonComponent buttonText={"Add"} onClick={handleClickOpen} isicon={true} startIcon={<Add />} />
            </Box>
          </Box>
          }

          <Branch
            open={open}
            branchName={branchName}
            setBranchName={handleSetBranch}
            handleClose={handleClose}
            handleSave={handleSave}
            setFile={setFile}
            file={file}
            mainCategory={selectedMainCategory}
            subcategory={subcategory}
            setPhone={handleSetPhone}
            // plcaeName={PlaceName}
            Place={selectplace}
            setAPlace={setAPlace}

          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box bgcolor={"blue"} padding={"2px"}>xc</Box>
        </Grid>

      </Grid>

    </Box>
  )
}

export default BusinessComponent