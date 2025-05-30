import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsList = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connectionsList) return;

  if (connectionsList.length === 0) {
    return (
      <div className="text-2xl font-black text-center m-4">
        No Connections Found
      </div>
    );
  }

  return (
    <ul className="list bg-base-300 rounded-box shadow-md my-5 mx-auto max-w-11/12 md:w-2/3 px-4">
      <li className="bg-red-900 my-4 rounded-box p-2 text-2xl font-black tracking-wide text-center">
        Connections
      </li>
      {connectionsList.map((connection) => {
        const { _id, firstName, lastName, gender, age, about, photoURL } =
          connection;
        return (
          <li key={_id} className="list-row">
            <div>
              <img className="size-10 rounded-box" src={photoURL} />
            </div>
            <div>
              <div>{firstName + " " + lastName} </div>
              {gender && age && (
                <div className="text-xs uppercase font-semibold opacity-60">
                  {gender + ", " + age}
                </div>
              )}
            </div>
            <p className="list-col-wrap text-xs">{about}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Connections;
