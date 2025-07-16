import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import TweetsSection from "./tweets/TweetsSection";
import Hashtag from "./trends/Hashtag";
import Trends from "./trends/Trends";
import UserProfile from "./users/UserProfile";
import { useSelector } from "react-redux";

function Home() {
  const router = useRouter();
  const [refreshTweets, setRefreshTweets] = useState(false);
  const user = useSelector((state) => state.users.value);

  const hashtag = router.query.hashtag;
  const isHashtagPage = router.pathname.includes("/trends");

  //REFRESH TWEETS QUAND CHANGEMENT PICTURE PROFILE ET FIRSTNAME
  useEffect(() => {
    setRefreshTweets((prev) => !prev);
  }, [user.firstname, user.image]);

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <UserProfile />{" "}
      </div>
      <div className={styles.middleSection}>
        {isHashtagPage && hashtag ? (
          <Hashtag hashtag={hashtag} refreshTrigger={refreshTweets} />
        ) : (
          <TweetsSection refreshTrigger={refreshTweets} />
        )}
      </div>
      <div className={styles.rightSection}>
        <Trends />
      </div>
    </div>
  );
}

export default Home;
