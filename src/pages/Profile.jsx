import { useSelector } from "react-redux";
import { useNavigate  } from "react-router-dom"

const Profile = () => {
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();

  const { firstName, middleName, lastName, age, gender, about, profileURL } =
    user;

    const handleEdit = () => {
      navigate("/profile/edit");
    }

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-4">
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
            <p><span className="opacity-70">Age:</span> {age}</p>
            <p><span className="opacity-70">Gender:</span> <span className="capitalize">{gender}</span></p>
            <p><span className="opacity-70">About:</span> {about || "No bio"}</p>
          </div>

          {/* Action Buttons */}
          <div className="card-actions justify-end gap-2 mt-3">
            <button className="btn btn-sm btn-primary" onClick={() => {handleEdit()}}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
