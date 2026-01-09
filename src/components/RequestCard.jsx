import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { removeRequest } from "../state/requestSlice";

const RequestCard = (props) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, age, gender, profileURL } =
    props.data.fromUserID;

  const handleReviewRequest = async (status) => {
    try {
      const data = await axiosInstance.post(
        "/request/review" + "/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className="list-row gap-4">
      <div className="request-card-image-container">
        <img className=" request-card-image" src={profileURL} />
      </div>
      <div className="flex-1">
        <div className="text-lg font-semibold opacity-60">
          {firstName + " " + lastName}
        </div>
        <div className="capitalize">{gender}</div>
        <div className="">{age}</div>
      </div>
      <div className="flex gap-2 items-center">
        <button
          className="req-acc-button btn btn-sm btn-ghost"
          onClick={() => handleReviewRequest("accepted")}
        >
          Accept
        </button>
        <button
          className="req-rej-button btn btn-sm btn-ghost"
          onClick={() => handleReviewRequest("rejected")}
        >
          Reject
        </button>
      </div>
    </li>
  );
};

export default RequestCard;
