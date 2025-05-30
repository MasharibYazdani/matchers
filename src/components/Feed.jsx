import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.userFeed));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0) {
    return (
      <div className="text-2xl font-black text-center m-4">No New User</div>
    );
  }

  return (
    feed && (
      <div className="flex justify-center my-10 mb-30">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
