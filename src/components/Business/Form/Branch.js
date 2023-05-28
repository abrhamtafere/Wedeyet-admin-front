import React from 'react'
import { Box, Grid ,Avatar} from "@mui/material"
import { Button, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Lable from '../../global/Lable';
import TextFieldComponent from '../../global/TextFieldComponent';
import { FileChooserButton } from '../../Category/MainCategory/FileChooserButton';
import Autocomplete from '@mui/material/Autocomplete';
import { tokens } from '../../../theme';
import { Add } from '@mui/icons-material';
function Branch({open,
    setBranchName,
    handleClose,
    handleSave,
    subcategory,
    mainCategory,
    setPhone,
    setAPlace,
    Place,
    handleBranchLocation,
    handleBranchTelegramUserName,
    handleSelectBranchImages,
    branchImages
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
                                            <input type="file" hidden multiple onChange={handleSelectBranchImages} />
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
                                                        {branchImages.slice(0, 3).map((image) => (
                                                            <Avatar key={image} alt="Image" src={image} />

                                                        ))}
                                                        {branchImages.length > 3 && (
                                                            <Avatar>
                                                                <Box display="flex" alignItems="center" justifyContent={"center"}><Add /><p>{branchImages.slice(3, branchImages.length).length}</p></Box>
                                                            </Avatar>
                                                        )}
                                                    </Box>
                                                ),
                                            }}
                                        />
                                    </Box>
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

                                <Box mb={"5px"}>
                                    <Lable text="Business Location" />
                                    <TextFieldComponent label="Business Location" onChange={handleBranchLocation} />
                                </Box>
                                <Box mb={"5px"}>
                                    <Lable text="Branch Telegram Address" />
                                    <TextFieldComponent label="Branch Telegram Address" onChange={handleBranchTelegramUserName} />
                                </Box>

                            </Box>
                        </Grid>

                    </Grid>

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