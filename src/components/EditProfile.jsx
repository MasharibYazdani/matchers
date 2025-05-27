import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [photoURL, setPhotoURL] = useState(user?.photoURL);
  const [skills, setSkills] = useState(user?.skills);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSaveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        {
          age,
          gender,
          about,
          photoURL,
          skills,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <div className="flex justify-center">
          <div className="card card-border bg-base-300 w-96 shadow-2xl">
            <div className="card-body">
              <div className="w-full flex justify-center">
                <h2 className="card-title">Edit Profile</h2>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    value={age}
                    min="1"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option defaultChecked value="">
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">PhotoURL</legend>
                  <input
                    type="text"
                    value={photoURL}
                    onChange={(e) => {
                      setPhotoURL(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Skills</legend>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => {
                      setSkills(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    className="textarea textarea-bordered w-full max-w-xs"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </fieldset>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={handleSaveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <UserCard
            user={{ firstName, lastName, about, photoURL, gender, age, skills }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated Successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
