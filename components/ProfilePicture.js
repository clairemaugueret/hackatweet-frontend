import { Button, Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/PictureProfile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setPictureProfile } from "../reducers/users";
import { useRouter } from "next/router";

function PictureProfileModal({
  isPictureModalOpen,
  handlePictureOk,
  handlePictureCancel,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.users.value);

  const modalStyles = {
    content: { backgroundColor: "rgb(21, 29, 38)" },
    body: { width: "400px" },
    footer: { textAlign: "center" },
  };

  useEffect(() => {
    if (!isPictureModalOpen) {
      setImage(null);
    }
  }, [isPictureModalOpen]);

  const submitPicture = () => {
    if (!image?.trim()) {
      alert("Fill up the field with an url or cancel the change.");
      return;
    }

    fetch("https://hackatweet-backend-git-main-clairemgts-projects.vercel.app/users/picture", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, image }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(setPictureProfile({ image }));
          setImage("");
          router.push("/home");
        } else {
          alert("Something went wrong... Try again.");
        }
      });
  };

  return (
    <Modal
      open={isPictureModalOpen}
      onOk={handlePictureOk}
      onCancel={handlePictureCancel}
      footer={[
        <Button
          key="Picture"
          onClick={submitPicture}
          className={styles.PictureBtnModal}
        >
          Change my profile picture
        </Button>,
      ]}
      className={styles.PictureModal}
      styles={modalStyles}
    >
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
      <h3>Change your profile picture</h3>
      <input
        type="text"
        id="url"
        onChange={(e) => setImage(e.target.value)}
        value={image}
        placeholder="Enter an external url"
        className={styles.inputPicture}
      />
    </Modal>
  );
}

export default PictureProfileModal;
