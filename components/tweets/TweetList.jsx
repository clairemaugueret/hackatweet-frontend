import React from "react";
import TweetDisplay from "./TweetDisplay";
import styles from "../../styles/MiddleSection.module.css";

const TweetList = ({ tweets, currentUser, onDelete, onLike }) => {
  if (!tweets.length) {
    return <p className={styles.emptyMessage}>No tweets to display.</p>;
  }

  return (
    <div className={styles.allTweetsContainer}>
      {tweets.map((data, i) => {
        const userLiked = data.isLiked.some(
          (like) => like.token === currentUser.token
        );

        return (
          <TweetDisplay
            key={i}
            content={data.content}
            isLiked={data.isLiked}
            hashtag={data.hashtag}
            firstname={data.author.firstname}
            username={data.author.username}
            image={data.author.image}
            token={data.author.token}
            date={data.date}
            id={data._id}
            deleteTweet={() => onDelete(data._id)}
            likeTweet={() => onLike(data._id)}
            userLiked={userLiked}
          />
        );
      })}
    </div>
  );
};

export default TweetList;
