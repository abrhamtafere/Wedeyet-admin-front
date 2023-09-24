import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Category from "./Page/Category";
import { CategoryDetails } from "./components/Category/MainCategory/CategoryDetails";
import Business from "./Page/Business ";
import Faq from "./Page/Faq";
import EmailTemplate from "./Page/EmailTemplate";
import "./App.css";
import LoginPage from "./Page/LoginPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SuperAdmin from "./Page/SuperAdminPage/SuperAdmin";
import Dashboard from "./Page/SuperAdminPage/Dashboard";
import AdminPage from "./Page/AdminPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Unauthorized from "./Page/Unauthorized";
import { Box, Grid } from "@mui/material";
import Admins from "./Page/SuperAdminPage/Admins";
import ProfilePage from "./components/ProfilePage";
import EditPlacePage from "./Page/EditPlace";
import DeleteComponent from "./Page/DeletePlace";
import DeletePlacePage from "./Page/DeletePlace";
import PlaceRegistration from "./components/Area/PlaceRegistration";
import axios from "axios";
// import ProtectedRouteAdmin from "./ProtectedRoute/ProtectedRouteAdmin";

function App() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.persistedReducer.user);
  const { _id, token } = isAuth;
  // console.log(isAuth);

  const ROLES = {
    ADMIN: 2001,
    SUPERADMIN: 5150,
  };

  const [isSidebarOn, setIsSidebar] = useState(true);
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState({});
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  //current user info
  useEffect(() => {
    axios
      .get("https://wedeyet.herokuapp.com/api/auth/current/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.User);
        console.log("auth data ", user);
        // setAllSubCategory(data);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
      });
  }, []);
// if(!user) return <h1>user is fetching hello world</h1>
  return (
    <ColorModeContext.Provider value={colorMode}>
      {/* <h1 className='text-3xl bg-blue-300 underline'>Hellow world</h1> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Grid container spacing={2}>
            {token && isSidebarOn ? (
              <Grid
                item
                xs={12}
                sm={3}
                md={2}
                marginRight={isSidebarOn ? "50px" : ""}
              >
                {/* here to push the main content to right when sidebar is on: marginRight={isSidebarOn ? '50px' : '' */}
                <Sidebar
                  isSidebarOn={isSidebarOn}
                  setIsSidebar={setIsSidebar}
                />
              </Grid>
            ) : (
              token && (
                <Grid item xs={12} sm={3} md={1}>
                  {<Sidebar setIsSidebar={setIsSidebar} />}
                </Grid>
              )
            )}

            {isSidebarOn ? (
              <Grid item xs={12} sm={9} md={isSidebarOn ? 9 : 11}>
                <main className="content transition duration-700 ease-in-out">
                  {token && (
                    <div className="p-12 bg-transparent">
                      <Topbar setIsSidebar={setIsSidebar} />
                    </div>
                  )}
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route
                      element={
                        <ProtectedRoute
                          allowedRoles={["ADMIN", "SUPERADMIN"]}
                        />
                      }
                    >
                      <Route exact path="/" element={<Category />} />
                      <Route
                        path="/profile"
                        element={<ProfilePage user={user} />}
                      />
                      {/* <Route path="/categorydetails" element={<CategoryDetails />} /> */}
                      <Route path="/place" element={<PlaceRegistration />} />
                      <Route path="/categorys" element={<Category />} />
                      <Route path="/businesses" element={<Business />} />
                      <Route path="/edit/:id" element={<EditPlacePage />} />
                      <Route path="/delete/:id" element={<DeletePlacePage />} />
                      <Route path="/faq" element={<Faq />} />
                      <Route
                        path="/emailtemplate"
                        element={<EmailTemplate />}
                      />
                    </Route>
                    <Route
                      element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}
                    >
                      <Route path="/superAdminPage" element={<Dashboard />} />
                      <Route path="/admins" element={<Admins />} />
                    </Route>
                  </Routes>
                </main>
              </Grid>
            ) : (
              <Grid item xs={12} sm={9} md={10}>
                <main className="content">
                  {token && (
                    <div className="p-12">
                      <Topbar setIsSidebar={setIsSidebar} />
                    </div>
                  )}
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route
                      element={
                        <ProtectedRoute
                          allowedRoles={["ADMIN", "SUPERADMIN"]}
                        />
                      }
                    >
                      <Route exact path="/" element={<Category />} />
                      <Route
                        path="/profile"
                        element={<ProfilePage user={user} />}
                      />
                      <Route path="/categorys" element={<Category />} />
                      <Route path="/place" element={<PlaceRegistration />} />
                      <Route path="/businesses" element={<Business />} />
                      <Route path="/edit/:id" element={<EditPlacePage />} />
                      <Route path="/delete/:id" element={<DeletePlacePage />} />

                      <Route path="/faq" element={<Faq />} />
                      <Route
                        path="/emailtemplate"
                        element={<EmailTemplate />}
                      />
                    </Route>
                    <Route
                      element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}
                    >
                      <Route path="/superAdminPage" element={<Dashboard />} />
                      <Route path="/admins" element={<Admins />} />
                    </Route>
                  </Routes>
                </main>
              </Grid>
            )}
          </Grid>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
