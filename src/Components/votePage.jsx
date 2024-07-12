import React from "react";
import { useParams, Link } from "react-router-dom";

import VoteButtons from "./votebuttons";

const VotePage = (props) => {
  const { voteIndex } = useParams();
  let missionIndex = voteIndex.charAt(voteIndex.length - 1);
  const mission = props.gameParameters?.missionsBreakdown[missionIndex - 1];

  if (!mission) {
    return <div className="tile text-light text-center">Mission not found.</div>;
  }

  return (
    <div className="tile text-light text-center">
      {mission.team.map((player) => (
        <VoteButtons
          key={player.id}
          player={player}
          onPassVote={() => props.onPassVote(mission)}
          onFailVote={() => props.onFailVote(mission)}
          mission={mission}
        />
      ))}
      <div className="btn-container">
        <Link
          to={`/missions/mission${missionIndex}/vote${missionIndex}/results${missionIndex}`}
        >
          <button
            className="btn btn-outline-light m-2"
            onClick={() => props.onUpdateResults(mission, props.players)}
          >
            SHOW RESULTS
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VotePage;
