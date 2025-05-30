import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96 shadow-2xl">
        <div className="card-body">
          <div className="w-full flex justify-center">
            <h2 className="card-title">Sign UP</h2>
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
                placeholder="First Name"
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
                placeholder="Last Name"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                value={emailId}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input"
                placeholder="Email ID"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input"
                placeholder="Password"
              />
            </fieldset>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
          <p
            className="text-center my-2 cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Existing User? Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
