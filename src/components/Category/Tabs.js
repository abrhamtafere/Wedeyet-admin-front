import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { tokens } from "../../theme";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import TabItem from './TabItem';
import MainCategory from './MainCategory/MainCategory';
export default function CategoryTabs({ active, handleChange }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box overflow="hidden" p="1rem" display="flex" flexDirection="row" justifyContent="center" alignItems="center" m="2.5rem 5rem" >
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ width: '100%', }}>
        <Box sx={{ /*  borderBottom: 1, */ /* borderColor: 'divider'  */ }}>
          <Tabs value={active} onChange={handleChange} TabIndicatorProps={{ style: { backgroundColor: colors.greenAccent[500], width: "30%", marginLeft: "28px", alignItems: "center !important", justifyContent: "important", } }}  >
            <Tab label={<Typography
              variant="h5"
              color={active === 0 ? colors.grey[100] : colors.grey[500]}
              fontWeight={active === 0 ? "bold" : ""}
            >
              Main-Category
            </Typography>}
              disableRipple
            />
            <Tab
              label={<Typography
                variant="h5"
                color={active === 1 ? colors.grey[100] : colors.grey[500]}
                fontWeight={active === 1 ? "bold" : ""}
              >
                Sub-Category
              </Typography>}
              disableRipple />
          </Tabs>
        </Box>
        <TabItem value={active} index={0}>
          <MainCategory/>
        </TabItem>
        <TabItem value={active} index={1}>
          Item Two
        </TabItem>

      </Box>
    </Box>
  )

}
