import React from 'react'


import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import wedeyetLogo from "./wedeyetLogo.png"
import LoginForm from "../components/Login/LoginForm";
import { tokens } from "../theme";

const LoginPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <>
      <Box
        width="10%"
        p="1rem 6%"
        textAlign="left"
      >
        <Box display="flex" flexDirection="row" justifyContent="flex-left" alignItems="center" >
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center"
          >
            <img
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              alt="profile-user"
              width="50px"
              height="50px" 
              object-fit="cover"
              src={wedeyetLogo}
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />
          </Box>
          <Box display="flex" gap="10px" justifyContent="center" alignItems="center">
            <Typography
              variant="h5"
              color={colors.grey[100]}
              fontWeight="bold"

            >
              Wedeyet
            </Typography>
            <Typography variant="h5" fontWeight="bold" color={colors.greenAccent[500]}>
              Admin
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box justifyContent="center"
        alignItems="center" /* bgcolor={"blue"}  */width={"100vw"} display="flex" height="88vh" >

        <Box
          justifyContent="center"
          alignItems="center"
          width={isNonMobileScreens ? "30%" : "93%"}
          p="2rem"
          m="3.5rem auto"
          borderRadius="1.5rem"
          backgroundColor="white"
          boxShadow="1"
        >
          <Typography align='center' fontWeight="600" variant="h3" sx={{ mb: "1.5rem" }}>
            Login
          </Typography>
          <LoginForm />
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;

