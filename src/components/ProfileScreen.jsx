function ProfileScreen({ navToContacts }) {
  return (
    <div className="screenProfile page">
      <button onClick={navToContacts}>Back to contacts</button>
      <p>Edit profile</p>
      <form action="">
        <label htmlFor="">Display name:</label>
        <label htmlFor="">Status:</label>
        <label htmlFor="">Password:</label>
        <label htmlFor="">Confirm password:</label>
        <button>Save changes</button>
      </form>
    </div>
  );
}

export default ProfileScreen;
