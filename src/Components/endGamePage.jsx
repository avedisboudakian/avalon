import React from "react";
import { Link } from "react-router-dom";

const EndGamePage = (props) => {
  return (
    <div className="text-light tile">
      {props.missionSuccess === 3 && props.merlinKilled === false ? (
        <h3 className="good text-center ">The Good guys win!</h3>
      ) : (
        <h3 className="bad text-center ">The Bad guys win!</h3>
      )}

      <p className="text-center">Good guys:</p>
      <ul className="players-list">
        {props.players
          .filter(
            (player) =>
              player.role === "Good guy" ||
              player.role === "Merlin" ||
              player.role === "Percy"
          )
          .map((player) => {
            return (
              <li>
                <b>{player.name}</b>: {player.role}
              </li>
            );
          })}
      </ul>
      <p className="text-center">Bad guys:</p>
      <ul className="players-list">
        {props.players
          .filter(
            (player) =>
              player.role === "Bad guy" ||
              player.role === "Mordred" ||
              player.role === "Morgana" ||
              player.role === "Oberon" ||
              player.role === "Assassin"
          )
          .map((player) => {
            return (
              <li key={player.id}>
                <b>{player.name}</b>: {player.role}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default EndGamePage;
