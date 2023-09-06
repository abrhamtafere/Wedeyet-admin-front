// import { Box, IconButton, useTheme } from "@mui/material";
// import { useContext,useEffect } from "react";
// import { ColorModeContext, tokens } from "../../theme";
// import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import {
  Close as CloseIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

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

import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Typography,
  Badge,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AccountCircle, Settings, ExitToApp } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { FeedbackComponent } from "../FeedbackComponent";
import { useCookies } from "react-cookie";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";

const Topbar = () => {
  const theme = useTheme();
  const settings = [
    { name: "Profile", icon: <AccountCircle /> },
    { name: "Settings", icon: <SettingsOutlinedIcon /> },
    { name: "Logout", icon: <ExitToAppOutlinedIcon /> },
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const isAuth = useSelector((state) => state.persistedReducer.user);

  const [feedbacks, setFeedbacks] = useState([]);
  const [isFeedbacksOpen, setIsFeedbacksOpen] = useState(false);
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const [cookies, setCookies, removeCookie] = useCookies();
  const token = cookies.token;

  const handleCloseFeedback = (index) => {
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.filter((_, i) => i !== index)
    );
  };

  const handleToggleFeedbacks = () => {
    setIsFeedbacksOpen((prevIsFeedbacksOpen) => !prevIsFeedbacksOpen);
  };

  useEffect(() => {
    axios
      .get("https://wedeyet.herokuapp.com/api/feedback/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("feedback ", response.data.Feedbacks);
        // console.log(res);
        // setAdmins(res);
        setFeedbacks(response.data.Feedbacks);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
      });
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    // Handle profile click logic
  };
  // nahom@gmail.com
  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    window.location.reload();
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
    if (setting === "Profile") {
      navigate("/profile");
    } else if (setting === "Settings") {
      navigate("/settings");
    } else if (setting === "Logout") {
      handleLogout();
      // navigate("/logout");
    }
  };

  const addFeedback = (message, severity) => {
    setFeedbacks((prevFeedbacks) => [...prevFeedbacks, { message, severity }]);
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      p={2}
      className="fixed top-0 left-0 w-full shadow bg-gradient-to-r from-transparent to-gray-100 pr-20 "
    >
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
      {/*  onClick={() => addFeedback('New message', 'info')} */}
      {/* <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider> */}
      {/* <IconButton
        color="inherit"
        onClick={() => {
          // addFeedback("New message", "info");
          handleToggleFeedbacks();
        }}
      >
        <Badge
          badgeContent={feedbacks ? feedbacks.length : 0}
          color="secondary"
        >
          {/* <NotificationsOutlinedIcon /> */}
          {/* <NotificationsIcon /> */}
        {/* </Badge> */}
      {/* </IconButton> */} 
      {/* {feedbacks.map((feedback, index) => ( */}
      <>
        <FeedbackComponent
          // key={index}
          message={feedbacks}
          severity={"info"}
          setFeedbacks={setFeedbacks}

          // onClose={() => handleCloseFeedback(index)}
        />
        {/* {console.log("feed.mes: ", feedback.message)} */}
      </>
      {/* ))} */}
      {/* ICONS */}
      <Box sx={{ flexGrow: 0, marginX: "10px" }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="./profile.avif" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting.name}
              onClick={() => handleSettingsClick(setting.name)}
            >
              <div className="flex items-center">
                {setting.icon}
                <Typography className="pl-2" textAlign="center">
                  {setting.name}
                </Typography>
              </div>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
