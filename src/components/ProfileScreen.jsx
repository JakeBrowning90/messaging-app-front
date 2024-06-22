import React, { useState, useEffect } from "react";

function ProfileScreen({ navToContacts, logOut }) {
  const [displayName, setDisplayName] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateErrors, setUpdateErrors] = useState([]);

  function handleDisplayName(e) {
    setDisplayName(e.target.value);
  }

  function handleStatus(e) {
    setStatus(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }
  async function updateUser(e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3000/users/${localStorage.getItem("id")}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: displayName,
          status: status,
          password: password,
          confirm_password: confirmPassword,
        }),
      }
    );
    const updateResponse = await response.json();
    if (Array.isArray(updateResponse)) {
      setUpdateErrors(updateResponse);
    } else {
      navToContacts();
    }
  }

  return (
    <div className="screenProfile page">
      <div className="pageSubheader">
        <button onClick={navToContacts}>Back</button>
        <p>Edit profile</p>
      </div>

      <form onSubmit={updateUser}>
        <ul>
          {updateErrors.map((err) => {
            return <li>{err.msg}</li>;
          })}
        </ul>
        <label htmlFor="">
          Display name:
          <input
            name="displayName"
            type="text"
            id="displayName"
            value={displayName}
            onChange={handleDisplayName}
          />
        </label>
        <label htmlFor="">
          Status:
          <input
            name="status"
            type="text"
            id="status"
            value={status}
            onChange={handleStatus}
          />
        </label>
        <label htmlFor="">
          Password:
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </label>
        <label htmlFor="">
          Confirm password:{" "}
          <input
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </label>
        <button type="submit">Save changes</button>
      </form>
      <button className="logOutBtn" onClick={logOut}>Log Out</button>
    </div>
  );
}

export default ProfileScreen;
