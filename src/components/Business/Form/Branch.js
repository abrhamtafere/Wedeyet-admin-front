import React from 'react'
import { Box, Grid } from "@mui/material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Lable from '../../global/Lable';
import TextFieldComponent from '../../global/TextFieldComponent';
function Branch({ open }) {
    return (
        <>
            <Dialog open={open} /* onClose={handleClose} */>
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Box padding={"2px"}>
                                <Box mb={"5px"}>
                                    <Lable text="Business Name" />
                                    {/* <TextFieldComponent label="Business Name" onChange={handlebusinessNameChange} /> */}
                                </Box>
                                <Lable text="Business Images" />
                                <Box mb={"5px"}>
                                    {/* <FileChooserButton fileName={fileName} setFileName={setFileName} inputRef={fileInputRef} /> */}
                                </Box>
                                <Box mb={"5px"}>
                                    <Lable text="Main Category Name" />
                                    {/* <FormControl sx={{ width: "100%" }}>
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
          </FormControl> */}
                                </Box>
                                <Box mb={"5px"}>
                                    <Lable text="Sub Category Name" />
                                    {/* <FormControl sx={{ width: "100%" }}>
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
          </FormControl> */}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Box bgcolor={"blue"} padding={"2px"}>xc</Box>
                        </Grid>

                    </Grid>
                    {/* <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField type="file" label="Choose File" value={file} onChange={(e) => setFile(e.target.value)} />
          <TextField label="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} /> */}
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button> */}
                </DialogActions>
            </Dialog>

        </>
    )
}

export default Branch