import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/users";
import { useRouter } from "next/router";
import LastTweets from "./LastTweets";
import Hashtag from "./Hashtag";
import Trends from "./Trends";
import Link from "next/link";
import PictureProfileModal from "./modals/ProfilePicture";
import FirstnameModal from "./modals/Firstname";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);

  const hashtag = router.query.hashtag;
  const isHashtagPage = router.pathname.includes("/trends");

  //REFRESH TWEETS QUAND CHANGEMENT PICTURE PROFILE ET FIRSTNAME
  const [refreshTweets, setRefreshTweets] = useState(false);
  useEffect(() => {
    setRefreshTweets((prev) => !prev);
  }, [user.firstname, user.image]);

  //LOGOUT
  const submitLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  //PICTURE PROFILE MODAL
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);

  const showPictureProfileModal = () => {
    setIsPictureModalOpen(true);
  };

  //PICTURE FIRSTNAME MODAL
  const [isFirstnameModalOpen, setIsFirstnameModalOpen] = useState(false);

  const showFirstnameModal = () => {
    setIsFirstnameModalOpen(true);
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
            <div className={styles.pictureWrapper}>
              <img
                src={user.image || "/user.jpg"}
                alt={user.username}
                width={45}
                height={45}
                className={styles.userPicture}
                style={{ cursor: "pointer" }}
                onClick={showPictureProfileModal}
              />
              <PictureProfileModal
                isPictureModalOpen={isPictureModalOpen}
                setIsPictureModalOpen={setIsPictureModalOpen}
              />
              <span className={styles.editIcon}>
                <FontAwesomeIcon
                  icon={faPen}
                  onClick={showPictureProfileModal}
                />
              </span>
            </div>
            <div>
              <div className={styles.firstnameWrapper}>
                <h4 onClick={showFirstnameModal}>{user.firstname}</h4>

                <FirstnameModal
                  isFirstnameModalOpen={isFirstnameModalOpen}
                  setIsFirstnameModalOpen={setIsFirstnameModalOpen}
                />
                <span className={styles.editIconFirstname}>
                  <FontAwesomeIcon icon={faPen} onClick={showFirstnameModal} />
                </span>
              </div>
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
        {isHashtagPage && hashtag ? (
          <Hashtag hashtag={hashtag} refreshTrigger={refreshTweets} />
        ) : (
          <LastTweets refreshTrigger={refreshTweets} />
        )}
      </div>
      <div className={styles.rightSection}>
        <Trends />
      </div>
    </div>
  );
}

export default Home;
