import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";
const Header = ({ title}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const activeTab = useSelector((state) => state.tabstate.tab);
  console.log(activeTab)
  console.log("activeTab")
  return (
    <Box ml="30px" mb="30px" >
      <Typography
        variant="h3"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {!activeTab? title:"Add Sub-Category"}
      </Typography>

    </Box>
  );
};

export default Header;
