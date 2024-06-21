import { useState, useEffect } from "react";

function SearchScreen({ userContacts, navToContacts }) {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  function handleQuery(e) {
    setQuery(e.target.value);
  }

  function searchUsers(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/users/?name=${query}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("fetch error");
        }
        console.log(response.json);
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
    fetch(
      `http://localhost:3000/users/add-contact/${localStorage.getItem("id")}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contacts: contactsList,
        }),
      }
    ).then((response) => {
      console.log(response);
      navToContacts();
    });
  }

  return (
    <div className="screenSearch page">
      <div className="searchHeader">
        <button onClick={navToContacts}>Back</button>
        <form onSubmit={searchUsers}>
          <label htmlFor="query">
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

      {queryResults.length == 0 ? (
        <p>No results, try a new search.</p>
      ) : (
        <ul>
          {queryResults.map((result) => {
            return (
              result.id != localStorage.getItem("id") &&
              !isExistingContact(result.id) && (
                <li>
                  <p>{result.email}</p>
                  <button onClick={() => addContact(result.id)}>Add</button>
                </li>
              )
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchScreen;
