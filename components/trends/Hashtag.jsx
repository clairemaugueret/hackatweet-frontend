import styles from "../../styles/MiddleSection.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTrends, setHashtag } from "../../reducers/tweets";
import { useRouter } from "next/router";
import {
  fetchTweetsByHashtag,
  fetchTrends,
  deleteTweet as deleteTweetAPI,
  likeTweet as likeTweetAPI,
} from "../../services/tweetAPI";
import TweetList from "../tweets/TweetList";

function Hashtag({ refreshTrigger }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const hashtagData = useSelector((state) => state.tweets.hashtagTweetsList);

  const [hashtagSearched, setHashtagSearched] = useState("");

  // UPDATE hashtagSearched quand URL change (suite action clic sur Trends) ou changement picture/firstname
  useEffect(() => {
    if (router.query.hashtag) {
      const formatted = "#" + router.query.hashtag;
      setHashtagSearched(formatted);
      refreshData(formatted);
    }
  }, [router.query.hashtag, refreshTrigger]);

  //UPDATE de l'URL quand hashtagSearched change (suite action recherche)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setHashtagSearched(value);

    const cleaned = value.replace(/^#/, "");
    if (cleaned.trim() !== "") {
      router.push(`/trends/${cleaned}`, undefined, { shallow: true });
    }
  };

  //FETCH POUR AFFICHAGE
  const refreshData = async (hashtag) => {
    const cleanedHashtag = hashtag.startsWith("#") ? hashtag.slice(1) : hashtag;

    const hashtagRes = await fetchTweetsByHashtag(cleanedHashtag);
    dispatch(setHashtag(hashtagRes.tweetsList));

    const trendsRes = await fetchTrends();
    dispatch(setTrends(trendsRes.hashtagList));
  };

  // AFFICHAGE tweets quand hashtagSearched change
  useEffect(() => {
    if (hashtagSearched.trim() === "") return;

    const timeoutId = setTimeout(() => {
      refreshData(hashtagSearched);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [hashtagSearched, dispatch]);

  //DELETE TWEET
  const handleDeleteTweet = async (id) => {
    await deleteTweetAPI(id, user.token);
    refreshData(hashtagSearched);
  };

  //LIKE TWEET
  const handleLikeTweet = async (id) => {
    await likeTweetAPI(id, user.token);
    refreshData(hashtagSearched);
  };

  return (
    <div className={styles.container}>
      <h3>Hashtag</h3>
      <div className={styles.searchContainer}>
        <input
          type="search"
          id="search"
          placeholder="Search #hashtag..."
          className={styles.inputSearch}
          onChange={handleInputChange}
          value={hashtagSearched}
        />
      </div>
      <div style={{ width: "100%" }}>
        {hashtagData?.length === 0 && hashtagSearched.trim() !== "" && (
          <p className={styles.noTweetMessage}>
            No tweets found with{" "}
            <strong>#{hashtagSearched.replace(/^#/, "")}</strong>
          </p>
        )}
        <TweetList
          tweets={hashtagData}
          currentUser={user}
          onDelete={handleDeleteTweet}
          onLike={handleLikeTweet}
        />
      </div>
    </div>
  );
}

export default Hashtag;
