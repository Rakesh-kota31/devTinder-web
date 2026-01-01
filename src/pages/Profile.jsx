import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
    navigate("/feed");
  }
  }, []);

  const { firstName, middleName, lastName, age, gender, about, profileURL } =
    user;

  const handleEdit = () => {
    navigate("/profile/edit");
  };

  return (
    <div className="profile">
      <div className="profile-card1">
        <div className="profile_card">
          <div className="profile_image">
            <img src={profileURL} alt="profile photo" />
          </div>

          <div className="profile_body">
            <h1 className="profile_body_name">
              {firstName} {middleName && middleName.charAt(0)} {lastName}
            </h1>

            <div className="profile-body-details">
              <p>
                <span>Age:</span> {age}
              </p>
              <p>
                <span>Gender:</span>{" "}
                <span className="capitalize">{gender}</span>
              </p>
              <p>
                <span>About:</span> {about || "No bio"}
              </p>
            </div>

          </div>
        </div>
        <div className="profile_card2">
          <div className="profile-body-block">
            <button
              className="profile-body-btn"
              onClick={() => {
                handleEdit();
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
