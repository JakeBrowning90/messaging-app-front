import { useState, useEffect } from "react";

function SearchScreen({ userContacts }) {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  function handleQuery(e) {
    setQuery(e.target.value);
  }

  function searchUsers(e) {
    e.preventDefault();
    // console.log(query);
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

  return (
    <div className="screenSearch page">
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
                  <button>Add</button>
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
