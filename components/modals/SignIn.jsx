import { Button, Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/Modal.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/users";
import { useRouter } from "next/router";
import { signIn } from "../../services/userAPI";

function SignInModal({
  isSignInModalOpen,
  handleSignInOk,
  handleSignInCancel,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const modalStyles = {
    content: { backgroundColor: "rgb(21, 29, 38)" },
    body: { width: "400px" },
    footer: { textAlign: "center" },
  };

  useEffect(() => {
    if (!isSignInModalOpen) {
      setUsername("");
      setPassword("");
    }
  }, [isSignInModalOpen]);

const submitSignIn = async () => {
  if (!username?.trim() || !password?.trim()) {
    alert("All fields are mandatory.");
    return;
  }

  const data = await signIn(username, password);
  if (data.result) {
    dispatch(login({ firstname: data.firstname, username, token: data.token, image: data.image }));
    setUsername("");
    setPassword("");
    router.push("/home");
  } else {
    alert("Something went wrong... Try again.");
  }
};

  return (
    <Modal
      open={isSignInModalOpen}
      onOk={handleSignInOk}
      onCancel={handleSignInCancel}
      footer={[
        <Button key="SignIn" onClick={submitSignIn} className={styles.modalBtn}>
          Sign in
        </Button>,
      ]}
      className={styles.modal}
      styles={modalStyles}
    >
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
      <h3>Connect to Hackatweet</h3>
      <input
        type="text"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Username"
        className={styles.modalInput}
      />
      <input
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        className={styles.modalInput}
      />
    </Modal>
  );
}

export default SignInModal;
