import React from "react";

const PlayerList = (props) => {
  return (
    <ul className="players-list">
      {props.players.map((player) => (
        <li key={player.id}>{player.name}</li>
      ))}
    </ul>
  );
};

export default PlayerList;
