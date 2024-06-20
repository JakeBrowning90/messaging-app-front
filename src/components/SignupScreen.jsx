import React, { useState, useEffect } from "react";

function SignupScreen({
  email,
  handleEmail,
  password,
  handlePassword,
  confirmPassword,
  handleConfirmPassword,
  signupErrors,
  setSignupErrors,
  toggleSignup,
}) {
  async function submitSignup(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        confirm_password: confirmPassword,
      }),
    });
    const signupResponse = await response.json();
    if (Array.isArray(signupResponse)) {
      setSignupErrors(signupResponse)
    } else {
      toggleSignup();
    }
  }

  return (
    <div className="screenSignup page">
      <p>Create a New User</p>
      <ul>
        {signupErrors.map((err) => {
          return <li>{err.msg}</li>
        })}
      </ul>
      <form onSubmit={submitSignup}>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="text"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </label>

        {/* <label htmlFor="displayName">
          Display name (You can change this later):
          <input
            name="displayName"
            type="text"
            id="displayName"
            value={displayName}
            onChange={handleDisplayName}
          />
        </label> */}

        <label htmlFor="password">
          Password:
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </label>

        <label htmlFor="password">
          Confirm Password:
          <input
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </label>
        <button type="submit">Create User</button>
      </form>
      <button onClick={toggleSignup}>Back to Login</button>
    </div>
  );
}

export default SignupScreen;
