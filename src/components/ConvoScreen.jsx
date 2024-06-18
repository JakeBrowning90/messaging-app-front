function ConvoScreen({ currentConvo, navToContacts, setCurrentConvo}) {

  const clearConvo = () => {
    setCurrentConvo('')
    navToContacts()
  }

  return (
    <div className="screenConvo page">
      <p>Convo View</p>
      <button onClick={clearConvo}>Back to contacts</button>
      <p>{currentConvo}</p>
      <p>TBA: Message history</p>
      <p>TBA: New Message form</p>
    </div>
  );
}

export default ConvoScreen;
