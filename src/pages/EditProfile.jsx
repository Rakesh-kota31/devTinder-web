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


  return (
      <div className="profile-edit">
        <div className="profile-edit-card">
          <div className="profile-edit-header">
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
                //onChange={handleChange}
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
                //onChange={handleChange}
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
                //onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between mx-10">
            <button
              className="btn btn-soft mt-4"
              //onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              className="btn btn-success mt-4"
              //onClick={() => handleSave()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
  );
};

export default EditProfile;
