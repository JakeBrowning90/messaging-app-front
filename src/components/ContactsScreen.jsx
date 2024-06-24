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
              <li key={contact.id} className="contactListItem" onClick={() => loadConvo(contact)}>
                <p className="userNameTitle">{contact.displayName} </p>
                <p >{contact.status}</p>
              </li>
            );
          })}
        </ul>
      )}
      </div>
    
      <button onClick={navToSearch}>Find new contact</button>
    </div>
  );
}

export default ContactsScreen;
