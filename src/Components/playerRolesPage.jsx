import React from "react";
import PlayerRole from "./playerRole";
import { Link } from "react-router-dom";

const PlayerRolesPage = (props) => {
  return (
    <div className="tile text-center text-light">
      {props.players.map((player) => {
        return (
          <PlayerRole key={player.id} players={props.players} player={player} />
        );
      })}
      <div className="btn-container">
        <Link to="/missions/1">
          <button
            className="btn btn-outline-success"
            onClick={props.handleGoToMissions}
          >
            Go to missions
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PlayerRolesPage;
