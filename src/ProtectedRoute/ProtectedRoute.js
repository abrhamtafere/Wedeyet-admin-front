import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ allowedRoles }) => {
    // const { auth } = useAuth();
    const auth = useSelector((state) => state.user);
    console.log(auth.role)
    const {_id, token, role} = auth;
    const location = useLocation();
    const allowroute = role==allowedRoles
    
    console.log(role)
    return (
        allowroute
            ? <Outlet />
            : auth?.token
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default ProtectedRoute;