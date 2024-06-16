import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import ConvoScreen from "./components/ConvoScreen";

function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupErrors, setSignupErrors] = useState([]);

  // Conditional render between loggedin/out
  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  function toggleInvalidLogin(bool) {
    setInvalidLogin(bool);
  }

  const toggleSignup = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setInvalidLogin(false);
    setSignupErrors([]);
    setIsSigningUp(!isSigningUp);
  };

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  if (isLoggedIn) {
    return (
      <>
        <HomeScreen />
        <ConvoScreen />
        <ProfileScreen />
        <button onClick={toggleLoggedIn}>Log out</button>
      </>
    );
  }

  return (
    <>
      {isSigningUp ? (
        <SignupScreen
          email={email}
          handleEmail={handleEmail}
          password={password}
          handlePassword={handlePassword}
          confirmPassword={confirmPassword}
          handleConfirmPassword={handleConfirmPassword}
          signupErrors={signupErrors}
          setSignupErrors={setSignupErrors}
          toggleSignup={toggleSignup}
        />
      ) : (
        <LoginScreen
          email={email}
          handleEmail={handleEmail}
          password={password}
          handlePassword={handlePassword}
          invalidLogin={invalidLogin}
          toggleInvalidLogin={toggleInvalidLogin}
          toggleSignup={toggleSignup}
          toggleLoggedIn={toggleLoggedIn}
        />
      )}
      {/* <button onClick={toggleLoggedInTest}>TEST Log in</button> */}
    </>
  );
}

export default App;
