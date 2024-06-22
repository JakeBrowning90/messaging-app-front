import { useState, useEffect } from "react";

function ConvoScreen({ currentConvo, navToContacts, setCurrentConvo }) {
  const [newMessage, setNewMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  function handleNewMessage(e) {
    setNewMessage(e.target.value);
  }

  useEffect(() => {
    fetch(
      `http://localhost:3000/messages/${localStorage.getItem("id")}/${
        currentConvo.id
      }`,
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("user fetch error");
        }
        return response.json();
      })
      .then((response) => setMessageHistory(response))
      .catch((error) => setError(error));
    // console.log(localStorage.getItem("id"))
  }, [setCurrentConvo]);

  const clearConvo = () => {
    setCurrentConvo("");
    navToContacts();
  };

  async function sendMessage(e) {
    e.preventDefault();
    let author = localStorage.getItem("id");
    let recipient = currentConvo.id;
    const response = await fetch(`http://localhost:3000/messages/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: author,
        recipient: recipient,
        body: newMessage,
      }),
    });
    if (response.status != 200) {
      console.log("Error posting message");
    } else {
      const messageResponse = await response.json();
      // console.log(loginResponse);
      setMessageHistory([...messageHistory, messageResponse]);
      setNewMessage("");
    }
  }

  return (
    <div className="screenConvo page">
      <div className="pageSubheader">
        <button onClick={clearConvo}>Back</button>
        <div className="convoContactHeader">
          <p className="userNameTitle">{currentConvo.displayName}</p>
          <p>{currentConvo.status}</p>
        </div>
      </div>
      <div className="messagesBody">
        {messageHistory.length == 0 ? (
          <p>No messages found</p>
        ) : (
          <ul className="messageList">
            {messageHistory.map((message) => {
              return (
                <>
                  {message.author == currentConvo.id ? (
                    <li className="messageListItem contactMessage" >
                      <p className="messageBody">{message.body}</p>
                      <p className="messageTimestamp">{new Date(message.createdAt).toLocaleString()}</p>
                    </li>
                  ) : (
                    <li className="messageListItem userMessage">
                      <p className="messageBody">{message.body}</p>
                      <p className="messageTimestamp">{new Date(message.createdAt).toLocaleString()}</p>
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        )}
      </div>

      <form onSubmit={sendMessage} className="searchForm">
        <label className="contactSearchLabel" htmlFor="newMessage">
          New message:
          <input
            type="text"
            name="newMessage"
            id="newMessage"
            placeholder="Max. 500 characters"
            minlength="1"
            maxlength="500"
            value={newMessage}
            onChange={handleNewMessage}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ConvoScreen;
