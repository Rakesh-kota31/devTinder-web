import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../state/userSlice";
import { dropConnections } from "../state/connectionSlice";
import { dropRequests } from "../state/requestSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axiosInstance.post("/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    dispatch(dropConnections());
    dispatch(dropRequests());
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm py-5">
      <div className="flex-1 ml-20">
        <Link to="/feed" className="btn btn-ghost text-2xl font-bold">
          DevTinder
        </Link>
      </div>
      {user !== null && (
        <div className="flex gap-2">
          <div className="text-2xl font-bold mt-1">
            {user.userDetails.firstName + " " + user.userDetails.lastName}
          </div>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Profile picture" src={user.userDetails.profileURL} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  My Connections
                </Link>
              </li>
              <li>
                <button onClick={() => handleLogout()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
