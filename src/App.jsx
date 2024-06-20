import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./reset.css";
import "./App.css";

import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import DashboardScreen from "./components/DashboardScreen";

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

  if (isLoggedIn) {
    return (
      <>
        <DashboardScreen logOut={logOut} />
      </>
    );
  }

  return (
    <div className="screenGate">
      <h1>WhatsUp</h1>
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
    </div>
  );
}

export default App;
