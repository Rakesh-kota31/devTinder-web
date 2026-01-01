import { useState } from "react";
import { validateSignUpData } from "../utils/validations";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser } from "../state/userSlice";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const newErrors = validateSignUpData(
      firstName,
      lastName,
      emailID,
      password
    );

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const data = await axiosInstance.post(
        "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailID: emailID,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(data?.data?.data));
      setBackendError(null);

      navigate("/profile/edit");
    } catch (err) {
      console.log(err);
      setBackendError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
        <legend className="fieldset-legend">SignUp</legend>

        <label className="label">
          <span className="label-text">
            First Name <span className="text-red-500">*</span>
          </span>
        </label>
        <input
          value={firstName}
          type="text"
          className="input"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && (
          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
        )}

        <label className="label">
          <span className="label-text">
            Last Name <span className="text-red-500">*</span>
          </span>
        </label>
        <input
          value={lastName}
          type="text"
          className="input"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
        )}

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
        <div className="relative w-full">
          <input
            value={password}
            type={showPassword ? "text" : "password"}
            className="input input-bordered w-full pr-20" // ✅ enough right padding
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ✅ Toggle Button */}
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-sm text-gray-500 bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {backendError && (
          <p className="text-red-500 text-xs mt-1">{backendError}</p>
        )}

        <button
          className="btn btn-neutral mt-4"
          onClick={() => {
            handleSignUp();
          }}
        >
          Sign up
        </button>
        <p>
          Already a user? <Link to="/login">Login Here</Link>
        </p>
      </fieldset>
    </div>
  );
};
export default SignUp;
