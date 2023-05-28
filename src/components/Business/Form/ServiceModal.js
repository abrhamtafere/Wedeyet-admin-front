import React from 'react'
import { Button,useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
function ServiceModal() {
  return (
    <Dialog open={open} onClose={handleClose}>
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
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>
    </DialogActions>
  </Dialog>
  )
}

export default ServiceModal