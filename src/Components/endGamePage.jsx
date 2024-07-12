import React from "react";
import { Link } from "react-router-dom";

const EndGamePage = (props) => {
  const getWinningMessage = () => {
    if (props.merlinKilled) {
      const merlinPlayer = props.players.filter(player => player.role === "Merlin")[0];
      const jesterPlayer = props.players.filter(player => player.role === "Jester")[0];

      if (props.assassinationTarget === merlinPlayer.name) {
        return <h3 className="bad">Bad Guys Win!</h3>;
      } else if (props.assassinationTarget === jesterPlayer.name) {
        return <h3 className="jester">Jester Wins!</h3>;
      }
    } else {
      return <h3 className="good">Good Guys Win!</h3>;
    }
  };

  const renderPlayerRoles = () => {
    return props.players.map((player) => (
      <li key={player.id}>
        {player.name}:{" "}
        <span
          className={
            player.role === "Good guy" ||
            player.role === "Merlin" ||
            player.role === "Percy" ||
            player.role === "Lover"
              ? "good"
              : player.role === "Bad guy" ||
                player.role === "Assassin" ||
                player.role === "Morgana" ||
                player.role === "Mordred"
              ? "bad"
              : player.role === "Jester"
              ? "jester"
              : "neutral"
          }
        >
          {player.role}
        </span>
      </li>
    ));
  };

  return (
    <div className="text-center text-light tile">
      {getWinningMessage()}
      <h4>Player Roles</h4>
      <ul>{renderPlayerRoles()}</ul>
      <Link to="/">
        <button className="btn btn-outline-light m-2">Play Again</button>
      </Link>
    </div>
  );
};

export default EndGamePage;
