import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, photoURL, gender, age, skills } = user;
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interesed</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
