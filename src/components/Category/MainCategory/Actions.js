import { useState, useRef } from 'react';
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
import axios from 'axios';
function Actions({ id, main, name, editRoute, rowData }) {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.persistedReducer.user);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [maindata, setMain] = useState(main);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
     const [mainCategoryName, setMainCategoryName] = useState(rowData.name)
    const [fileName, setFileName] = useState();
    const [branchImages, setBranchImages] = useState();
    const fileInputRef = useRef(null);
    const maincategoryData = useSelector((state) => state.mainCategoryState.mainCategory);
    const handleClose = () => {
        setOpen(false);
    };
    const handleEditClose = () => {
        setEditOpen(!editOpen)
    }
    const deleteHandeler = () => {
        console.log("Delete Hanlder ID ",id)
        axios.delete(`https://wedeyet.herokuapp.com/api/service/delete/${id}`,{
            headers: {
              'Authorization': `Bearer ${auth.token}`,
            }
          } )
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        dispatch(deleteRows(id))
    }
    const handleSelectBranchImages = (event) => {   
        if (event.target.files) {
         setBranchImages(event.target.files[0]);
        }
    }

    const updateData = () => {
        var editData = {}
        if (branchImages) { 
            editData.image = branchImages
        }
        if(mainCategoryName){
            editData.name = mainCategoryName
        }
        return editData
    }
    
    const editData = updateData()
    const editHandeler = (e) => {
        e.preventDefault();
    //    console.log(" Edit Data ",editData , "Update ID : ",id)
       axios.put(`https://wedeyet.herokuapp.com/api/service/update/${id}`,editData, {
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                'Content-Type': 'multipart/form-data'
            },
          })
            .then(response => {
                console.log(response.data.Service);
            })
            .catch(error => {
                console.error(error);
            });
        // dispatch(editMainCategory(editData))
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
                                value={mainCategoryName}
                                onChange={(e) => setMainCategoryName(e.target.value)}
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




        </>
    );
};

export default Actions;