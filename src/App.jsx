import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import ConvoScreen from "./components/ConvoScreen";
import SearchScreen from "./components/SearchScreen";

function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupErrors, setSignupErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [userContacts, setUserContacts] = useState([]);
  const [error, setError] = useState(null);

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

  function logOut() {
    localStorage.clear();
    toggleLoggedIn();
  }

  function setUserData(response) {
    console.log(response);
    setUsername(response.email);
    setUserContacts(response.contacts);
  }

  useEffect(() => {
    fetch(`http://localhost:3000/users/${localStorage.getItem("id")}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("user fetch error");
        }
        return response.json();
      })
      .then((response) => setUserData(response))
      .catch((error) => setError(error));
    // console.log(localStorage.getItem("id"))
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return (
      <>
        <HomeScreen username={username} userContacts={userContacts} />
        <ConvoScreen />
        <ProfileScreen />
        <SearchScreen userContacts={userContacts}/>
        <button onClick={logOut}>Log out</button>
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
