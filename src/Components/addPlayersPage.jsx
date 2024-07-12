import React from "react";
import InputAddPlayer from "./inputAddPlayer";
import PlayerList from "./playerList";
import { Link } from "react-router-dom";
import { GAME_PARAMETERS } from "./GAME_PARAMETERS"; // Import as named export

const AddPlayersPage = (props) => {
  const displayConfirmButton = () => {
    let { players, specialCharacter } = props;
    const disabledStartButton = (
      <div className="d-flex justify-content-center">
        <p className="alert alert-warning" disabled>
          Add more players or change special characters settings to start
        </p>
      </div>
    );

    if (players.length < 5) return disabledStartButton;

    if (specialCharacter.length === 4 && players.length < 10)
      return disabledStartButton;
    if (
      specialCharacter.length === 3 &&
      !specialCharacter.includes("Oberon") &&
      players.length < 7
    )
      return disabledStartButton;
    if (
      specialCharacter.length === 3 &&
      !specialCharacter.includes("Morgana") &&
      players.length < 7
    )
      return disabledStartButton;
    if (
      specialCharacter.length === 3 &&
      !specialCharacter.includes("Mordred") &&
      players.length < 7
    )
      return disabledStartButton;
    if (
      specialCharacter.length === 2 &&
      specialCharacter.includes("Mordred") &&
      specialCharacter.includes("Oberon") &&
      players.length < 7
    )
      return disabledStartButton;

    return (
      <Link to="/gamerules" style={{ textDecoration: "none" }}>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-outline-success"
            onClick={() => {
              const gameParams = GAME_PARAMETERS.find(
                (param) => param.playerCount === players.length
              );
              props.setGameParameters(gameParams); // Set game parameters based on player count
            }}
          >
            CONFIRM
          </button>
        </div>
      </Link>
    );
  };

  return (
    <div className="tile text-light">
      <h3 className="text-center">Add players</h3>
      <p className="text-center">
        <b>Important: do not refresh the page during the game</b>
      </p>
      <InputAddPlayer
        inputAddPlayer={props.inputAddPlayer}
        onChange={props.onChange}
        players={props.players}
        addPlayer={props.addPlayer}
        reset={props.reset}
      />
      <PlayerList players={props.players} />
      {displayConfirmButton()}
    </div>
  );
};

export default AddPlayersPage;
