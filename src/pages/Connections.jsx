import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../state/connectionSlice";
import { useEffect, useState } from "react";
import ConnectionCard from "../components/ConnectionCard";

const Connections = () => {
  const [chatOpen, setChatOpen] = useState(-1);

  const [chatDetails, setChatDetails] = useState({
    firstName: "Rakesh",
    lastName: "Kota",
  });

  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      //if (connections.length === 0) {
      const data = await axiosInstance.get("/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(data?.data?.connections));
      //}
    } catch (err) {
      console.log(err);
    }
  };

  const openChat = (index) => {
    setChatOpen(index);
    console.log(connections[index]);
    setChatDetails({
      firstName: connections[index].firstName,
      lastName: connections[index].lastName,
      profileURL: connections[index].profileURL,
    });
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="connections">
      <h1 className="connections-header">My Connections</h1>
      <div className="connections-container">
        <div className="connections-list">
          {connections.length !== 0 ? (
            connections.map((req) => (
              <div className="connection-card-container" key={req._id}>
                <ConnectionCard data={req} />

                <div className="items-center">
                  <button
                    className="message-button"
                    onClick={() => openChat(connections.indexOf(req))}
                  >
                    Message
                  </button>
                </div>
              </div>
            ))
          ) : (
            <li className="p-4 text-center opacity-60">No connections</li>
          )}
        </div>
        {chatOpen !== -1 && (
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-user-info">
                <div className="chat-user-image-container">
                  <img
                    className="chat-user-image"
                    src={chatDetails.profileURL}
                  />
                </div>
                <div className="chat-user-name">
                  {chatDetails.firstName + " " + chatDetails.lastName}
                </div>
              </div>
              <div className="close-button">
                <button
                  className="chat-close-btn"
                  onClick={() => setChatOpen(-1)}
                >
                  X
                </button>
              </div>
            </div>

            <div className="chat-body"> Messages</div>
            <div className="chat-input"> Input </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
