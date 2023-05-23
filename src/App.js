import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Category from "./Page/Category";
import Business from "./Page/Business ";
import Faq from "./Page/Faq";
import EmailTemplate from "./Page/EmailTemplate";
import './App.css';
import LoginPage from "./Page/LoginPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SuperAdmin from "./Page/SuperAdminPage/SuperAdmin";
import AdminPage from "./Page/AdminPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Unauthorized from "./Page/Unauthorized";
import { Box, Grid } from "@mui/material";
import Admins from "./Page/SuperAdminPage/Admins";
// import ProtectedRouteAdmin from "./ProtectedRoute/ProtectedRouteAdmin";

function App() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.persistedReducer.user);
  const { _id, token } = isAuth;
  console.log(isAuth);
  const ROLES = {
    'ADMIN': 2001,
    'SUPERADMIN': 5150
  }
  const [isSidebarOn, setIsSidebar] = useState(true);
  const [theme, colorMode] = useMode();
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
   
  },[token]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Grid container spacing={10}>
           {token && isSidebarOn ? <Grid item xs={12} sm={3} md={2}>
              <Sidebar isSidebarOn={isSidebarOn} setIsSidebar={setIsSidebar} />
            </Grid> :token && <Grid item xs={12} sm={3} md={1}>
              { <Sidebar setIsSidebar={setIsSidebar} />}
            </Grid>}



            {isSidebarOn ? <Grid item xs={12} sm={9} md={10}>
              <main className="content">
                {token && <Topbar setIsSidebar={setIsSidebar} />}
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route element={<ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]} />}>
                    <Route exact path="/" element={<Category />} />
                    <Route path="/categorys" element={<Category />} />
                    <Route path="/businesses" element={<Business />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/emailtemplate" element={<EmailTemplate />} />
                  </Route>
                  <Route element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}>
                    <Route path="/superAdminPage" element={<SuperAdmin />} />
                    <Route path="/admins" element={<Admins />} />
                  </Route>

                </Routes>
              </main>
            </Grid> : <Grid item xs={12} sm={9} md={11}>
              <main className="content">
                {token && <Topbar setIsSidebar={setIsSidebar} />}
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route element={<ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]} />}>
                    <Route exact path="/" element={<Category />} />
                    <Route path="/categorys" element={<Category />} />
                    <Route path="/businesses" element={<Business />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/emailtemplate" element={<EmailTemplate />} />


                  </Route>
                  <Route element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}>
                    <Route path="/superAdminPage" element={<SuperAdmin />} />
                    <Route path="/admins" element={<Admins />} />

                  </Route>

                </Routes>
              </main>
            </Grid>}
          </Grid>

        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
