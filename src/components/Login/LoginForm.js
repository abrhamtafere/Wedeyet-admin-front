import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Grid,
  Alert,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import { useFormik } from "formik";
import * as yup from "yup";
import { useCookies } from "react-cookie";
import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/auth";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };
  const togglePasswordShow = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "https://wedeyet.herokuapp.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    if (loggedInResponse.status !== 200) {
      setLoginError(true);
      setTimeout(()=>{
        setLoginError(false)
      }, 6000)
      return;
    }

    const loggedIn = await loggedInResponse.json();
    // console.log(loggedIn);
    setCookies("token", loggedIn.User.token);
    setCookies("role", loggedIn.User.role);
    setCookies("id", loggedIn.User._id);
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.User,
        })
      );
      navigate("/categorys");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  const LinkStyle = {
    textDecoration: "none",
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        resetForm,
      }) => (
      <>
      {loginError && (
    <Alert severity="error" sx={{ marginBottom: '8px' }}>Incorrect credentials!</Alert>
  )}
      
        <form onSubmit={handleSubmit} className=''>
 {/* {console.log(values.password) } */}

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
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: colors.greenAccent[400],
                  },
                },
                "& .MuiOutlinedInput-root:Mui-focused": {
                  "& > fieldset": {
                    borderColor: colors.greenAccent[400],
                  },
                },
                gridColumn: "span 4",
              }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              // sx={{ gridColumn: "span 4" }}
            />

            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {values.password !== "" && (
                      <IconButton
                        // we can do simple hostage for the button
                        onMouseDown={togglePasswordShow}
                        onMouseUp={togglePasswordShow}
                      >
                        {passwordShown ? (
                          <VisibilityOffTwoToneIcon />
                          ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
              label="Password"
              type={passwordShown ? "text" : "password"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: colors.greenAccent[400],
                  },
                },
                "& .MuiOutlinedInput-root:Mui-focused": {
                  "& > fieldset": {
                    borderColor: colors.greenAccent[400],
                  },
                },
                gridColumn: "span 4",
              }}
            />
          </Box>

          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    color="primary"
                  />
                }
                label="Remember me"
              />
            </Grid>
            <Grid item xs />
            <Grid item>
              <Typography
                component={Link}
                to="/forgot-password"
                style={LinkStyle}
              >
                Forgot Password?
              </Typography>
            </Grid>
          </Grid>

          <Box>
            <Button
              fullWidth
              type="submit"
              disabled={isSubmitting}
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: colors.greenAccent[500],
                color: colors.white[100],
                "&:hover": {
                  color: colors.white[100],
                  backgroundColor: colors.greenAccent[400],
                },
              }}
            >
              {isSubmitting ? 'Processing...' : 'Login'} 
              {/* Submitting*/}
            </Button>
            <Box color={colors.grey[500]} textAlign="center">
              Don't have an account?&nbsp;
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  color: "primary",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Link>
            </Box>
          </Box>
        </form>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
