import React from 'react'
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Header from '../components/global/Header';
import EmailTemplateComponent from '../components/EmailTemplate/EmailTemplateComponent';
function EmailTemplate() {
  return (
    <><Header title={"Add Email Template"} />
      <Box width="100%" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
<EmailTemplateComponent/>
      </Box>
    </>
  )
}

export default EmailTemplate