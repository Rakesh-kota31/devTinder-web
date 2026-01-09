import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { removeCard } from "../state/cardSlice";

const UserCard = (props) => {
  const { _id, firstName, lastName, profileURL, age, gender, middleName, about } = props.data;
  const { zIndex } = props;
  const dispatch = useDispatch();

  const handleSendRequest = async (status) => {
    try {
      const data = await axiosInstance.post(
        "/request/send/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeCard(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen w-full p-4 user-card`} style={{ zIndex: zIndex }}>
      <div className="card bg-base-100 w-full max-w-sm shadow-lg rounded-xl overflow-hidden user-card-inner">
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
            {age && <p><span className="opacity-70">Age:</span> {age}</p>}
            {gender && <p><span className="opacity-70">Gender:</span> <span className="capitalize">{gender}</span></p>}
            {about && <p><span className="opacity-70">About:</span> {about}</p>}
          </div>

          {/* Action Buttons */}
          <div className="card-actions justify-center gap-2 mt-3">
            <button className="btn btn-sm btn-success" onClick={() => handleSendRequest("interested")}>Interested</button>
            <button className="btn btn-sm btn-error" onClick={() => handleSendRequest("ignored")}>Ignore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
