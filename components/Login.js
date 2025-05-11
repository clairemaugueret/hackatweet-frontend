import Image from "next/image";
import styles from "../styles/Login.module.css";
import { useState } from "react";
import SignUpModal from "./SignUp";
import SignInModal from "./SignIn";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const user = useSelector((state) => state.users.value);
  useEffect(() => {
    if (user.isConnected) {
      router.push("/home");
    }
  }, []);

  //SIGNUP MODAL
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const showSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const handleSignUpOk = () => {
    setIsSignUpModalOpen(false);
  };

  const handleSignUpCancel = () => {
    setIsSignUpModalOpen(false);
  };

  //SIGNIN MODAL
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const showSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const handleSignInOk = () => {
    setIsSignInModalOpen(false);
  };

  const handleSignInCancel = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}></div>
      <div className={styles.rightSection}>
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <h1>
          See what's <br /> happening
        </h1>
        <h2>Join Hackatweet today.</h2>
        <button
          className={styles.signupBtn}
          id="signup"
          onClick={showSignUpModal}
        >
          Sign up
        </button>
        <SignUpModal
          isSignUpModalOpen={isSignUpModalOpen}
          handleSignUpOk={handleSignUpOk}
          handleSignUpCancel={handleSignUpCancel}
        />
        <p>Already have an account?</p>
        <button
          className={styles.signinBtn}
          id="signin"
          onClick={showSignInModal}
        >
          Sign in
        </button>
        <SignInModal
          isSignInModalOpen={isSignInModalOpen}
          handleSignInOk={handleSignInOk}
          handleSignInCancel={handleSignInCancel}
        />
      </div>
    </div>
  );
}

export default Login;
