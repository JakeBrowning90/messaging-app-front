function ContactsScreen({ username, userContacts, navToConvo, navToSearch }) {
  return (
    <div className="screenHome page">
      <p>Contacts View</p>
      {userContacts.length == 0 ? (
        <p>You have no contacts</p>
      ) : (
        <ul>
          {userContacts.map((contact) => {
            return (
              <li>
                <div onClick={navToConvo}>{contact.email}</div>
              </li>
            );
          })}
        </ul>
      )}
      <button onClick={navToSearch}>Add new contact</button>
    </div>
  );
}

export default ContactsScreen;
