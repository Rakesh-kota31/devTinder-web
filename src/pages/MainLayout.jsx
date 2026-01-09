import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../layouts/NavBar";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../state/userSlice";
import { useEffect } from "react";

const MainLayout = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (user.isAuthenticated === false || user.userDetails === null) {
          const data = await axiosInstance.get("/profile/view", {
            withCredentials: true,
          });
          dispatch(addUser(data?.data?.userDetails));
        }
      } catch (err) {
        if (err.response?.status === 401 || err.message) {
          navigate("/login", { replace: true });
        }
      }
    };
    checkAuth();
  });

  if(user.isAuthenticated === false || user.userDetails === null){
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
