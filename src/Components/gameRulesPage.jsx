import React from "react";
import { Link } from "react-router-dom";

const GameRulesPage = (props) => {
  if (!props.gameParameters) {
    return <div>Loading...</div>;
  }

  // Log gameParameters to debug
  console.log(props.gameParameters);

  // Get the amount of good guys from the Game Parameters
  let getGoodGuys = () => {
    return props.gameParameters.roles.filter(
      (role) => role === "Good guy" || role === "Merlin" || role === "Percy"
    ).length;
  };

  // Get the amount of Bad guys from the Game Parameters
  let getBadGuys = () => {
    return props.gameParameters.roles.filter(
      (role) =>
        role === "Bad guy" ||
        role === "Assassin" ||
        role === "Mordred" ||
        role === "Morgana" ||
        role === "Oberon"
    ).length;
  };

  // get the amount of players per mission based on game rules
  let getMissionBreakdown = () => {
    return props.gameParameters.missionsBreakdown.map((mission) => {
      return (
        <p key={mission.missionIndex}>
          Mission: {mission.missionIndex} - Select: {mission.numberOfPlayers}{" "}
          players{" "}
          {props.gameParameters.playerCount >= 7 &&
          mission.missionIndex === 4 ? (
            <>
              <br />
              *This mission requires two fail votes to fail
            </>
          ) : null}
        </p>
      );
    });
  };

  return (
    <div className="tile text-light text-center">
      <h3>Game rules</h3>
      <p>
        Avalon is a game of hidden loyalty. Players are either Loyal Servants of
        Arthur fighting for Goodness or aligned with the Evil ways of Mordred.
        Good wins the game by successfully completing three Quests. Evil wins if
        three Quests end in failure. Evil can also win by assassinating Merlin
        at game's end or if a Quest cannot be undertaken.
      </p>
      <p className="good">{`${getGoodGuys()} Good guys`}</p>
      <p className="bad">{`${getBadGuys()} Bad guys`}</p>
      {getMissionBreakdown()}
      <Link to="/playerroles">
        <button
          className="btn btn-outline-success btn"
          onClick={props.onSetPlayerRoles}
        >
          START
        </button>
      </Link>
    </div>
  );
};

export default GameRulesPage;
