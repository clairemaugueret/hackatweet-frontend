import { Button, Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Signup.module.css";
import { useDispatch } from "react-redux";
import { login } from "../reducers/users";
import { useRouter } from "next/router";
import BACKEND_URL from "../utils/config";

function SignUpModal({
  isSignUpModalOpen,
  handleSignUpOk,
  handleSignUpCancel,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const modalStyles = {
    content: { backgroundColor: "rgb(21, 29, 38)" },
    body: { width: "400px" },
    footer: { textAlign: "center" },
  };

  useEffect(() => {
    if (!isSignUpModalOpen) {
      setFirstname(null);
      setUsername(null);
      setPassword(null);
    }
  }, [isSignUpModalOpen]);

  const submitSignUp = () => {
    if (!firstname?.trim() || !username?.trim() || !password?.trim()) {
      alert("All fields are mandatory.");
      return;
    }

    fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({ firstname, username, token: data.token, image: data.image })
          );
          setFirstname("");
          setUsername("");
          setPassword("");
          router.push("/home");
        } else {
          alert("Something went wrong... Try again.");
        }
      });
  };

  return (
    <Modal
      open={isSignUpModalOpen}
      onOk={handleSignUpOk}
      onCancel={handleSignUpCancel}
      footer={[
        <Button
          key="signup"
          onClick={submitSignUp}
          className={styles.signupBtnModal}
        >
          Sign up
        </Button>,
      ]}
      className={styles.SignUpModal}
      styles={modalStyles}
    >
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
      <h3>Create your Hackatweet account</h3>
      <input
        type="text"
        id="firstname"
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
        placeholder="Firstname"
        className={styles.inputSignup}
      />
      <input
        type="text"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Username"
        className={styles.inputSignup}
      />
      <input
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        className={styles.inputSignup}
      />
    </Modal>
  );
}

export default SignUpModal;
