import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { postTweet } from "../../services/tweetAPI";
import styles from "../../styles/MiddleSection.module.css";

const TweetForm = ({ onTweetPosted }) => {
  const [newTweet, setNewTweet] = useState("");
  const textareaRef = useRef(null);
  const user = useSelector((state) => state.users.value);

  const handleTextareaChange = (e) => {
    setNewTweet(e.target.value);
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

   //NEW TWEET
  const handleSubmit = async () => {
    if (!newTweet.trim()) {
      alert("Empty tweet can't be posted.");
      return;
    }
    try {
      const res = await postTweet(newTweet, user.token);
      if (res.result) {
        setNewTweet("");
        onTweetPosted(); // Demande au parent de recharger la liste
      } else {
        alert("Something went wrong... Try again.");
      }
    } catch (err) {
      console.error("Error posting tweet:", err.message);
    }
  };

  return (
    <div className={styles.newTweetContainer}>
      <textarea
        type="text"
        id="newTweet"
        value={newTweet}
        onChange={handleTextareaChange}
        placeholder="What's up?"
        className={styles.inputNewTweet}
        maxLength={280}
        ref={textareaRef}
      />
      <div className={styles.actionsContainer}>
        <p className={styles.newTweetCount}>
          {newTweet.length}/280
        </p>
        <button
          className={styles.newTweetBtn}
          onClick={handleSubmit}
          disabled={!newTweet.trim()}
        >
          Tweet
        </button>
      </div>
    </div>
  );
};

export default TweetForm;
