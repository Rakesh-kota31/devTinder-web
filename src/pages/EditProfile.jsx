import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateProfileEditData } from "../utils/validations";
import axios from "axios";
import { baseURL, defaultProfileURL } from "../utils/constants";
import { updateUser } from "../state/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [middleName, setMiddleName] = useState(user.middleName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [profileURL, setProfileURL] = useState(
    user.profileURL || defaultProfileURL
  );
  // const [skills, setSkills] = useState(user.skills);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleSave = async () => {
    const currentState = {
      firstName,
      middleName,
      lastName,
      age,
      gender,
      about,
      profileURL,
    };
    const err = validateProfileEditData(currentState);

    if (Object.keys(err).length !== 0) setErrors(err);

    const changedFields = {};

    Object.keys(currentState).forEach((key) => {
      if (currentState[key] !== user[key]) {
        changedFields[key] = currentState[key];
      }
    });

    try {
      const data = await axios.patch(baseURL + "/profile/edit", changedFields, {
        withCredentials: true,
      });
      dispatch(updateUser(data?.data?.data));
      setShowToast(true);
      setInterval(() => {
        setShowToast(false);
      }, 3000);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-4">
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>New mail arrived.</span>
          </div>
          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div>
      )}
      <div className="card bg-base-100 w-full max-w-sm shadow-lg rounded-xl overflow-hidden">
        {/* Profile Image */}
        <figure className="h-64 overflow-hidden">
          <img
            src={profileURL}
            alt="profile photo"
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Card Body */}
        <div className="card-body p-5 space-y-3">
          {/* Name */}
          <h2 className="card-title text-xl">
            {firstName} {middleName && middleName.charAt(0)} {lastName}
          </h2>

          {/* Info */}
          <div className="text-sm space-y-1">
            <p>
              <span className="opacity-70">Age:</span> {age}
            </p>
            <p>
              <span className="opacity-70">Gender:</span>{" "}
              <span className="capitalize">{gender}</span>
            </p>
            <p>
              <span className="opacity-70">About:</span> {about || "No bio"}
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
                value={firstName}
                type="text"
                className="input"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
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
                value={middleName}
                type="text"
                className="input"
                placeholder="Middle Name"
                onChange={(e) => setMiddleName(e.target.value)}
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
                value={lastName}
                type="text"
                className="input"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
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
            value={age}
            type="text"
            className="input"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && (
            <p className="text-red-500 text-xs mt-1">{errors.age}</p>
          )}

          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <input
            value={gender}
            type="text"
            className="input"
            placeholder="Gender"
            onChange={(e) => setGender(e.target.value)}
          />

          <label className="label">
            <span className="label-text">Profile URL</span>
          </label>
          <input
            value={profileURL}
            type="text"
            className="input"
            placeholder="Profile URL"
            onChange={(e) => setProfileURL(e.target.value)}
          />
          {errors.profileURL && (
            <p className="text-red-500 text-xs mt-1">{errors.profileURL}</p>
          )}

          <label className="label">
            <span className="label-text">About</span>
          </label>
          <textarea
            value={about}
            type="text"
            className="textarea textarea-sm"
            placeholder="About"
            onChange={(e) => setAbout(e.target.value)}
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
