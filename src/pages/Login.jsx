import { useState } from "react";
import { validateLoginData } from "../utils/validations";
import { baseURL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../state/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [emailID, setEmailID] = useState("kotarakesh555@gmail.com");
  const [password, setPassword] = useState("Rakeshkota31@");
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const newErrors = validateLoginData(emailID, password);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const data = await axios.post(
        baseURL + "/login",
        {
          emailID: emailID,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(data?.data?.data));
      //console.log(data);
      setBackendError(null);
      navigate("/feed");
    } catch (err) {
      console.log(err);
      setBackendError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">
          <span className="label-text">
            Email <span className="text-red-500">*</span>
          </span>
        </label>
        <input
          value={emailID}
          type="email"
          className="input"
          placeholder="Email"
          onChange={(e) => setEmailID(e.target.value)}
        />
        {errors.emailID && (
          <p className="text-red-500 text-xs mt-1">{errors.emailID}</p>
        )}

        <label className="label">
          <span className="label-text">
            Password <span className="text-red-500">*</span>
          </span>
        </label>
        <input
          value={password}
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}

        {backendError && (
          <p className="text-red-500 text-xs mt-1">{backendError}</p>
        )}

        <button
          className="btn btn-neutral mt-4"
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </button>
        <p>New to DevTinder? <Link to="/signup">Sign Up Here</Link></p>
      </fieldset>
    </div>
  );
};
export default Login;
