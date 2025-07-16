import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/users";
import { useRouter } from "next/router";
import PictureProfileModal from "../modals/ProfilePicture";
import FirstnameModal from "../modals/Firstname";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

const UserProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);

  //LOGOUT
  const handleLogout = () => {
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
    <>
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
            <FontAwesomeIcon icon={faPen} onClick={showPictureProfileModal} />
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
              <FontAwesomeIcon
                icon={faPen}
                onClick={showFirstnameModal}
              />
            </span>
          </div>
          <p className={styles.username}>@{user.username}</p>
        </div>
      </div>
      <button
        className={styles.logoutBtn}
        id="logout"
        onClick={handleLogout}
      >
        Logout
      </button>
      </div>
    </>
  );
};

export default UserProfile;
