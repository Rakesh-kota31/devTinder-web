import axios from "axios";
import { baseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../state/connectionSlice";
import { useEffect } from "react";
import ConnectionCard from "../components/ConnectionCard";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      if (connections.length === 0) {
        const data = await axios.get(baseURL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addConnections(data?.data?.connections));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full p-4">
      <h1 className="text-3xl font-bold mb-6">Connections</h1>
      <ul className="list bg-base-100 rounded-box shadow-md w-full max-w-2xl">
        {connections.length !== 0 ? (
          connections.map((req) => <ConnectionCard key={req._id} data={req} />)
        ) : (
          <li className="p-4 text-center opacity-60">No connections</li>
        )}
      </ul>
    </div>
  );
};

export default Connections;
