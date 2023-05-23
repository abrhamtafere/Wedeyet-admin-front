import React from 'react'
import { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { Button, useTheme, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import BusinessIcon from '@mui/icons-material/Business';
// import Divider from '@mui/material/Divider';
import EmailIcon from '@mui/icons-material/Email';
import QuizIcon from '@mui/icons-material/Quiz';
import CategoryIcon from '@mui/icons-material/Category';
function AdminMenu({ collapsed }) {
  const auth = useSelector((state) => state.persistedReducer.user);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 220,
      '&:hover': {
        backgroundColor: "bgcolor:colors.greenAccent[500]"
      },
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,

          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: "bgcolor:colors.greenAccent[500]"
        },
        '&:hover': {
          backgroundColor: "bgcolor:colors.greenAccent[500]"
        },
      },
    },
  }));
  return (
    <div>

      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        sx={
          {
            padding: "2px !important",
            width: "90%",
            bgcolor: colors.grey[700],
            '&:hover': {
              backgroundColor: colors.greenAccent[500],
              boxShadow: 'none',
            },
            '&:active': {
              boxShadow: 'none',
              backgroundColor: colors.greenAccent[500],

            },

          }
        }
        endIcon={!collapsed&&<KeyboardArrowDownIcon />}
      >
        {!collapsed ? <Typography
          variant="h6"
          color={colors.white[100]}
          fontWeight="bold"

        >
{auth.role === "SUPERADMIN" ? <p>Admin Options</p> : <p> Super Admin Options</p>}
        </Typography> :
       <Link to="/superAdminPage" style={{ textDecoration: 'none', color: 'black' }}>
          <MenuItem onClick={handleClose} disableRipple>
            <DashboardIcon />
          </MenuItem>
        </Link>}
      </Button>



      {auth.role === "ADMIN" ? <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link to="/superAdminPage" style={{ textDecoration: 'none', color: 'black' }}>
          <MenuItem onClick={handleClose} disableRipple>
            <DashboardIcon />
            Dashboard
          </MenuItem>
        </Link>
        <Link to="/admins" style={{ textDecoration: 'none', color: 'black' }}>
          <MenuItem onClick={handleClose} disableRipple>
            <PersonIcon />
            Admins
          </MenuItem>
        </Link>
      </StyledMenu> :

       <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link to="/categorys" style={{ textDecoration: 'none', color: 'black' }}>
          <MenuItem onClick={handleClose} disableRipple>
            <CategoryIcon />
            Categorys
          </MenuItem>
        </Link>
        <Link to="/businesses" style={{ textDecoration: 'none', color: 'black' }}>
          <MenuItem onClick={handleClose} disableRipple>
            <BusinessIcon />
            Businesses
          </MenuItem>
        </Link>
        <Link to="/faq" style={{ textDecoration: 'none', color: 'black' }}>
          <MenuItem onClick={handleClose} disableRipple>
            <QuizIcon />
            FAQ
          </MenuItem>
        </Link>
        <Link to="/emailtemplate" style={{ textDecoration: 'none', color: 'black' }}>
          <MenuItem onClick={handleClose} disableRipple>
            <EmailIcon />
            Email Template
          </MenuItem>
        </Link>
      </StyledMenu>

      }
    </div>
  )
}

export default AdminMenu