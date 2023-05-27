import React from 'react'
import { Box, Grid } from "@mui/material"
import { Button,useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Lable from '../../global/Lable';
import TextFieldComponent from '../../global/TextFieldComponent';
import { FileChooserButton } from '../../Category/MainCategory/FileChooserButton';
import Autocomplete from '@mui/material/Autocomplete';
import { tokens } from '../../../theme';

function Branch({ open,
    branchName,
    setFile,
    setBranchName,
    handleClose,
    handleSave,
    file,
    subcategory,
    mainCategory,
    setPhone,
    
    setAPlace,
    Place,
}) {
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
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fileInputRef = React.useRef(null);
    return (
        <>

            <Dialog open={open} maxWidth={"md"} fullWidth={true} onClose={handleClose} >
                <DialogTitle>Add Branch</DialogTitle>
                <DialogContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Box padding={"2px"}>
                                <Box mb={"5px"}>
                                    <Lable text="Branch Name" />
                                    <TextFieldComponent label="Business Name" onChange={setBranchName} />
                                </Box>
                                <Lable text="Branch Images" />
                                <Box mb={"5px"}>
                                    <FileChooserButton fileName={file} setFileName={setFile} inputRef={fileInputRef} />
                                </Box>
                                <Box mb={"5px"}>
                                    <Lable text="Branch Main Category" />
                                    <TextFieldComponent label="Branch Main Category" value={mainCategory.name} onChange={setBranchName} />
                                </Box>
                                <Box mb={"5px"}>
                                    <Lable text="Branch Sub Category" />
                                    <TextFieldComponent label="Branch Sub Category" value={subcategory} onChange={setBranchName} />
                                </Box>
                                <Box mb={"5px"}>
                                    <Lable text="Branch Phone Number" />
                                    <TextFieldComponent label="Branch Phone Number" onChange={setPhone} />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Box padding={"2px"}>
                                <Box mb={"5px"}>
                                    <Lable text="Branch Place" />
                                    <Autocomplete
                                        id="country-select-deuo"
                                        options={PlaceName}
                                        autoHighlight
                                        getOptionLabel={(PlaceName) => PlaceName.name}
                                        value={Place.name}
                                        onChange={(event, newValue) => {
                                            setAPlace(newValue.name);
                                        }}
                                        // inputValue={value.name}
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
                                <Lable text="Branch Images" />
                                <Box mb={"5px"}>
                                    <FileChooserButton fileName={file} setFileName={setFile} inputRef={fileInputRef} />
                                </Box>
                                <Box mb={"5px"}>
                                    <Lable text="Branch Main Category" />
                                    <TextFieldComponent label="Branch Main Category" value={mainCategory.name} onChange={setBranchName} />
                                </Box>
                                <Box mb={"5px"}>
                                    <Lable text="Branch Sub Category" />
                                    <TextFieldComponent label="Branch Sub Category" value={subcategory} onChange={setBranchName} />
                                </Box>
                                <Box mb={"5px"}>
                                    <Lable text="Branch Phone Number" />
                                    <TextFieldComponent label="Branch Phone Number" onChange={setPhone} />
                                </Box>
                            </Box>
                        </Grid>

                    </Grid>
                    {/* <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField type="file" label="Choose File" value={file} onChange={(e) => setFile(e.target.value)} />
          <TextField label="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>

            </Dialog>


        </>
    )
}

export default Branch