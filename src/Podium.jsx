import getPodium from "./utils/getPodium";
import Profile from "./Profile";

function Podium({ podium, rest, winner, setUsers, users }) {
  return (
    <div className="podium">
      <h1>PODIUM</h1>
      <div className="container">
        {podium &&
          podium.map((user) => (
            <Profile
              key={user.id}
              user={user}
              users={users}
              setUsers={setUsers}
              winner={winner}
            />
          ))}
      </div>
      <h1>Others</h1>
      <div className="container">
        {rest &&
          rest.map((user) => (
            <Profile
              key={user.id}
              user={user}
              users={users}
              setUsers={setUsers}
            />
          ))}
      </div>
    </div>
  );
}

export default Podium;
