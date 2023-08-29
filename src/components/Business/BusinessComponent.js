import { Box, Grid, Chip, useTheme, Avatar, Button, TextField } from "@mui/material"
import TextFieldComponent from "../global/TextFieldComponent"
import { useState, useEffect, useRef } from "react";
import Lable from "../global/Lable";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; import { useSelector, useDispatch } from "react-redux";
import categorys from "../../data/category.json";
import { setData, setFilterSub } from '../../redux/mainCategory';
import Switch from '@mui/material/Switch';
import { Add } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material';
import ButtonComponent from "../global/ButtonComponent";
import Branch from "./Form/Branch";
import Autocomplete from '@mui/material/Autocomplete';
import { tokens } from '../../theme';
import { setServiceData } from "../../redux/Services";
import { generateRandomId } from "../../Utils/randomID";

function BusinessComponent({edit, record}) {
  const theme = useTheme();
  console.log(edit)
  const colors = tokens(theme.palette.mode);
  const maincategoryData = useSelector((state) => state.mainCategoryState.mainCategory);
  const sub = useSelector((state) => state.mainCategoryState.sub);
  //Busniness Varaible
  const [businessName, setbusinessName] = useState(edit?record.businessName:'');
  const [businessImages, setBusinessImages] = useState([]);
  const [fileName, setFileName] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [branch, setBranch] = useState(false);
  const [place, setPlace] = useState('');
  const [location, setLocation] = useState('');
  const [telegramUserName, settelegramUserName] = useState('');
  const [about, setAbout] = useState('');
  const [selectedMainCategory, setSelectMainCategory] = useState('');
  const [subcategory, setsubcategory] = useState("");
  const [branchChecked, setBranchChecked] = useState(true);
  const [servicePlace, setservicePlace] = useState('');
  const [serviceLocation, setServiceLocation] = useState('');
  const [serviceTelegram, setServiceTelegram] = useState('');
  const [aboutService, setAboutService] = useState('');
  const [openServiceModal, setopenServiceModal] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [servicePhone, setServicePhone] = useState('');
  const [services, setServices] = useState([]);
  const [state, setState] = useState({ checkedA: true, });
  const handleServiceOpen = () => {
    setopenServiceModal(true);
  };

  const handleServiceClose = () => {
    setopenServiceModal(false);
  };

  const handleServiceSave = () => {
    setServices([...services, serviceName]);
    setServiceName('');
    handleServiceClose();
  };
  const handelsetServiceLocation = (e) => {
    setServiceLocation(e.target.value)
  }
  const handelsetServicePhoneNumber = (e) => {
    setServicePhone(e.target.value)
  }

  const handleSelectImages = (event) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setBusinessImages((prevImages) => prevImages.concat(fileArray));
      Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  const handleSelectBranchImages = (event) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setBranchImages((prevImages) => prevImages.concat(fileArray));
      Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  // branch
  const [branches, setBranches] = useState([]);
  const [branchImages, setBranchImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [file, setFile] = useState('');
  const [phone, setPhone] = useState('');
  const [selectplace, setAPlace] = useState('');
  const [branchTelegramUserName, setBranchTelegramUserName] = useState('');
  const [branchLocation, setBrachLocation] = useState('');
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
  const handleSetTelegramUser = (event) => {
    setServiceTelegram(event.target.value)
  }

  const handleClose = () => {
    setOpen(false);
  };
  console.log(aboutService)
  const handleBranchLocation = (e) => {
    setBrachLocation(e.target.value)
  }
  const handleBranchTelegramUserName = (e) => {
    setBranchTelegramUserName(e.target.value)
  }
  const data = {
    id:branchName+"_id",
    businessName: businessName,
    businessImages: businessImages,
    selectedMainCategory: selectedMainCategory.name,
    businessName: businessName,
    subcategory: subcategory,
    servicePlace: servicePlace,
    servicePhone: servicePhone,
    serviceLocation: serviceLocation,
    serviceTelegram: serviceTelegram,
    aboutService: aboutService,
    services: services,
    Branchs: branches,
    BranchName: chips
  }

  const handleSaveBusiness = () => {
    dispatch(setServiceData(data))
    console.log(JSON.stringify(data, undefined, 4))

  }
  const handleSave = () => {
    setChips([...chips, branchName]);

    setBranches([
      ...branches,
      {
        id:Date.now(),
        serviceId:data?.id,
        branchName: branchName,
        file: branchImages,
        phone: phone,
        selectplace: selectplace,
        branchTelegramUserName: branchTelegramUserName,
        branchLocation: branchLocation,
      },
    ]);
    setOpen(false);

  };

  //Place Data
  const PlaceName = [
    {
      id: 1,
      name: "Saris"
    },
    {
      id: 2,
      name: "Saris abo"
    },
    {
      id: 3,
      name: "Sebara Babur"
    },
    {
      id: 4,
      name: "sebategna"
    },
  ]
  const handleSwitchChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  console.log(branchChecked)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setData(categorys))
  }, [categorys])
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
    setbusinessName(event.target.value);
  };
  console.log(branchName)
  /* const data = {
    "businessName": businessName,
    "businessImages": businessImages,
    "selectedMainCategory": selectedMainCategory.name,
    "businessName": businessName,
    "subcategory": subcategory,
    "servicePlace": servicePlace,
    "servicePhone": servicePhone,
    "serviceLocation": serviceLocation,
    "serviceTelegram": serviceTelegram,
    "aboutService": aboutService,
    "services": services,
    "Branchs": branches,
    "BranchName": chips
  } */

  return (
    <Box mt={"10px"} display="flex" flexDirection="row" justifyContent="center" alignItems="center" pt={"10px"} pb={"10px"} pl={"50px"} pr={"50px"} mb={"30px"}  width={"100%"}>
      <Grid container spacing={5} bgcolor={"white"} p={"10px"}>
        <Grid item xs={12} sm={12} md={6}>
          <Box padding={"2px"}>
            <Box mb={"5px"}>
              <Lable text="Business Name" />
              <TextFieldComponent label="Business Name" onChange={handlebusinessNameChange} />
            </Box>
            <Lable text="Business Images" />
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
                <Button variant="contained" component="label" sx={{
                  "&.MuiButton-root": {
                    borderRadius: "0px !important",
                    width: "120px",
                    height: "50px",
                    backgroundColor: "#DADADA",
                    border: "none !important",
                    color: "White !important",
                    textTransform: "none"
                  },
                }}>
                  Select Images
                  <input type="file" hidden multiple onChange={handleSelectImages} />
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
                        {businessImages.slice(0, 3).map((image) => (
                          <Avatar key={image} alt="Image" src={image} />

                        ))}
                        {businessImages.length > 3 && (
                          <Avatar>
                            <Box display="flex" alignItems="center" justifyContent={"center"}><Add /><p>{businessImages.slice(3, businessImages.length).length}</p></Box>
                          </Avatar>
                        )}
                      </Box>
                    ),
                  }}
                />
              </Box>
            </Box>
            <Box mb={"5px"}>
              <Lable text="Main Category Name" />
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">Select Main Category</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={selectedMainCategory}
                  label="Select Main Category"
                  onChange={handleChange}
                >
                  {/* {maincategoryData?.map((main) => <MenuItem key={main.id} value={main}>{main.name}</MenuItem>)} */}
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
            <Lable text="Add Branchs Name" />
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
           <Box mb={"5px"}>
              <Lable text="Business Phone Number" />
              <TextFieldComponent label="Business Phone Number" onChange={handelsetServicePhoneNumber} />
            </Box>
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
            handleBranchLocation={handleBranchLocation}
            handleBranchTelegramUserName={handleBranchTelegramUserName}
            handleSelectBranchImages={handleSelectBranchImages}
            branchImages={branchImages}

          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box padding={"2px"}>
            <Box mb={"5px"}>
              <Lable text="Business Place" />
              <Autocomplete
                id="country-select-deuo"
                options={PlaceName}
                autoHighlight
                getOptionLabel={(PlaceName) => PlaceName.name}
                value={servicePlace.name}
                onChange={(event, newValue) => {
                  setservicePlace(newValue.name);
                }}
                renderOption={(props, placeName) => (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start !important" }} {...props}>
                    {placeName.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Choose Branch Place"
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
            </Box>
            <Lable text="Business Location" />
            <TextFieldComponent label="Business Location" onChange={handelsetServiceLocation} />
            <Box mb={"5px"}>
              <Lable text=" Add Service" />
              <Box gap={"5px"} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                <TextField
                  fullWidth
                  select
                  label="Select Service"
                  value={serviceName}
                  onChange={(event) => setServiceName(event.target.value)}
                >
                  {services.map((service) => (
                    <MenuItem key={service} value={service}>
                      {service}
                    </MenuItem>
                  ))}
                </TextField>
                <ButtonComponent buttonText={"Add"} onClick={handleServiceOpen} isicon={true} startIcon={<Add />} />
              </Box>
            </Box>
            <Box mb={"5px"}>
              <Lable text="Telegram  User Name" />
              <TextFieldComponent label="Telegram  User Name" onChange={handleSetTelegramUser} />
            </Box>
          </Box>
          <Box mb={"5px"}>
            <Lable text="About Busniness" />
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              multiline
              rows={3}
              maxRows={4}
              placeholder="About Busniness"
              variant="outlined"
              value={aboutService}
              onChange={(event) => setAboutService(event.target.value)}
            />
          </Box>
        </Grid>
        <Box display={"flex"} justifyContent={"flex-end"} alignItems={"end"} width={"100%"} >
          <ButtonComponent buttonText={"Add Business"} onClick={handleSaveBusiness} />
        </Box>
        <Dialog open={openServiceModal} onClose={handleServiceClose}>
          <DialogTitle>Add Service</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Service Name"
              fullWidth
              value={serviceName}
              onChange={(event) => setServiceName(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleServiceClose}>Cancel</Button>
            <Button onClick={handleServiceSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  )
}

export default BusinessComponent