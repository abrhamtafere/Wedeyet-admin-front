import { Box, IconButton, useTheme } from "@mui/material";
import { useContext,useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Topbar = () => {
  const isAuth = useSelector((state) => state.persistedReducer.user);
  const { _id, token } = isAuth;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
const handleLogout=()=>{
  localStorage.removeItem('persist:root');
  window.location.reload()
  navigate("/login");
}
  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Global Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
        <Box onClick={()=>handleLogout()} padding="10px !important" display="flex" justifyContent="center" alignItems="center" backgroundColor={colors.greenAccent[400]} color="white"
          borderRadius="3px" sx={{
            cursor: 'pointer',
            '&:hover': {
              // Additional styles on hover
            },
          }}>
          logout
        </Box>
      </Box>

    </Box>
  );
};

export default Topbar;
