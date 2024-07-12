import React from "react";
import { useParams, Link } from "react-router-dom";
import "./resultpage.css";

const ResultPage = (props) => {
  const { resultIndex } = useParams();
  let missionIndex = resultIndex.charAt(resultIndex.length - 1);
  const mission = props.gameParameters.missionsBreakdown[missionIndex - 1];
  const indexNextMission = parseInt(missionIndex, 10) + 1;

  const renderResults = () => {
    return mission.votes.map((vote, index) => {
      return vote === "Pass" ? (
        <div key={index} className="pass-vote vote-container"></div>
      ) : (
        <div key={index} className="fail-vote vote-container"></div>
      );
    });
  };

  const checkWinCondition = (missionSuccess, missionFailure, indexNextMission) => {
    if (missionSuccess === 3) return "/killmerlin";
    if (missionFailure === 3) return "/endgame";
    return `/missions/${indexNextMission}`;
  };

  const getNextBtnDelay = (votes) => {
    switch (votes.length) {
      case 2:
        return "delay2";
      case 3:
        return "delay3";
      case 4:
        return "delay4";
      case 5:
        return "delay5";
      default:
        return "";
    }
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
