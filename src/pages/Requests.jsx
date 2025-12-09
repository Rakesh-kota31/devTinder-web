import axios from "axios";
import { baseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../state/requestSlice";
import { useEffect } from "react";
import RequestCard from "../components/RequestCard";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchUserRequests = async () => {
    try {
      if (requests.length === 0) {
        const data = await axios.get(baseURL + "/user/requests/received", {
          withCredentials: true,
        });
        dispatch(addRequests(data?.data?.request));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserRequests();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full p-4">
      <h1 className="text-3xl font-bold mb-6">Requests</h1>
      <ul className="list bg-base-100 rounded-box shadow-md w-full max-w-2xl">
        {requests.length !== 0 ? (
          requests.map((req) => <RequestCard key={req._id} data={req} />)
        ) : (
          <li className="p-4 text-center opacity-60">No new requests</li>
        )}
      </ul>
    </div>
  );
};

export default Requests;
