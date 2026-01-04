export const baseURL = "http://localhost:7777";

export const defaultProfileURL = "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

{/*
  
  
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
            
          
          
          
          
          
          <div className="profile_card2">
          <button
            className="profile-body-btn"
            onClick={() => setIsEditOpen(true)}
          >
            Edit Profile
          </button>
        </div>






   
        <dialog ref={dialogRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Profile</h3>

            <p className="py-4">Profile edit form here</p>

            <div className="modal-action">
              <button className="btn" onClick={() => setIsEditOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
          
          
          
          
          
          
          */}