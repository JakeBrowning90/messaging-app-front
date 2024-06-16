import React, { useState, useEffect } from "react";

function SignupScreen({
  email,
  handleEmail,
  password,
  handlePassword,
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
      }),
    });
    const signupResponse = await response.json();
    console.log(signupResponse);
    toggleSignup();
  }

  return (
    <div className="screenSignup page">
      Signup View
      <form onSubmit={submitSignup}>
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
        <button type="submit">Create User</button>
      </form>
      <button onClick={toggleSignup}>Back to Login</button>
    </div>
  );
}

export default SignupScreen;
