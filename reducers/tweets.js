import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tweetsList: [],
  trendsList: [],
  hashgtagTweetsList: [],
};

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setTweets: (state, action) => {
      state.tweetsList = action.payload;
    },
    setTrends: (state, action) => {
      state.trendsList = action.payload;
    },
    setHashtag: (state, action) => {
      state.hashgtagTweetsList = action.payload;
    },
  },
});

export const { setTweets, setTrends, setHashtag, searchedHashtag } = tweetsSlice.actions;
export default tweetsSlice.reducer;
