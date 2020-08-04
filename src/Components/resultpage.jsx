import React from "react";
import { useParams, Link } from "react-router-dom";
import "./resultpage.css";

const ResultPage = (props) => {
  const { resultIndex } = useParams();
  let missionIndex = resultIndex.charAt(resultIndex.length - 1);
  const mission = props.gameParameters.missionsBreakdown[missionIndex - 1];
  const indexNextMission = parseInt(missionIndex, 10) + 1;

  const renderResults = () => {
    return mission.votes.map((vote) => {
      return vote === "Pass" ? (
        <div className="pass-vote vote-container"></div>
      ) : (
        <div className="fail-vote vote-container"></div>
      );
    });
  };

  let checkWinCondition = (
    missionSuccess,
    missionFailure,
    indexNextMission
  ) => {
    if (missionSuccess === 3) return "/killmerlin";
    if (missionFailure === 3) return "/endgame";
    else return `/missions/${indexNextMission}`;
  };

  let getNextBtnDelay = (votes) => {
    if (votes.length === 2) return "delay2";
    if (votes.length === 3) return "delay3";
    if (votes.length === 4) return "delay4";
    if (votes.length === 5) return "delay5";
  };

  return (
    <div className="tile text-light text-center">
      <div className="results-container">{renderResults()}</div>
      <div className="btn-container">
        <Link
          to={checkWinCondition(
            props.missionSuccess,
            props.missionFailure,
            indexNextMission
          )}
        >
          <button
            className={`btn btn-light btn-sm ${getNextBtnDelay(mission.votes)}`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
