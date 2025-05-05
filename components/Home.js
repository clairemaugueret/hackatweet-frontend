import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/users";
import { useRouter } from "next/router";
import LastTweets from "./LastTweets";
import Hashtag from "./Hashtag";
import Trends from "./Trends";
import Link from "next/link";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);

  const hashtag = router.query.hashtag;
  const isHashtagPage = router.pathname.includes("/hashtag");

  const submitLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <Link href="/home">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            style={{ cursor: "pointer" }}
          />
        </Link>
        <div>
          <div className={styles.userInfo}>
            <Image
              src="/user.jpg"
              alt={user.username}
              width={45}
              height={45}
              className={styles.userPicture}
            />
            <div>
              <h4>{user.firstname}</h4>
              <p className={styles.username}>@{user.username}</p>
            </div>
          </div>
          <button
            className={styles.logoutBtn}
            id="logout"
            onClick={submitLogout}
          >
            Logout
          </button>
        </div>{" "}
      </div>
      <div className={styles.middleSection}>
      {isHashtagPage && hashtag ? <Hashtag hashtag={hashtag} /> : <LastTweets />}
      </div>
      <div className={styles.rightSection}>
        <Trends />
      </div>
    </div>
  );
}

export default Home;
