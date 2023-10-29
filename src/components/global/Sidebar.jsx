import React from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import wedeyetLogo from "./wedeyetLogo.png";
import BusinessIcon from "@mui/icons-material/Business";
import Divider from "@mui/material/Divider";
import EmailIcon from "@mui/icons-material/Email";
import QuizIcon from "@mui/icons-material/Quiz";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AdminMenu from "./AdminMenu";
import { useSelector } from "react-redux";
import PlaceIcon from '@mui/icons-material/Place';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ setIsSidebar, isSidebarOn }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Categorys");

  const auth = useSelector((state) => state.persistedReducer.user);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setIsSidebar(!isSidebarOn);
    console.log("isSidebarOn");
  };
  return (
    <Box
      display="flex"
      sx={{
        // position:"fixed !important",
        zIndex: "100",
        "& .pro-sidebar-inner": {
          height: "100vh",

          background: `${colors.primary[400]} !important`,
          // background: "white !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 10px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#61CE70 !important",
        },
        "& .pro-menu-item.active": {
          //backgroundColor:"#81CA8C !important",
          borderLeft: "5px solid #61CE70 !important",

          color: "#464E5F !important",
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{ position: "fixed", height: "100vh" }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => handleCollapse()}
            // onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  color="white"
                  borderRadius="100%"
                  p="10px"
                  height="25px"
                  width="25px"
                  alignItems="center"
                  justifyContent="center"
                  display="flex"
                >
                  <ArrowForwardIosIcon />
                </Box>
              ) : undefined
            }
            style={{
              margin: "10px 0 5px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => handleCollapse()}>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    color="white"
                    borderRadius="100%"
                    p="10px"
                    height="25px"
                    width="25px"
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                  >
                    <ArrowBackIosNewIcon />
                  </Box>
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box
              mb="15px"
              display="flex"
              flexDirection="row"
              justifyContent="flex-left"
              alignItems="center"
            >
              <Box
                ml="20px"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  object-fit="cover"
                  src={wedeyetLogo}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box
                display="flex"
                gap="10px"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
                  fontWeight="bold"
                >
                  Wedeyet
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box mb="25px" ml="40px">
            <Divider />
          </Box>

          {/* {auth.role === "ADMIN" ? ( */}
          {auth.role === "SUPERADMIN" ? (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard "
                to="/superAdminPage"
                icon={<DashboardIcon sx={{ color: colors.grey[500] }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Admins"
                to="/admins"
                icon={<PersonIcon sx={{ color: colors.grey[500] }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Categorys"
                to="/categorys"
                icon={<CategoryIcon sx={{ color: colors.grey[500] }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Businesses"
                to="/businesses"
                icon={<BusinessIcon sx={{ color: colors.grey[500] }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Area"
                to="/place"
                icon={<PlaceIcon sx={{ color: colors.grey[500] }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="FAQ"
                to="/faq"
                icon={<QuizIcon sx={{ color: colors.grey[500] }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Email Template"
                to="/emailtemplate"
                icon={<EmailIcon sx={{ color: colors.grey[500] }} />}
                selected={selected}
                setSelected={setSelected}
              /> 
              {/* <AdminMenu collapsed={isCollapsed} /> */}
            </Box>
          ) : (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
             <Item
                title="Categorys first"
                to="/categorys"
                icon={<CategoryIcon sx={{ color: colors.grey[500] }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Businesses"
                to="/businesses"
                icon={<BusinessIcon sx={{ color: colors.grey[500] }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Area"
                to="/place"
                icon={<PlaceIcon sx={{ color: colors.grey[500] }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="FAQ"
                to="/faq"
                icon={<QuizIcon sx={{ color: colors.grey[500] }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Email Template"
                to="/emailtemplate"
                icon={<EmailIcon sx={{ color: colors.grey[500] }} />}
                selected={selected}
                setSelected={setSelected}
              /> 
              {/* <AdminMenu collapsed={isCollapsed} /> */}
            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
