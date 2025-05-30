import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeOneRequest } from "../utils/requestsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const requestsList = useSelector((store) => store.requests);

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeOneRequest(_id));
    } catch (error) {
      console.error(error);
    }
  };

  if (!requestsList) return;

  if (requestsList.length === 0) {
    return (
      <div className="text-2xl font-black text-center m-4">
        No Requests Found
      </div>
    );
  }

  return (
    <ul className="list bg-base-300 rounded-box shadow-md my-5 mx-auto max-w-11/12 md:w-2/3 px-4">
      <li className="bg-red-900 my-4 rounded-box p-2 text-2xl font-black tracking-wide text-center">
        Connections Requests
      </li>
      {requestsList.map((request) => {
        const { _id, firstName, lastName, gender, age, about, photoURL } =
          request.fromUserId;
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
            <button
              className="btn btn-primary"
              onClick={() => reviewRequest("accepted", request._id)}
            >
              Accept
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => reviewRequest("rejected", request._id)}
            >
              Reject
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Connections;
