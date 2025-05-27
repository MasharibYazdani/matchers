import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="flex flex-col md:flex-row md:justify-around gap-4 my-10 mb-30">
        <div className="w-full md:flex-1">
          <EditProfile user={user} />
        </div>
      </div>
    )
  );
};

export default Profile;
