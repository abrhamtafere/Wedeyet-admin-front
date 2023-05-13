import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../theme";

// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setLogin } from "state";
// import Dropzone from "react-dropzone";
// import FlexBetween from "components/FlexBetween";


const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});



const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");




  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    // if (loggedIn) {
    //   dispatch(
    //     setLogin({
    //       user: loggedIn.user,
    //       token: loggedIn.token,
    //     })
    //   );
    //   navigate("/home");
    // }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
 await login(values, onSubmitProps);

  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={ initialValuesLogin }
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >

            <TextField
              label="Email"
              id="outlined-search"
              type="search"
              sx={{ "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: colors.greenAccent[400]
                  
                }
              },
              "& .MuiOutlinedInput-root:focus": {
                "& > fieldset": {
                  borderColor: colors.greenAccent[400]
                  
                }
              },
              gridColumn: "span 4"
            }}
              // color=}
           
            
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              // sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: colors.greenAccent[400]
                  
                }
              },
              "& .MuiOutlinedInput-root:focus": {
                "& > fieldset": {
                  borderColor: colors.greenAccent[400]
                  
                }
              },
              gridColumn: "span 4"
            }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: colors.greenAccent[500],
                 color: colors.white[100],
                "&:hover": { color:colors.white[100] ,backgroundColor: colors.greenAccent[400] },
              }}
            >
           Login           </Button>

          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
