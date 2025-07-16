import { Button, Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/Modal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setFirstname } from "../../reducers/users";
import { updateFirstname } from "../../services/userAPI";

function FirstnameModal({ isFirstnameModalOpen, setIsFirstnameModalOpen }) {
  const dispatch = useDispatch();
  const [newFirstname, setNewFirstname] = useState("");
  const user = useSelector((state) => state.users.value);

  const modalStyles = {
    content: { backgroundColor: "rgb(21, 29, 38)" },
    body: { width: "400px" },
    footer: { textAlign: "center" },
  };

  useEffect(() => {
    if (!isFirstnameModalOpen) {
      setNewFirstname("");
    }
  }, [isFirstnameModalOpen]);

const submitFirstname = async () => {
  if (!newFirstname?.trim()) {
    alert("Fill up the field or cancel.");
    return;
  }

  const data = await updateFirstname(user.token, newFirstname);
  if (data.result) {
    dispatch(setFirstname({ firstname: newFirstname }));
    setNewFirstname("");
    setIsFirstnameModalOpen(false);
  } else {
    alert("Something went wrong... Try again.");
  }
};

  return (
    <Modal
      open={isFirstnameModalOpen}
      onCancel={() => setIsFirstnameModalOpen(false)}
      footer={[
        <Button
          key="Firstname"
          onClick={submitFirstname}
          className={styles.modalBtn}
        >
          Change your firstname
        </Button>,
      ]}
      className={styles.modal}
      styles={modalStyles}
    >
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
      <h3>Want a new firstname?</h3>
      <input
        type="text"
        id="url"
        onChange={(e) => setNewFirstname(e.target.value)}
        value={newFirstname}
        placeholder="Enter new firstname"
        className={styles.modalInput}
      />
    </Modal>
  );
}

export default FirstnameModal;
