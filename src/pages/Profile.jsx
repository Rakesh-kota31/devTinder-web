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
  }, [user, navigate]);

  const handleEdit = () => {
    navigate("/profile-edit");
  }

  if (!user) return null;

  const { firstName, middleName, lastName, age, gender, about, profileURL } =
    user.userDetails;

  return (
    <div className="profile">
      <div className="profile_card">
        <div className="profile_image">
          <img src={profileURL} alt="profile photo" />
        </div>

        <div className="profile-body-block">
          <div className="profile-body-edit">
            <button className="profile-edit-btn" onClick={handleEdit}>
              <img src="./pencil.png" alt="edit icon" />
            </button>
          </div>
          <div className="profile_body">
            <h1 className="profile_body_name">
              {firstName} {middleName && middleName.charAt(0)} {lastName}
            </h1>
            {about && <p className="profile-body_p">{about}</p>}
            {age && (
              <p className="profile-body_p">
                <span className="font-semibold">Age:</span> {age}
              </p>
            )}
            {gender && (
              <p className="profile-body_p">
                <span className="font-semibold">Gender:</span>{" "}
                <span className="capitalize">{gender}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
