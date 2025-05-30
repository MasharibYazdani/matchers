import React from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeOneFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, about, photoURL, gender, age, skills } =
    user;

  const handleRequest = async (status, id) => {
    await axios.post(
      BASE_URL + "/request/send/" + status + "/" + id,
      {},
      { withCredentials: true }
    );
    dispatch(removeOneFeed(id));
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoURL} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}{" "}
        </h2>
        {gender && age && (
          <h4>
            {gender} {", "} {age}
          </h4>
        )}

        <h6>{skills}</h6>
        <p>{about}</p>
        <div className="card-actions justify-center my-3">
          <button
            className="btn btn-primary"
            onClick={() => handleRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleRequest("interested", _id)}
          >
            Interesed
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
