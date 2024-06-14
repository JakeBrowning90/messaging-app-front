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

  const toggleLoggedInTest = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  if (isLoggedIn) {
    return (
      <>
        <HomeScreen />
        <ConvoScreen />
        <ProfileScreen />
        <button onClick={toggleLoggedInTest}>Log out</button>
      </>
    );
  }

  return (
    <>
      <LoginScreen />
      <SignupScreen />
      <button onClick={toggleLoggedInTest}>Log in</button>
    </>
  );
}

export default App;
