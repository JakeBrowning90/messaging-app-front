function ContactsScreen({
  userContacts,
  navToConvo,
  navToSearch,
  setCurrentConvo,
}) {
  function loadConvo(contact) {
    setCurrentConvo(contact);
    navToConvo();
  }

  return (
    <div className="screenContacts page">
      <p>Your Contacts</p>
      <div className="contactsBody">
      {userContacts.length == 0 ? (
        <p>You have no contacts</p>
      ) : (
        <ul className="contactList">
          {userContacts.map((contact) => {
            return (
              <li className="contactListItem">
                <div onClick={() => loadConvo(contact)}>{contact.email}</div>
              </li>
            );
          })}
        </ul>
      )}
      </div>
    
      <button onClick={navToSearch}>Add new contact</button>
    </div>
  );
}

export default ContactsScreen;
