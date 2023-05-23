import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Box, TextField, Button, useTheme, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import { setData, deleteRows } from '../../../redux/mainCategory';

import { useDispatch, useSelector } from 'react-redux';
const Actions = ({ id, main, name, editRoute }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [maindata, setMain] = useState(main);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleClose = () => {
        setOpen(false);
    };
    const deleteHandeler=()=>{
        // setData((prevData) => prevData.filter((item) => !maindata.includes(item.id)));
        dispatch(deleteRows(id))
        // main.filter(item => item.id==!id)
        console.log(id)
        console.log("deleter")
        }
    return (
        <>
            <Box display={"flex"} justifyContent="flex-left" alignItems="center" gap={"3px"}>

                <Link to={`/admin/${editRoute}/${id}`} >
                    <Box bgcolor={"#F3F6F9"} p={"4px"} display={"flex"} justifyContent="flex-left" alignItems="center" borderRadius={"3px"}>
                        <EditIcon color="warning" />
                    </Box>
                </Link>
                <Box onClick={() => deleteHandeler()} bgcolor={"#F3F6F9"} p={"4px"} display={"flex"} justifyContent="flex-left" alignItems="center" borderRadius={"3px"} sx={{ cursor: "pointer" }}>
                    <DeleteIcon color="error" />
                </Box>
            </Box>

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
                    <Box onClick={handleClose} sx={{cursor:"pointer"}}>
                        <Typography variant="h5"
                            color="lightblue"
                            fontWeight="bold">
                            Cancle
                        </Typography>
                    </Box>
                    <Box ml={"5px"} onClick={handleClose} sx={{cursor:"pointer"}}>
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