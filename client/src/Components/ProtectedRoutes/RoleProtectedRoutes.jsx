import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


const RoleProtectedRoutes = ({allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (token && user && !allowedRoles.includes(user.role)) {
      toast.error("Access Denied ft");
    }
  }, [token, user, allowedRoles]);

  if (!token) return <Navigate to="/login" replace />;

  if (!user || !allowedRoles.includes(user.role)) {
    if(user.role === "admin"){
       return <Navigate to="/admin" replace />;
    }
     return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoutes