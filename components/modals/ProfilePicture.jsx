import { Button, Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/Modal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setPictureProfile } from "../../reducers/users";
import { updateProfilePicture } from "../../services/userAPI";

function PictureProfileModal({ isPictureModalOpen, setIsPictureModalOpen }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.users.value);

  const modalStyles = {
    content: { backgroundColor: "rgb(21, 29, 38)" },
    body: { width: "400px" },
    footer: { textAlign: "center" },
  };

  useEffect(() => {
    if (!isPictureModalOpen) {
      setImage("");
    }
  }, [isPictureModalOpen]);

const submitPicture = async () => {
    if (!image?.trim()) {
      alert("Fill up the field with an url or cancel the change.");
      return;
    }

  const data = await updateProfilePicture(user.token, image);
  if (data.result) {
    dispatch(setPictureProfile({ image }));
    setImage("");
    setIsPictureModalOpen(false);
  } else {
    alert("Something went wrong... Try again.");
  }
};

  return (
    <Modal
      open={isPictureModalOpen}
      onCancel={() => setIsPictureModalOpen(false)}
      footer={[
        <Button
          key="Picture"
          onClick={submitPicture}
          className={styles.modalBtn}
        >
          Change my profile picture
        </Button>,
      ]}
      className={styles.modal}
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
        className={styles.modalInput}
      />
    </Modal>
  );
}

export default PictureProfileModal;
