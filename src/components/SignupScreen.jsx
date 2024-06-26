import React, { useState, useEffect } from "react";
import { apiurl } from "../apiSource";

function SignupScreen({
  displayName,
  handleDisplayName,
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
    const response = await fetch(apiurl + "users/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: displayName,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      }),
    });
    const signupResponse = await response.json();
    if (Array.isArray(signupResponse)) {
      setSignupErrors(signupResponse);
    } else {
      toggleSignup();
    }
  }

  return (
    <div className="screenSignup page">
      <div className="pageSubheader">
        <button onClick={toggleSignup}>Back</button>

        <p>Create a New User</p>
      </div>

      <form className="userForm" onSubmit={submitSignup}>
        <ul className="errorList">
          {signupErrors.map((err) => {
            return <li  key={signupErrors.indexOf(err)}>{err.msg}</li>;
          })}
        </ul>
        <label htmlFor="displayName">
          Display name (You can change this later):
          <input
            name="displayName"
            type="text"
            id="displayName"
            value={displayName}
            onChange={handleDisplayName}
          />
        </label>

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
    </div>
  );
}

export default SignupScreen;
