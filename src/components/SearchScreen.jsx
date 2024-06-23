import { useState, useEffect } from "react";
import { apiurl } from "../apiSource";

function SearchScreen({ userContacts, navToContacts, logOut }) {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  function handleQuery(e) {
    setQuery(e.target.value);
  }

  function searchUsers(e) {
    e.preventDefault();
    fetch(apiurl + `users/?name=${query}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status == 403) {
          alert("Your session has expired. Please log in to resume.");
          logOut();
        }
        if (response.status >= 400) {
          throw new Error("fetch error");
        }
        return response.json();
      })
      .then((response) => setQueryResults(response))
      .catch((error) => setError(error));
  }

  // Return true if parameter contact is already in user' contacts
  function isExistingContact(li) {
    return userContacts.some((contact) => contact.id === li);
  }

  function addContact(contact) {
    let contactsList = [];
    userContacts.map((item) => {
      contactsList.push(item.id);
    });
    contactsList.push(contact);
    fetch(apiurl + `users/add-contact/${localStorage.getItem("id")}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        contacts: contactsList,
      }),
    }).then((response) => {
      if (response.status == 403) {
        alert("Your session has expired. Please log in to resume.");
        logOut();
      }
      navToContacts();
    });
  }

  return (
    <div className="screenSearch page">
      <div className="pageSubheader">
        <button onClick={navToContacts}>Back</button>
        <form onSubmit={searchUsers} className="searchForm">
          <label className="contactSearchLabel" htmlFor="query">
            Search users:
            <input
              name="query"
              type="text"
              id="query"
              value={query}
              onChange={handleQuery}
            />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="contactsBody">
        {queryResults.length == 0 ? (
          <p>No results, try a new search.</p>
        ) : (
          <ul className="contactList">
            {queryResults.map((result) => {
              return (
                result.id != localStorage.getItem("id") &&
                !isExistingContact(result.id) && (
                  <li key={result.id} className="searchListItem">
                    <p className="userNameTitle">{result.displayName}</p>
                    <button
                      className="searchListItemBtn"
                      onClick={() => addContact(result.id)}
                    >
                      Add
                    </button>
                    <p>{result.status}</p>
                  </li>
                )
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchScreen;
