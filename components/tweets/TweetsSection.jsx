import styles from "../../styles/MiddleSection.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTweets, setTrends } from "../../reducers/tweets";
import TweetForm from "./TweetForm";
import TweetList from "./TweetList";
import {
  fetchTweets,
  fetchTrends,
  deleteTweet as deleteTweetAPI,
  likeTweet as likeTweetAPI,
} from "../../services/tweetAPI";

function TweetsSection({ refreshTrigger }) {
  const dispatch = useDispatch();
  const tweetsData = useSelector((state) => state.tweets.tweetsList);
  const user = useSelector((state) => state.users.value);

  // REFRESH DATA
  const refreshData = () => {
    fetchTweets().then((data) => {
      dispatch(setTweets(data.tweetsList));
    });
    fetchTrends().then((data) => {
      dispatch(setTrends(data.hashtagList));
    });
  };

  //DELETE TWEET
  const handleDeleteTweet = (id) => {
    deleteTweetAPI(id, user.token).then(refreshData);
  };

  //LIKE TWEET
  const handleLikeTweet = (id) => {
    likeTweetAPI(id, user.token).then(refreshData);
  };

  //AFFICHAGE INITIAL DES TWEETS
  useEffect(() => {
    refreshData();
  }, [refreshTrigger]);

  return (
    <div className={styles.container}>
      <h3>Home</h3>
      <TweetForm onTweetPosted={refreshData} />
      <TweetList
        tweets={tweetsData}
        currentUser={user}
        onDelete={handleDeleteTweet}
        onLike={handleLikeTweet}
      />
    </div>
  );
}

export default TweetsSection;
