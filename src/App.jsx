import { Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Requests from "./pages/Requests";
import Connections from "./pages/Connections";
import EditProfile from "./pages/EditProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
