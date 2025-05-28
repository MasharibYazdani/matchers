import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,

  reducers: {
    addRequests: (state, action) => action.payload,
    removeOneRequest: (state, action) => {
      return state.filter((request) => request._id !== action.payload);
    },
    removeRequests: () => null,
  },
});

export const { addRequests, removeOneRequest, removeRequests } =
  requestSlice.actions;

export default requestSlice.reducer;
