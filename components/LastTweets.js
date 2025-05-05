import Image from "next/image";
import styles from "../styles/LastTweets.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tweet from "./Tweet";
import { setTweets, setTrends } from "../reducers/tweets";

function LastTweets() {
  const dispatch = useDispatch();
  const [newTweet, setNewTweet] = useState("");
  const tweetsData = useSelector((state) => state.tweets.tweetsList);
  const user = useSelector((state) => state.users.value);

  const refreshData = () => {
    fetch("https://hackatweet-backend-git-main-clairemgts-projects.vercel.app/tweets")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTweets(data.tweetsList));
      });

    fetch("https://hackatweet-backend-git-main-clairemgts-projects.vercel.app/tweets/trends")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTrends(data.hashtagList));
      });
  };

  //NEW TWEET
  const submitNewTweet = () => {
    if (!newTweet?.trim()) {
      alert("Empty tweet can't be posted.");
      return;
    }

    fetch("https://hackatweet-backend-git-main-clairemgts-projects.vercel.app/tweets/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, content: newTweet }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setNewTweet("");
          refreshData();
        } else {
          alert("Something went wrong... Try again.");
        }
      });
  };

  //DELETE TWEET
  const deleteTweet = (id) => {
    fetch(`https://hackatweet-backend-git-main-clairemgts-projects.vercel.app/tweets/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        refreshData();
      });
  };

  //LIKE TWEET
  const likeTweet = (id) => {
    fetch(`https://hackatweet-backend-git-main-clairemgts-projects.vercel.app/tweets/liked/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        refreshData();
      });
  };

  //AFFICHAGE INITIAL DES TWEETS
  useEffect(() => {
    refreshData();
  }, []);

  const tweets = tweetsData.map((data, i) => {
    const userLiked = data.isLiked.some((like) => like.token === user.token);

    return (
      <Tweet
        key={i}
        content={data.content}
        isLiked={data.isLiked}
        hashtag={data.hashtag}
        firstname={data.author.firstname}
        username={data.author.username}
        token={data.author.token}
        date={data.date}
        id={data._id}
        deleteTweet={deleteTweet}
        likeTweet={likeTweet}
        userLiked={userLiked}
      />
    );
  });

  return (
    <div className={styles.container}>
      <h3>Home</h3>
      <div className={styles.newTweetContainer}>
        <textarea
          type="text"
          id="newTweet"
          onChange={(e) => setNewTweet(e.target.value)}
          value={newTweet}
          placeholder="What's up?"
          className={styles.inputNewTweet}
          maxLength={280}
        />
        <div className={styles.actionsContainer}>
          <p className={styles.newTweetCount}>
            {newTweet ? newTweet.length : 0}/280
          </p>
          <button
            className={styles.newTweetBtn}
            id="newTweetBtn"
            onClick={submitNewTweet}
          >
            Tweet
          </button>
        </div>
      </div>
      <div className={styles.allTweetsContainer}>{tweets}</div>
    </div>
  );
}

export default LastTweets;
