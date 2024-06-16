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
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState("g@g.com");
  const [password, setPassword] = useState("");

  // Conditional render between loggedin/out
  const toggleLoggedInTest = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  const toggleSignup = () => {
    setIsSigningUp(!isSigningUp);
  };

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  if (isLoggedIn) {
    return (
      <>
        <HomeScreen />
        <ConvoScreen />
        <ProfileScreen />
        <button onClick={toggleLoggedInTest}>TEST Log out</button>
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
          toggleSignup={toggleSignup}
        />
      ) : (
        <LoginScreen
          email={email}
          handleEmail={handleEmail}
          password={password}
          handlePassword={handlePassword}
          toggleSignup={toggleSignup}
        />
      )}
      <button onClick={toggleLoggedInTest}>TEST Log in</button>
    </>
  );
}

export default App;
