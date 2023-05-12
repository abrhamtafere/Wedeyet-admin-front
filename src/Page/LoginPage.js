import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoginForm from "../components/LoginForm/LoginForm";


const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor="#F9F7F7"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Wedeyet
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "30%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor="white"
        boxShadow="1"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>
   <LoginForm/>
      </Box>
    </Box>
  );
};

export default LoginPage;