import { useState, useEffect } from "react";

import ContactsScreen from "./ContactsScreen";
import ProfileScreen from "./ProfileScreen";
import ConvoScreen from "./ConvoScreen";
import SearchScreen from "./SearchScreen";

function DashboardScreen({ username, userContacts, logOut }) {
  const [contactsActive, setContactsActive] = useState(true);
  const [profileActive, setProfileActive] = useState(false);
  const [convoActive, setConvoActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

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
  return (
    <div className="screenDash page">
      <p>Dashboard</p>
      <p>{username}</p>
      <button onClick={navToProfile}>Edit profile</button>
      <button onClick={logOut}>Log out</button>

      {contactsActive && (
        <ContactsScreen
          username={username}
          userContacts={userContacts}
          navToConvo={navToConvo}
          navToSearch={navToSearch}
        />
      )}
      {convoActive && <ConvoScreen navToContacts={navToContacts} />}
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
