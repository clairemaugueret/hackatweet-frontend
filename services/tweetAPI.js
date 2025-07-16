import BACKEND_URL from "./config";

//RECUPERATIO DES TWEETS
export const fetchTweets = async () => {
  const res = await fetch(`${BACKEND_URL}/tweets`);
  return res.json();
};

//NEW TWEET
export const postTweet = async (content, token) => {
  const res = await fetch(`${BACKEND_URL}/tweets/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, content }),
  });
  return res.json();
};

//DELETE TWEET
export const deleteTweet = async (id, token) => {
  const res = await fetch(`${BACKEND_URL}/tweets/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  return res.json();
};

//LIKE TWEET
export const likeTweet = async (id, token) => {
  const res = await fetch(`${BACKEND_URL}/tweets/liked/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  return res.json();
};

//RECUPERATION DES TRENDS
export const fetchTrends = async () => {
  const res = await fetch(`${BACKEND_URL}/tweets/trends`);
  return res.json();
};

//RECUPERER LES TWEETS LIE A UN HASHTAG
export const fetchTweetsByHashtag = async (hashtag) => {
  const res = await fetch(`${BACKEND_URL}/tweets/trends/${hashtag}`);
  return res.json();
};
