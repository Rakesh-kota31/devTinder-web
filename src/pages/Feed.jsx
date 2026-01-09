import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCards } from "../state/cardSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const cards = useSelector((store) => store.cards);
  const dispatch = useDispatch();

  const fetchFeedData = async () => {
    try {
      if (cards.length === 0) {
        const data = await axiosInstance.get("/user/feed", {
          withCredentials: true,
        });
        //console.log(data);
        dispatch(addCards(data?.data?.users));
      }
    } catch (err) {
      // Interceptor will handle 401 redirect automatically
      // Just log errors for debugging
      console.error("Feed fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  return (
    <div className="feed-main">
      {cards.length !== 0 ? (
        cards.map((card, index) => <UserCard key={card._id} data={card} zIndex={11 - index} />)
      ) : (
        <div className="text-center">No new users</div>
      )}
    </div>
  );
};
export default Feed;
