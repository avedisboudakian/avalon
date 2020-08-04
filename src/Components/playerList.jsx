import React from "react";

// display the players in an ordered list

const PlayerList = (props) => {
  return (
    <ol className="ml-5">
      {props.players.map((players) => {
        return <li key={players.id}>{players.name}</li>;
      })}
    </ol>
  );
};

export default PlayerList;
