import { useState } from 'react';
import React from 'react'
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Box, TextField, Button, useTheme, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import { editMainCategory, deleteRows } from '../../../redux/mainCategory';
import { FileChooserButton } from './FileChooserButton';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import Iconify from '../../../Utils/Iconify';
const StyledIcon = styled('div')(() => ({
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center',
  
  }))
const Actions = ({ id, main, name, editRoute, rowData }) => {
    const maincategoryData = useSelector((state) => state.mainCategoryState.mainCategory);
    const dispatch = useDispatch();
    const [value, setValue] = useState(rowData.name);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [maindata, setMain] = useState(main);
    const [subCategoryName, setSubCategoryName] = useState(name)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [mainCategoryName, setMainCategoryName] = useState(name)
    const [fileName, setFileName] = useState(rowData.image);
    const fileInputRef = React.useRef(null);
    const handleClose = () => {
        setOpen(false);
    };
    const handleEditClose = () => {
        setEditOpen(!editOpen)
    }
    const deleteHandeler = () => {
        // setData((prevData) => prevData.filter((item) => !maindata.includes(item.id)));
        dispatch(deleteRows(id))
        // main.filter(item => item.id==!id)
        console.log(id)
        console.log("deleter")
    }
    const editData = {
        id: rowData.id, name: mainCategoryName,
        image: fileName,
    }


    const editHandeler = (e) => {
        e.preventDefault();
        dispatch(editMainCategory(editData))
        setEditOpen(!editOpen)

    }
    return (
        <>
            <Box display={"flex"} justifyContent="flex-left" alignItems="center" gap={"3px"}>


                <Box onClick={() => handleEditClose()} bgcolor={"#F3F6F9"} p={"4px"} display={"flex"} justifyContent="flex-left" alignItems="center" borderRadius={"3px"}sx={{ cursor: "pointer" }}>
                    <EditIcon color="warning" />
                </Box>

                <Box onClick={() => deleteHandeler()} bgcolor={"#F3F6F9"} p={"4px"} display={"flex"} justifyContent="flex-left" alignItems="center" borderRadius={"3px"} sx={{ cursor: "pointer" }}>
                    <DeleteIcon color="error" />
                </Box>
            </Box>
            <Dialog
                open={editOpen}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit Main Category "}
                </DialogTitle>
                <DialogContent>
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
            // value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            //  inputValue={value}
           
           
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
                                label="sub Category Name"
                                value={subCategoryName}
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
                                name="sub Category Name"
                            />
                            <Typography
                                variant="h6"
                                color={colors.grey[100]}
                                fontWeight="600"
                            >
                                Choose Image
                            </Typography>

                            <FileChooserButton edit={true} value={fileName} fileName={fileName} setFileName={setFileName} inputRef={fileInputRef} />
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
                                onClick={editHandeler}>
                                Edit
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h5"
                        color={colors.grey[100]}
                        fontWeight="500">
                        Do you really want to delete <span style={{ color: "red" }}>{name}</span> <br /> This process cannot be undone
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Box onClick={handleClose} sx={{ cursor: "pointer" }}>
                        <Typography variant="h5"
                            color="lightblue"
                            fontWeight="bold">
                            Cancle
                        </Typography>
                    </Box>
                    <Box ml={"5px"} onClick={handleClose} sx={{ cursor: "pointer" }}>
                        <Typography onClick={() => deleteHandeler()} variant="h5"
                            color="red"
                            fontWeight="bold">
                            Delete
                        </Typography>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Actions;