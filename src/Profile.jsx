import "./Profile.css";

export default function Profile({ user, winner, users, setUsers }) {
  function deleteUser() {
    setUsers((users) => users.filter((u) => u.id != user.id));
  }
  return (
    <div className="profile">
      {winner && winner.id === user.id && users.length >= 2 && "Winner"}
      <p>{user.login}</p>
      <img src={user.avatar_url} />
      <p>Public Repos: {user.public_repos}</p>
      <p>Public Gists: {user.public_gists}</p>
      <p>Followers: {user.followers}</p>
      <p>Score: {user.score}</p>
      <button onClick={deleteUser}>Delete</button>
    </div>
  );
}
