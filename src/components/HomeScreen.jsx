function HomeScreen({ username, userContacts }) {

  return (
    <div className="screenHome page">
      <p>Home View</p>
      <p>{username}</p>
      {userContacts.length == 0 ? 
      <p>You have no contacts</p> : 
      <ul>{userContacts.map((contact) =>{
        return <li>{contact.email}</li>
      })}</ul>}
    </div>
  );
}

export default HomeScreen;
