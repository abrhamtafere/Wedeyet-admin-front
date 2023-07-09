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
import axios from 'axios';
import { editSubCategory, deleteSubCategory } from '../../../redux/mainCategory';
const StyledIcon = styled('div')(() => ({
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center',

}))
function Actions({ id, main, name, editRoute, rowData }) {
    const maincategoryData = useSelector((state) => state.mainCategoryState.mainCategory);
    const dispatch = useDispatch();
    const [value, setValue] = useState(name);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [maindata, setMain] = useState(main);
    const [subCategoryName, setSubCategoryName] = useState(rowData.subcategoriename)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [branchImages, setBranchImages] = useState();
    const [mainCategoryName, setMainCategoryName] = useState(name)
    const auth = useSelector((state) => state.persistedReducer.user);
    const [fileName, setFileName] = useState(rowData.image);
    const fileInputRef = React.useRef(null);
    const handleClose = () => {
        setOpen(false);
    };
    const handleEditClose = () => {
        setEditOpen(!editOpen)
    }
    const editSubService = (id,editData)=>{
        axios.put(`https://wedeyet.herokuapp.com/api/subservice/update/${id}`, editData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+auth.token
            }
        }).then((response) => {
            console.log(" Edit Response : ",response,response.data)    
        }).catch((error) => { 
            console.error(" Edit Error : ",error.message)
        })
    }
    const deleteSubServices = (id) => {
        axios.delete(`https://wedeyet.herokuapp.com/api/subservice/delete/${id}`, {
            headers: {
                'Authorization': 'Bearer '+auth.token
            }
        }).then((response) => {
            console.log(" Delete Response  : ",response,response.data)    
        }).catch((error) => { 
            console.error(" Edit Error : ",error)
        })
    }
    const deleteHandeler = () => {
        // setData((prevData) => prevData.filter((item) => !maindata.includes(item.id)));
        dispatch(deleteSubCategory(id))
        // main.filter(item => item.id==!id)
        console.log(" Delete SubService : ", id)
        deleteSubServices(id)
        
    }
    const handleSelectBranchImages = (event) => {   
        if (event.target.files) {
         setBranchImages(event.target.files[0]);
        }
    }
  

    const editHandeler = (e) => {
        var editData={};
        if (branchImages) { 
            editData.image = branchImages
        }
        if (subCategoryName) {
            editData.name = subCategoryName
        }
        e.preventDefault();
        console.log(" Edit Data : ", editData, " ID: ", id)
        editSubService(id,editData)
        dispatch(editSubCategory(editData))
        setEditOpen(!editOpen)
    }
    return (
        <>
            <Box display={"flex"} justifyContent="flex-left" alignItems="center" gap={"3px"}>

                <Box onClick={() => handleEditClose()} bgcolor={"#F3F6F9"} p={"4px"} display={"flex"} justifyContent="flex-left" alignItems="center" borderRadius={"3px"} sx={{ cursor: "pointer" }}>
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
                            {/* <Typography
                                variant="h6"
                                color={colors.grey[100]}
                                fontWeight="600"
                            >
                                Main Category Name
                            </Typography> */}
                            
                            <Typography
                                variant="h6"
                                color={colors.grey[100]}
                                fontWeight="600"
                            >
                                Name
                            </Typography>
                            <TextField
                                fullWidth
                                label="Name"
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
                            <input type="file"  onChange={handleSelectBranchImages} />
                            {/* <FileChooserButton edit={true} value={fileName} fileName={fileName} setFileName={setFileName} inputRef={fileInputRef} /> */}
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