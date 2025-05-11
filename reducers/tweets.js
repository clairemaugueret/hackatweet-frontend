import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tweetsList: [],
  trendsList: [],
  hashtagTweetsList: [],
};

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setTweets: (state, action) => {
      state.tweetsList = action.payload.sort();
    },
    setTrends: (state, action) => {
      state.trendsList = action.payload.sort();
    },
    setHashtag: (state, action) => {
      state.hashtagTweetsList = action.payload;
    },
  },
});

export const { setTweets, setTrends, setHashtag, searchedHashtag } = tweetsSlice.actions;
export default tweetsSlice.reducer;
