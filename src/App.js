import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AddPlayersPage from "./Components/addPlayersPage";
import GAME_PARAMETERS from "./Components/GAME_PARAMETERS";
import GameRulesPage from "./Components/gameRulesPage";
import PlayerRolesPage from "./Components/playerRolesPage";
import MissionsPage from "./Components/missionsPage";

import Mission from "./Components/mission";
import VotePage from "./Components/votePage";
import ResultPage from "./Components/resultpage";
import SpecialCharacterPage from "./Components/specialCharacterPage";
import EndGamePage from "./Components/endGamePage";
import KillMerlinPage from "./Components/killMerlinPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputAddPlayer: "",
      players: [],
      gameParameters: "",
      specialCharacters: [],
      indexOfLeader: 0,
      rejectedTeamsCount: 0,
      missionSuccess: 0,
      missionFailure: 0,
      merlinKilled: false,
    };
  }

  // Update this.state.inputAddPlayer
  handleChange = (e) => {
    this.setState({ inputAddPlayer: e.target.value });
  };

  // Add the new player in the players array and update the state
  handleAddPlayer = (e) => {
    e.preventDefault();
    if (this.state.inputAddPlayer === "") return;
    if (this.state.players.length === 10)
      return window.alert("The maximum amount of players has been reached");
    let name = this.state.inputAddPlayer;
    name = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
    const newPlayer = {
      name: name,
      id: this.state.players.length + 1,
      role: "",
    };
    const players = [...this.state.players, newPlayer];
    if (players.filter((player) => player.name === newPlayer.name).length >= 2)
      return window.alert("This player name is already used");
    this.setState({ players: players, inputAddPlayer: "" });
  };

  // Reset this.state.players to []
  handleReset = () => {
    const players = [];
    const specialCharacters = [];
    this.setState({
      players,
      specialCharacters,
    });
  };

  // Set the game rules on click of the "confirm players button"
  handleSetGameParameters = () => {
    let playerCount = [...this.state.players].length;
    // return the set of rules for the amount of players in the list:
    const gameParameters = GAME_PARAMETERS[playerCount - 5];
    this.setState({
      gameParameters,
    });
  };

  // Method to shuffle an array

  shuffle = (arr) => {
    let currentIndex = arr.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  };

  // randomly assigned a role to each player

  handleOnSetPlayerRoles = () => {
    let roles = [...this.state.gameParameters.roles].join(",");
    let specialCharacters = [...this.state.specialCharacters];

    //removes a bad guy and replaces it with Mordred
    if (specialCharacters.includes("Mordred"))
      roles = roles.replace(/Bad guy/, "Mordred");
    //removes a bad guy and replaces it with Morgana
    if (specialCharacters.includes("Morgana"))
      roles = roles.replace(/Bad guy/, "Morgana");
    //removes a Good guy and replaces it with Percy
    if (specialCharacters.includes("Percy"))
      roles = roles.replace(/Good guy/, "Percy");
    //removes a bad guy and replaces it with Oberon
    if (specialCharacters.includes("Oberon"))
      roles = roles.replace(/Bad guy/, "Oberon");

    roles = roles.split(",");

    this.shuffle(roles);
    const players = this.state.players.map((player) => {
      player.role = roles[player.id - 1];
      return player;
    });
    this.setState({ players: players });
  };

  // Add selected players to the team for the mission

  handleSelectPlayerForMission = (player, mission) => {
    let index = this.state.gameParameters.missionsBreakdown.indexOf(mission);
    let missionsObj = this.state.gameParameters.missionsBreakdown;

    if (missionsObj[index].team.includes(player))
      return window.alert("You can't add the same player in the mission twice");

    if (missionsObj[index].team.length >= missionsObj[index].numberOfPlayers)
      return window.alert(
        "the maximum amount of player for the mission has been reached"
      );

    let missions = [...missionsObj];
    let missionToMutate = missions[missions.indexOf(mission)];
    missionToMutate.team = [
      ...missionsObj[missions.indexOf(mission)].team,
      player,
    ];
    missions[missions.indexOf(mission)] = missionToMutate;
    let newGameParameters = { ...this.state.gameParameters };
    newGameParameters.missionsBreakdown = missions;
    this.setState({ gameParameters: newGameParameters });
  };

  // reset the team for the mission, increase indexOfLeader to get new leader and increase count of failed missions
  handleTeamRejected = (mission) => {
    let rejectedTeamsCount = this.state.rejectedTeamsCount;

    rejectedTeamsCount += 1;
    this.setState({ rejectedTeamsCount });

    // restart the indexOftheLeader to 0 when all players have been leaders once
    this.state.indexOfLeader === this.state.players.length - 1
      ? this.setState({ indexOfLeader: 0 })
      : this.setState({ indexOfLeader: this.state.indexOfLeader + 1 });

    // reset the team array for the current mission

    let missionsObj = this.state.gameParameters.missionsBreakdown;

    let missions = [...missionsObj];
    let missionToMutate = missions[missions.indexOf(mission)];
    missionToMutate.team = [];
    missions[missions.indexOf(mission)] = missionToMutate;
    let newGameParameters = { ...this.state.gameParameters };
    newGameParameters.missionsBreakdown = missions;
    this.setState({ gameParameters: newGameParameters });
  };

  handleTeamAccepted = () => {
    let rejectedTeamsCount = this.state.rejectedTeamsCount;
    rejectedTeamsCount = 0;
    this.setState({ rejectedTeamsCount });

    // restart the indexOftheLeader to 0 when all players have been leaders once
    this.state.indexOfLeader === this.state.players.length - 1
      ? this.setState({ indexOfLeader: 0 })
      : this.setState({ indexOfLeader: this.state.indexOfLeader + 1 });
  };

  // add "Pass" in the mission's vote array
  handlePassVote = (mission) => {
    let missionsObj = this.state.gameParameters.missionsBreakdown;
    let missions = [...missionsObj];
    let missionToMutate = missions[missions.indexOf(mission)];
    missionToMutate.votes = [
      ...missionsObj[missions.indexOf(mission)].votes,
      "Pass",
    ]
      .sort()
      .reverse();
    missions[missions.indexOf(mission)] = missionToMutate;
    let newGameParameters = { ...this.state.gameParameters };
    newGameParameters.missionsBreakdown = missions;
    this.setState({ gameParameters: newGameParameters });
  };

  //add "Fail in the mission's vote array"
  handleFailVote = (mission) => {
    let missionsObj = this.state.gameParameters.missionsBreakdown;
    let missions = [...missionsObj];
    let missionToMutate = missions[missions.indexOf(mission)];
    missionToMutate.votes = [
      ...missionsObj[missions.indexOf(mission)].votes,
      "Fail",
    ]
      .sort()
      .reverse();
    missions[missions.indexOf(mission)] = missionToMutate;
    let newGameParameters = { ...this.state.gameParameters };
    newGameParameters.missionsBreakdown = missions;
    this.setState({ gameParameters: newGameParameters });
  };

  handleAddSpecialCharacter = (name) => {
    if (!this.state.specialCharacters.includes("Percy") && name === "Morgana")
      return window.alert(
        "Percy needs to be selected before you can add Morgana"
      );
    if (this.state.specialCharacters.includes(name))
      return window.alert(`You already added ${name} to the game`);
    let specialCharacters = [...this.state.specialCharacters];
    specialCharacters.push(name);
    this.setState({ specialCharacters });
  };

  handleClearSpecialCharacters = () => {
    let specialCharacters = [...this.state.specialCharacters];
    specialCharacters = [];
    this.setState({ specialCharacters });
  };

  //update the win and lose counts after the vote phase
  handleUpdateResults = (mission, players) => {
    let missionSuccess = this.state.missionSuccess;
    let missionFailure = this.state.missionFailure;
    if (mission.votes.includes("Fail") && mission.missionIndex !== 4) {
      missionFailure++;
      return this.setState({ missionFailure });
    }
    if (
      players.length >= 7 &&
      mission.votes.filter((vote) => vote === "Fail").length >= 2 &&
      mission.missionIndex === 4
    ) {
      missionFailure++;
      return this.setState({ missionFailure });
    }
    if (
      players.length >= 7 &&
      mission.votes.filter((vote) => vote === "Fail").length < 2 &&
      mission.missionIndex === 4
    ) {
      missionSuccess++;
      return this.setState({ missionSuccess });
    }
    if (
      players.length < 7 &&
      mission.votes.includes("Fail") &&
      mission.missionIndex === 4
    ) {
      missionFailure++;
      return this.setState({ missionFailure });
    }
    missionSuccess++;
    return this.setState({ missionSuccess });
  };

  handleAssassination = (player) => {
    if (player.role === "Merlin")
      return this.setState({ merlinKilled: !this.state.merlinKilled });
    else return;
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <SpecialCharacterPage
                  onAddSpecialCharacter={this.handleAddSpecialCharacter}
                  onClearSpecialCharacters={this.handleClearSpecialCharacters}
                  specialCharacter={this.state.specialCharacters}
                />
              )}
            />
            <Route
              path="/addplayer"
              render={() => (
                <AddPlayersPage
                  inputAddPlayer={this.state.inputAddPlayer}
                  onChange={this.handleChange}
                  players={this.state.players}
                  addPlayer={this.handleAddPlayer}
                  reset={this.handleReset}
                  setGameParameters={this.handleSetGameParameters}
                  specialCharacter={this.state.specialCharacters}
                />
              )}
            />
            <Route
              path="/gamerules"
              render={() => (
                <GameRulesPage
                  gameParameters={this.state.gameParameters}
                  onSetPlayerRoles={this.handleOnSetPlayerRoles}
                />
              )}
            />
            <Route
              path="/playerroles"
              render={() => <PlayerRolesPage players={this.state.players} />}
            />
            <Route exact path="/missions" render={() => <MissionsPage />} />
            <Route
              exact
              path="/missions/:missionIndex"
              render={() => (
                <Mission
                  players={this.state.players}
                  gameParameters={this.state.gameParameters}
                  onSelectPlayer={this.handleSelectPlayerForMission}
                  indexOfLeader={this.state.indexOfLeader}
                  onHandleTeamRejected={this.handleTeamRejected}
                  onHandleTeamAccepted={this.handleTeamAccepted}
                  rejectedTeamsCount={this.state.rejectedTeamsCount}
                />
              )}
            />
            <Route
              exact
              path="/missions/:missionIndex/:voteIndex"
              render={() => (
                <VotePage
                  players={this.state.players}
                  onPassVote={this.handlePassVote}
                  onFailVote={this.handleFailVote}
                  onUpdateResults={this.handleUpdateResults}
                  gameParameters={this.state.gameParameters}
                />
              )}
            />
            <Route
              path="/missions/:missionIndex/:voteIndex/:resultIndex"
              render={() => (
                <ResultPage
                  gameParameters={this.state.gameParameters}
                  missionSuccess={this.state.missionSuccess}
                  missionFailure={this.state.missionFailure}
                />
              )}
            />
            <Route
              path="/endgame"
              render={() => (
                <EndGamePage
                  players={this.state.players}
                  missionSuccess={this.state.missionSuccess}
                  missionFailure={this.state.missionFailure}
                  merlinKilled={this.state.merlinKilled}
                />
              )}
            />
            <Route
              path="/killmerlin"
              render={() => (
                <KillMerlinPage
                  players={this.state.players}
                  onAssassination={this.handleAssassination}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
