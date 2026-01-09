import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateProfileEditData } from "../utils/validations";
import { defaultProfileURL } from "../utils/constants";
import { updateUser } from "../state/userSlice";
import axiosInstance from "../utils/axiosInstance";

const EditProfile = () => {
  const user = useSelector((store) => store.user);

  const [file, setFile] = useState(null);

  const [userData, setUserData] = useState({
    firstName: user.userDetails.firstName || "",
    middleName: user.userDetails.middleName || "",
    lastName: user.userDetails.lastName || "",
    age: user.userDetails.age || "",
    gender: user.userDetails.gender || "",
    about: user.userDetails.about || "",
    profileURL: user.userDetails.profileURL || defaultProfileURL,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setUserData({ ...userData, profileURL: URL.createObjectURL(selectedFile) });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    const validationErrors = validateProfileEditData(userData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const changedFields = {};

    Object.keys(userData).forEach((key) => {
      if (userData[key] !== user.userDetails[key] && userData[key] !== "" && key !== "profileURL") {
        changedFields[key] = userData[key];
      }
    });

    try {

      if (Object.keys(changedFields).length === 0 && !file) {
        navigate("/profile");
        return;
      }

      let data = await axiosInstance.patch(
        "/profile/edit",
        changedFields,
        {
          withCredentials: true,
        }
      );

      if (!file) {
        dispatch(updateUser(data?.data?.data));
        navigate("/profile");
        return;
      }

      const formData = new FormData();
      formData.append("profile-photo", file);

      data = await axiosInstance.post("profile/upload-photo", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(updateUser(data?.data?.data));
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  if (user === null) return null;

  return (
    <div className="profile-edit">
      <div className="profile-edit-card">
        <div className="profile-edit-image-section">
          <img
            src={userData.profileURL}
            alt="Profile"
            className="profile-edit-image"
          />
          <div className="profile-edit-image-button">
            <input
              type="file"
              id="profilePic"
              className="profileImageInput"
              onChange={handleFileChange}
            />
            <label htmlFor="profilePic" className="upload-btn">
              Upload profile photo
            </label>
          </div>
        </div>

        <div className="profile-edit-form-section">
          <div className="profile-edit-header">
            <div className="groupA">
              <div className="profile-edit-flex pa">
                <label className="profile-edit-label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  name="firstName"
                  value={userData.firstName}
                  type="text"
                  className="profile-edit-input"
                  placeholder="First Name"
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="profile-edit-flex pb">
                <label className="profile-edit-label">
                  <span className="label-text">Middle Name</span>
                </label>
                <input
                  name="middleName"
                  value={userData.middleName}
                  type="text"
                  className="profile-edit-input"
                  placeholder="Middle Name"
                  onChange={handleChange}
                />
                {errors.middleName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.middleName}
                  </p>
                )}
              </div>

              <div className="profile-edit-flex pc">
                <label className="profile-edit-label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  name="lastName"
                  value={userData.lastName}
                  type="text"
                  className="profile-edit-input"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="groupA">
              <div className="pd">
                <label className="profile-edit-label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  name="age"
                  value={userData.age}
                  type="text"
                  className="profile-edit-input"
                  placeholder="Age"
                  onChange={handleChange}
                />
                {errors.age && (
                  <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                )}
              </div>

              <div className="pe">
                <label className="profile-edit-label">
                  <span className="label-text">Gender</span>
                </label>
                <input
                  name="gender"
                  value={userData.gender}
                  type="text"
                  className="profile-edit-input"
                  placeholder="Gender"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="profile-edit-flex pf">
              <label className="profile-edit-label">
                <span className="label-text">About</span>
              </label>
              <textarea
                name="about"
                value={userData.about}
                type="text"
                className="profile-edit-textarea"
                placeholder="About"
                onChange={handleChange}
              />
              {errors.About && (
                <p className="text-red-500 text-xs mt-1">{errors.About}</p>
              )}
            </div>
          </div>

          <div className="profile-edit-button-group">
            <button
              className="profile-edit-button"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Cancel
            </button>
            <button className="profile-edit-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
