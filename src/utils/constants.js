export const baseURL = "http://localhost:7777";

export const defaultProfileURL = "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

{/*
  
  
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
 */}