import React, { useState } from "react";
import { apiurl } from "../apiSource";

function ProfileScreen({
  displayName,
  setDisplayName,
  status,
  setStatus,
  navToContacts,
  logOut,
}) {
  // const [displayName, setDisplayName] = useState("");
  // const [status, setStatus] = useState("");
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
      apiurl + `users/${localStorage.getItem("id")}`,
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
    if (response.status == 403) {
      alert("Your session has expired. Please log in to resume.");
      logOut();
    }
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
        <ul className="errorList">
          {updateErrors.map((err) => {
            return <li key={updateErrors.indexOf(err)}>{err.msg}</li>;
          })}
        </ul>
        <label htmlFor="">
          Display name:
          <input
            name="displayName"
            type="text"
            id="displayName"
            maxLength="30"
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
            maxLength="30"
            value={status}
            onChange={handleStatus}
          />
        </label>
        <label htmlFor="">
          New password:
          <input
            name="password"
            type="password"
            id="password"
            maxLength="20"
            value={password}
            onChange={handlePassword}
          />
        </label>
        <label htmlFor="">
          Confirm new password:
          <input
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            maxLength="20"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </label>
        <button type="submit">Save changes</button>
      </form>
      <button className="logOutBtn" onClick={logOut}>
        Log Out
      </button>
    </div>
  );
}

export default ProfileScreen;
