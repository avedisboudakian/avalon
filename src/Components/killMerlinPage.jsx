import React from "react";
import { Link } from "react-router-dom";

const KillMerlinPage = (props) => {
  const getAssassin = () => {
    return props.players.filter((player) => player.role === "Assassin")[0].name;
  };

  const renderKillOptions = () => {
    return props.players
      .filter(
        (player) =>
          player.role === "Merlin" ||
          player.role === "Good guy" ||
          player.role === "Percy" ||
          player.role === "Oberon" ||
          player.role === "Lover" ||
          player.role === "Jester"
      )
      .map((player) => (
        <Link to="/endgame" key={player.id}>
          <button
            className="btn btn-outline-light m-1"
            onClick={() => props.onAssassination(player)}
          >
            {player.name}
          </button>
        </Link>
      ));
  };

  return (
    <div className="text-center text-light tile">
      <h3>Evil's Last Chance - Assassinate Merlin</h3>
      <p>
        3 quests were completed <span className="good">successfully</span>. Evil
        players have a final opportunity to win the game by correctly naming
        which of the good players is Merlin.
      </p>
      <h4>
        {getAssassin()}, you are the <span className="bad">Assassin</span>. Kill
        Merlin:
      </h4>
      {renderKillOptions()}
    </div>
  );
};

export default KillMerlinPage;
