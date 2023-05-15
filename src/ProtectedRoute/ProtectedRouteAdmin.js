
import { Route,Redirect, Navigate, Outlet, useNavigate, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import {useEffect} from "react";
const ProtectedRouteAdmin = (props) => {
    const isAuth = useSelector((state) => state.user);
  
const {_id, token, role} = isAuth;
console.log(role)
  const auth =token
  const adminrole =role
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  if (!auth) return <Navigate to="/login" />;

  useEffect(()=>{
    if(auth && adminrole!== "ADMIN"){ 
      presentPage()
      }
  },[auth && adminrole!== "ADMIN"])



  if (adminrole === "ADMIN") {
    return <Outlet {...props} />;
  }
 else if(adminrole!=="ADMIN"){
   presentPage()
  }
};

export default ProtectedRouteAdmin;