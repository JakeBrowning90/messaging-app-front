import React, { useState, useEffect } from "react";

function LoginScreen({ email, handleEmail, password, handlePassword }) {
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
    const loginResponse = await response.json();
    console.log(loginResponse);
  }

  return (
    <div className="screenLogin page">
      Login View
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

        <button type="submit">Submit</button>
      </form>
      <button>Sign up</button>
    </div>
  );
}

export default LoginScreen;
