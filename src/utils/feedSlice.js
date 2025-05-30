import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,

  reducers: {
    addFeed: (state, action) => action.payload,

    removeOneFeed: (state, action) => {
      return state.filter((feed) => feed._id !== action.payload);
    },
    removeFeed: () => null,
  },
});

export const { addFeed, removeFeed, removeOneFeed } = feedSlice.actions;
export default feedSlice.reducer;
