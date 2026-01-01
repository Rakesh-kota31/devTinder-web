import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../state/userSlice";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (user === null) {
          const data = await axiosInstance.get("/profile/view", {
            withCredentials: true,
          });
          setIsAuthenticated(true);
          dispatch(addUser(data?.data?.userDetails));
        }
      } catch (err) {
        if (err.response?.status === 401 || err.message) {
          setIsAuthenticated(false);
          navigate("/login", { replace: true });
        }
      }
    };

    checkAuth();
  }, [navigate]);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, component won't render (already redirected)
  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
