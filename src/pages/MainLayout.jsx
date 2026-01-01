import { Outlet } from "react-router-dom";
import NavBar from "../layouts/NavBar";

const MainLayout = () => {
  return (
    <div className="">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
