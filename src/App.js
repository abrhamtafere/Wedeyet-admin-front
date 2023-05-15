import { useState } from "react";
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
import SuperAdmin from "./Page/SuperAdmin";
import AdminPage from "./Page/AdminPage";
import ProtectedRouteAdmin from "./ProtectedRoute/ProtectedRouteAdmin";

function App() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user);
  const {_id, token} = isAuth;
console.log(token);

  const [isSidebar, setIsSidebar] = useState(true);
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
     {token&& <Sidebar isSidebar={isSidebar} />}  

    
        <main className="content">
         {token &&  <Topbar setIsSidebar={setIsSidebar} />}
          <Routes>
          <Route path="/login" element={<LoginPage />} />
  <Route element={<ProtectedRouteAdmin/>}>
  <Route exact    path="/categorys" element={<Category />} />
          <Route   exact  path="/businesses" element={<Business />} />
            <Route exact  path="/faq" element={<Faq />} />
            <Route exact  path="/emailtemplate" element={<EmailTemplate />} />
            <Route exact path="/superAdminPage" element={<SuperAdmin />} />
            <Route exact path="/adminPage" element={<AdminPage />} />
</Route>
           {/* <Route path="/categorys" element={token?<Category />: <Navigate to="/login" />} />
            <Route path="/businesses" element={token?<Business />:<LoginPage/>} />
            <Route path="/faq" element={token ?<Faq />:<LoginPage/>} />
            <Route path="/emailtemplate" element={token ?<EmailTemplate />:<LoginPage/>} />
            <Route exact path="/superAdminPage" element={<SuperAdmin />} />
            <Route exact path="/adminPage" element={<AdminPage />} /> */}

          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
