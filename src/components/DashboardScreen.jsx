import { useState, useEffect } from "react";

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
    setStatus(response.status)
    setUserContacts(response.contacts);
  }

  useEffect(() => {
    fetch(`http://localhost:3000/users/${localStorage.getItem("id")}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
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
    // console.log(localStorage.getItem("id"))
  }, [contactsActive]);

  return (
    <div className="screenDash">
      <div className="dashHeader">
        <p>WhatsUp</p>
        <div className="headerMenu">
          <div>
            <p>{displayName}</p>
          </div>
          <div onClick={navToProfile}>Edit profile</div>
          <div onClick={logOut}>Log out</div>
        </div>
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
        />
      )}
      {profileActive && <ProfileScreen navToContacts={navToContacts} />}
      {searchActive && (
        <SearchScreen
          userContacts={userContacts}
          navToContacts={navToContacts}
        />
      )}
    </div>
  );
}

export default DashboardScreen;
