import { useState, useEffect } from "react";
import { apiurl } from "../apiSource";

import ContactsScreen from "./ContactsScreen";
import ProfileScreen from "./ProfileScreen";
import ConvoScreen from "./ConvoScreen";
import SearchScreen from "./SearchScreen";

function DashboardScreen({ logOut }) {
  const [contactsActive, setContactsActive] = useState(true);
  const [profileActive, setProfileActive] = useState(false);
  const [convoActive, setConvoActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userContacts, setUserContacts] = useState([]);
  const [currentConvo, setCurrentConvo] = useState("");

  const navToContacts = () => {
    setProfileActive(false);
    setConvoActive(false);
    setSearchActive(false);
    setContactsActive(true);
  };
  const navToProfile = () => {
    setConvoActive(false);
    setSearchActive(false);
    setContactsActive(false);
    setProfileActive(true);
  };
  const navToConvo = () => {
    setProfileActive(false);
    setSearchActive(false);
    setContactsActive(false);
    setConvoActive(true);
  };
  const navToSearch = () => {
    setProfileActive(false);
    setConvoActive(false);
    setContactsActive(false);
    setSearchActive(true);
  };

  function setUserData(response) {
    setDisplayName(response.displayName);
    setStatus(response.status);
    let sortedContacts = response.contacts.sort((a, b) => {
      const nameA = a.displayName.toUpperCase();
      const nameB = b.displayName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setUserContacts(sortedContacts);
  }

  useEffect(() => {
    fetch(apiurl + `users/${localStorage.getItem("id")}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("user fetch error");
        }
        return response.json();
      })
      .then((response) => setUserData(response))
      .catch((error) => setError(error));
  }, [contactsActive]);

  return (
    <div className="screenDash">
      <div className="dashHeader">
        <div className="dashUser">
          <h2>{displayName}</h2>
          <p>{status}</p>
        </div>
        <h2 className="profileLink" onClick={navToProfile}>
          Profile
        </h2>
      </div>

      {contactsActive && (
        <ContactsScreen
          userContacts={userContacts}
          navToConvo={navToConvo}
          navToSearch={navToSearch}
          setCurrentConvo={setCurrentConvo}
        />
      )}
      {convoActive && (
        <ConvoScreen
          currentConvo={currentConvo}
          navToContacts={navToContacts}
          setCurrentConvo={setCurrentConvo}
          logOut={logOut}
        />
      )}
      {profileActive && (
        <ProfileScreen
          displayName={displayName}
          setDisplayName={setDisplayName}
          status={status}
          setStatus={setStatus}
          navToContacts={navToContacts}
          logOut={logOut}
        />
      )}
      {searchActive && (
        <SearchScreen
          userContacts={userContacts}
          navToContacts={navToContacts}
          logOut={logOut}
        />
      )}
    </div>
  );
}

export default DashboardScreen;
