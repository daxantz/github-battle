import { useState } from "react";
import Profile from "./Profile";
import "./styles.css";

import getPodium from "./utils/getPodium";
import Podium from "./Podium";
import useProfileSearch from "./hooks/useProfileSearch";

export default function App() {
  //searched users are added to this array
  const [users, setUsers] = useState([]);
  const {
    isloading,
    error,
    currentUser,
    query,
    setQuery,
    setCurrentUser,
    setError,
  } = useProfileSearch(users);
  const { podium, rest } = getPodium(users);
  const winner = users.reduce((highest, user) => {
    return user.score > highest.score ? user : highest;
  }, users[0]);

  function addUser(e) {
    e.preventDefault();
    if (Object.keys(currentUser).length === 0) return;
    if (currentUser.message === "Not Found") {
      //check if searched user doesnt exist
      setError(currentUser.message);
      return;
    }
    //check if the searched user is already in the added user array (users)
    if (users.some((user) => user.id === currentUser.id)) {
      console.log("user already in list");

      return;
    }
    setUsers((users) => [
      ...users,
      {
        ...currentUser,
        score:
          currentUser.public_repos +
          currentUser.public_gists +
          currentUser.followers,
      },
    ]);
    setQuery("");
    setCurrentUser({});
    setError(null);
  }

  return (
    <div className="App">
      <form disabled={isloading} onSubmit={(e) => addUser(e)}>
        {isloading && "loading..."}
        {Object.keys(currentUser).length != 0 && (
          <span>User Found, Press enter to add them to the list</span>
        )}
        {error && <span>{error}</span>}
        <input
          disabled={isloading || error}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </form>

      {users.length < 3 ? (
        users.map((user) => (
          <Profile
            key={user.id}
            user={user}
            winner={winner}
            users={users}
            setUsers={setUsers}
          />
        ))
      ) : (
        <Podium
          podium={podium}
          rest={rest}
          winner={winner}
          setUsers={setUsers}
          users={users}
        />
      )}
    </div>
  );
}
