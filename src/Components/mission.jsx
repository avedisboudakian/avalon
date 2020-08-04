import React from "react";
import { useParams, Link } from "react-router-dom";

const Mission = (props) => {
  const { missionIndex } = useParams();
  const mission = props.gameParameters.missionsBreakdown[missionIndex - 1];
  const leader = props.players[props.indexOfLeader].name;

  // renders a button per player to add the player to the mission's team
  const renderPlayerButtons = () => {
    return props.players.map((player) => {
      return (
        <button
          className="btn btn-outline-light m-1"
          key={player.id}
          onClick={() => props.onSelectPlayer(player, mission)}
        >
          {player.name}
        </button>
      );
    });
  };

  //renders a list of the selected mission's team player
  const renderSelectedTeam = () => {
    return (
      <ol>
        {mission.team.map((player) => {
          return <li key={player.id}>{player.name}</li>;
        })}
      </ol>
    );
  };

  //render the reject team button and check for win condition if 5 missions have been rejected in single round
  const renderRejectedButton = (rejectedTeamsCount) => {
    if (rejectedTeamsCount === 4)
      return (
        <Link to="/endgame">
          {" "}
          <button
            className="btn btn-outline-danger mr-2"
            onClick={() => props.onHandleTeamRejected(mission)}
          >
            NO
          </button>
        </Link>
      );
    else
      return (
        <button
          className="btn btn-outline-danger mr-2"
          onClick={() => props.onHandleTeamRejected(mission)}
        >
          NO
        </button>
      );
  };

  // renders the confirm button that goes to the vote page and reset the count of rejected teams
  const renderConfirmButton = () => {
    return (
      <Link to={`/missions/${missionIndex}/vote${missionIndex}`}>
        <button
          className="btn btn-outline-success ml-2"
          onClick={props.onHandleTeamAccepted}
        >
          YES
        </button>
      </Link>
    );
  };

  return (
    <div className="tile text-center text-light">
      <h4>{leader}, you are the mission leader!</h4>
      <p>
        Mission: {missionIndex} - Choose: {mission.numberOfPlayers} players
      </p>
      {mission.missionIndex === 4 && props.players.length >= 7 ? (
        <p>*This mission requires two fail votes to fail</p>
      ) : null}
      <div className="d-flex justify-content-around flex-wrap">
        {renderPlayerButtons()}
      </div>
      <div className="text-left m-5">{renderSelectedTeam()}</div>
      {mission.team.length < mission.numberOfPlayers ? null : (
        <div>
          <h5>
            Vote for the proposed team. Has it been approved by a majority of
            players ?
          </h5>
          {props.rejectedTeamsCount === 4 ? (
            <p>
              4 teams have been rejected. If the next team is not approved, the
              Bad Guys will win the game
            </p>
          ) : null}
          <div>
            {renderRejectedButton(props.rejectedTeamsCount)}
            {renderConfirmButton()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mission;
