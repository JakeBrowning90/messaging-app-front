import React, { useState, useEffect } from "react";

function LoginScreen({
  email,
  handleEmail,
  password,
  handlePassword,
  invalidLogin,
  toggleInvalidLogin,
  toggleSignup,
  toggleLoggedIn,
}) {
  async function submitLogin(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/log-in", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });
    if (response.status != 200) {
      toggleInvalidLogin(true)
    } else {
      const loginResponse = await response.json();
      localStorage.setItem('email', loginResponse.email)
      localStorage.setItem('id', loginResponse.id)
      localStorage.setItem('token', "Bearer " + loginResponse.token)
      toggleInvalidLogin(false)
      toggleLoggedIn();
    }
  }

  return (
    <div className="screenLogin page">
     <p>Log in to your account</p>
      {invalidLogin && (<p>Incorrect email / password. Please try again.</p>)}

      <form onSubmit={submitLogin}>
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="text"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </label>

        <button type="submit">Log In</button>
      </form>
      <button onClick={toggleSignup}>Sign up</button>
    </div>
  );
}

export default LoginScreen;
