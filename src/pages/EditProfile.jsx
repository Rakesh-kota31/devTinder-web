import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateProfileEditData } from "../utils/validations";
import { defaultProfileURL } from "../utils/constants";
import { updateUser } from "../state/userSlice";
import axiosInstance from "../utils/axiosInstance";

const EditProfile = () => {
  const user = useSelector((store) => store.user);

  const [profileFile, setProfileFile] = useState(null);

  const [userData, setUserData] = useState({
    firstName: user.firstName || "",
    middleName: user.middleName || "",
    lastName: user.lastName || "",
    age: user.age || "",
    gender: user.gender || "",
    about: user.about || "",
    profileURL: user.profileURL || defaultProfileURL,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileFile(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("profile-photo", profileFile);

      const data = await axiosInstance.post("profile/upload-photo", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(updateUser(data?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    const err = validateProfileEditData(userData);

    if (Object.keys(err).length !== 0) setErrors(err);

    const changedFields = {};

    Object.keys(userData).forEach((key) => {
      if (userData[key] !== user[key] && userData[key] !== "") {
        changedFields[key] = userData[key];
      }
    });

    try {
      const data = await axiosInstance.patch("/profile/edit", changedFields, {
        withCredentials: true,
      });
      dispatch(updateUser(data?.data?.data));
      setShowToast(true);
      const id = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      clearTimeout(id);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-4">
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile data is updated successfully</span>
          </div>
        </div>
      )}
      <div className="card bg-base-100 w-full max-w-sm shadow-lg rounded-xl overflow-hidden">
        {/* Profile Image */}
        <figure className="h-64 overflow-hidden">
          <img
            src={userData.profileURL || defaultProfileURL}
            alt="profile photo"
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Card Body */}
        <div className="card-body p-5 space-y-3">
          {/* Name */}
          <h2 className="card-title text-xl">
            {userData.firstName}{" "}
            {userData.middleName && userData.middleName.charAt(0)}{" "}
            {userData.lastName}
          </h2>

          {/* Info */}
          <div className="text-sm space-y-1">
            <p>
              <span className="opacity-70">Age:</span> {userData.age}
            </p>
            <p>
              <span className="opacity-70">Gender:</span>{" "}
              <span className="capitalize">{userData.gender}</span>
            </p>
            <p>
              <span className="opacity-70">About:</span>{" "}
              {userData.about || "No bio"}
            </p>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 w-full max-w-sm m-2">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
          <legend className="fieldset-legend">Edit Profile</legend>

          <div className="flex w-auto">
            <div>
              <label className="label">
                <span className="label-text">
                  First Name <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                name="firstName"
                value={userData.firstName}
                type="text"
                className="input"
                placeholder="First Name"
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Middle Name</span>
              </label>
              <input
                name="middleName"
                value={userData.middleName}
                type="text"
                className="input"
                placeholder="Middle Name"
                onChange={handleChange}
              />
              {errors.middleName && (
                <p className="text-red-500 text-xs mt-1">{errors.middleName}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Last Name <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                name="lastName"
                value={userData.lastName}
                type="text"
                className="input"
                placeholder="Last Name"
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            name="age"
            value={userData.age}
            type="text"
            className="input"
            placeholder="Age"
            onChange={handleChange}
          />
          {errors.age && (
            <p className="text-red-500 text-xs mt-1">{errors.age}</p>
          )}

          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <input
            name="gender"
            value={userData.gender}
            type="text"
            className="input"
            placeholder="Gender"
            onChange={handleChange}
          />

          <label className="label">
            <span className="label-text">Profile Image</span>
          </label>
          <input
            name="profileImage"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleFileChange}
          />
          <button
            className="btn btn-success mt-4"
            onClick={() => handleUpload()}
          >
            Save
          </button>

          {errors.profileURL && (
            <p className="text-red-500 text-xs mt-1">{errors.profileURL}</p>
          )}

          <label className="label">
            <span className="label-text">About</span>
          </label>
          <textarea
            name="about"
            value={userData.about}
            type="text"
            className="textarea textarea-sm"
            placeholder="About"
            onChange={handleChange}
          />
          {errors.About && (
            <p className="text-red-500 text-xs mt-1">{errors.About}</p>
          )}

          <div className="flex justify-between mx-10">
            <button
              className="btn btn-soft mt-4"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              className="btn btn-success mt-4"
              onClick={() => handleSave()}
            >
              Save
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default EditProfile;
