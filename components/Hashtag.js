import Image from "next/image";
import styles from "../styles/Hashtag.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tweet from "./Tweet";
import { setTrends, setHashtag } from "../reducers/tweets";
import { useRouter } from "next/router";

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
      router.push(`/hashtag/${cleaned}`, undefined, { shallow: true });
    }
  };

  //FETCH POUR AFFICHAGE
  const refreshData = (hashtag) => {
    const cleanedHashtag = hashtag.startsWith("#") ? hashtag.slice(1) : hashtag;

    fetch(
      `https://hackatweet-backend-git-main-clairemgts-projects.vercel.app/tweets/trends/${cleanedHashtag}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const sortedTweets = data.tweetsList.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        dispatch(setHashtag(sortedTweets));
      });

    fetch(
      "https://hackatweet-backend-git-main-clairemgts-projects.vercel.app/tweets/trends"
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTrends(data.hashtagList));
      });
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
  const deleteTweet = (id) => {
    fetch(
      `https://hackatweet-backend-git-main-clairemgts-projects.vercel.app/tweets/delete/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        refreshData(hashtagSearched);
      });
  };

  //LIKE TWEET
  const likeTweet = (id) => {
    fetch(
      `https://hackatweet-backend-git-main-clairemgts-projects.vercel.app/tweets/liked/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        refreshData(hashtagSearched);
      });
  };

  //MAP POUR AFFICHAGE
  const tweets = hashtagData?.map((data, i) => {
    const userLiked = data.isLiked.some((like) => like.token === user.token);

    return (
      <Tweet
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
        deleteTweet={deleteTweet}
        likeTweet={likeTweet}
        userLiked={userLiked}
      />
    );
  });

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
      <div className={styles.hashtagContainer}>
        {hashtagData?.length === 0 && hashtagSearched.trim() !== "" && (
          <p className={styles.noTweetMessage}>
            No tweets found with{" "}
            <strong>#{hashtagSearched.replace(/^#/, "")}</strong>
          </p>
        )}
        {tweets}
      </div>
    </div>
  );
}

export default Hashtag;
