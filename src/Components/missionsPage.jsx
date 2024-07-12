import React from "react";
import { Link } from "react-router-dom";

const MissionsPage = (props) => {
  const renderMissions = () => {
    return props.gameParameters.missionsBreakdown.map((mission, index) => (
      <Link to={`/missions/${mission.missionIndex}`} key={mission.missionIndex}>
        <div className="mission-tile">
          <h4>Mission {mission.missionIndex}</h4>
          <p>{mission.numberOfPlayers} players required</p>
          <p>Status: {mission.status || "Pending"}</p>
        </div>
      </Link>
    ));
  };

  return (
    <div className="tile text-center text-light">
      <h3>Missions Overview</h3>
      <div className="missions-list">
        {renderMissions()}
      </div>
      <Link to="/addplayers">
        <button className="btn btn-outline-light">Back to Add Players</button>
      </Link>
    </div>
  );
};

export default MissionsPage;
