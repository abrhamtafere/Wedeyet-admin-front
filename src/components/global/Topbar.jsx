// import { Box, IconButton, useTheme } from "@mui/material";
// import { useContext,useEffect } from "react";
// import { ColorModeContext, tokens } from "../../theme";
// import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchIcon from "@mui/icons-material/Search";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// const Topbar = () => {
//   const isAuth = useSelector((state) => state.persistedReducer.user);
//   const { _id, token } = isAuth;
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const navigate = useNavigate();
//   const colorMode = useContext(ColorModeContext);
// const handleLogout=()=>{
//   localStorage.removeItem('persist:root');
//   window.location.reload()
//   navigate("/login");
// }
//   return (
//     <Box display="flex" justifyContent="flex-end" p={2}>
//       {/* SEARCH BAR */}
//       <Box
//         display="flex"
//         backgroundColor={colors.primary[400]}
//         borderRadius="3px"
//       >
//         <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Global Search" />
//         <IconButton type="button" sx={{ p: 1 }}>
//           <SearchIcon />
//         </IconButton>
//       </Box>

//       {/* ICONS */}
//       <Box display="flex">
//         <IconButton onClick={colorMode.toggleColorMode}>
//           {theme.palette.mode === "dark" ? (
//             <DarkModeOutlinedIcon />
//           ) : (
//             <LightModeOutlinedIcon />
//           )}
//         </IconButton>
//         <IconButton>
//           <NotificationsOutlinedIcon />
//         </IconButton>
//         <IconButton>
//           <SettingsOutlinedIcon />
//         </IconButton>
//         <IconButton>
//           <PersonOutlinedIcon />
//         </IconButton>
//         <Box onClick={()=>handleLogout()} padding="10px !important" display="flex" justifyContent="center" alignItems="center" backgroundColor={colors.greenAccent[400]} color="white"
//           borderRadius="3px" sx={{
//             cursor: 'pointer',
//             '&:hover': {
//               // Additional styles on hover
//             },
//           }}>
//           logout
//         </Box>
//       </Box>

//     </Box>
//   );
// };

// export default Topbar;


import { Box, IconButton, useTheme, Menu, MenuItem, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AccountCircle, Settings, ExitToApp } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

const Topbar = () => {
  const theme = useTheme();
  const settings = [
    { name: "Profile", icon: <AccountCircle /> },
    { name: "Settings", icon: <SettingsOutlinedIcon /> },
    { name: "Logout", icon: <ExitToAppOutlinedIcon /> }
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const isAuth = useSelector((state) => state.persistedReducer.user);
  
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    // Handle profile click logic
  };

  const handleLogout = () => {
    localStorage.removeItem('persist:root');
    window.location.reload()
    navigate("/login");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Perform search logic or update search results here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform search logic or update search results here
  };

  const handleSettingsClick = (setting) => {
    handleCloseUserMenu();
    // Navigate to the settings page
    if(setting === 'Profile'){
      navigate("/profile");
    } else if(setting === 'Settings'){
      navigate("/settings");
    }
      else if(setting === 'Logout'){
        navigate("/logout");
      }
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* SEARCH BAR */}
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center rounded-md">
          <input
            type="text"
            className="py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
      <IconButton onClick={colorMode.toggleColorMode}>
    {theme.palette.mode === "dark" ? (
      <LightModeOutlinedIcon />
    ) : (
      <DarkModeOutlinedIcon />
    )}
  </IconButton>
  <IconButton>
    <NotificationsOutlinedIcon />
  </IconButton>
      {/* ICONS */}
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="https://source.unsplash.com/user/c_v_r/100x100" />
          </IconButton>
        </Tooltip>
        <Menu
  sx={{ mt: '45px' }}
  id="menu-appbar"
  anchorEl={anchorElUser}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  keepMounted
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  open={Boolean(anchorElUser)}
  onClose={handleCloseUserMenu}
>
{settings.map((setting) => (
  <MenuItem key={setting.name} onClick={() => handleSettingsClick(setting.name)}>
    <div className="flex items-center">
      {setting.icon}
      <Typography className='pl-2' textAlign="center">{setting.name}</Typography>
    </div>
  </MenuItem>
))}
</Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
