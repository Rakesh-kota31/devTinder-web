import { Outlet } from "react-router-dom";
import NavBar from "../layouts/NavBar";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../state/userSlice";
import { baseURL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
//import Footer from "../layouts/Footer";

const MainLayout = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      if (user === null) {
        const data = await axios.get(baseURL + "/profile/view", {
          withCredentials: true,
        });
        //console.log(data);
        dispatch(addUser(data?.data?.userDetails));
        navigate("/feed");
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="">
      <NavBar />
      <Outlet />
      {/*<Footer />*/}
    </div>
  );
};

export default MainLayout;
