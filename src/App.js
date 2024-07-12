import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AddPlayersPage from "./Components/addPlayersPage";
import { GAME_PARAMETERS } from "./Components/GAME_PARAMETERS";
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
      gameParameters: null,
      specialCharacters: [],
      indexOfLeader: 0,
      rejectedTeamsCount: 0,
      missionSuccess: 0,
      missionFailure: 0,
      merlinKilled: false,
      assassinationTarget: null,
    };
  }

  handleChange = (e) => {
    this.setState({ inputAddPlayer: e.target.value });
  };

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

  handleReset = () => {
    const players = [];
    const specialCharacters = [];
    this.setState({
      players,
      specialCharacters,
    });
  };

  handleSetGameParameters = (gameParams) => {
    this.setState({ gameParameters: gameParams });
  };

  handleAddSpecialCharacter = (name) => {
    if (!this.state.specialCharacters.includes(name)) {
      this.setState((prevState) => ({
        specialCharacters: [...prevState.specialCharacters, name],
      }));
    }
  };

  handleClearSpecialCharacters = () => {
    this.setState({ specialCharacters: [] });
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
    let roles = [...this.state.gameParameters.roles];
    let specialCharacters = [...this.state.specialCharacters];

    // Ensure Merlin and Assassin are included
    if (!roles.includes("Merlin")) roles.push("Merlin");
    if (!roles.includes("Assassin")) roles.push("Assassin");

    // Add selected special characters to roles
    if (specialCharacters.includes("Mordred"))
      roles = roles.map((role) => (role === "Bad guy" ? "Mordred" : role));
    if (specialCharacters.includes("Morgana"))
      roles = roles.map((role) => (role === "Bad guy" ? "Morgana" : role));
    if (specialCharacters.includes("Percy"))
      roles = roles.map((role) => (role === "Good guy" ? "Percy" : role));
    if (specialCharacters.includes("Oberon"))
      roles = roles.map((role) => (role === "Bad guy" ? "Oberon" : role));

    if (specialCharacters.includes("Lovers")) {
      let goodGuys = roles.filter((role) => role === "Good guy");
      if (goodGuys.length >= 2) {
        goodGuys[0] = "Lover";
        goodGuys[1] = "Lover";
      } else if (goodGuys.length === 1) {
        goodGuys[0] = "Lover";
        roles[roles.indexOf("Merlin")] = "Lover";
      }
      roles = roles.map((role) =>
        role === "Good guy" && goodGuys.length > 0 ? goodGuys.pop() : role
      );
    }

    if (specialCharacters.includes("Jester")) {
      let goodGuys = roles.filter((role) => role === "Good guy");
      if (goodGuys.length > 0) {
        roles[roles.indexOf(goodGuys[0])] = "Jester";
      }
    }

    roles = roles.slice(0, this.state.players.length); // Ensure roles length matches players length
    this.shuffle(roles);

    const players = this.state.players.map((player, index) => {
      player.role = roles[index];
      return player;
    });

    console.log("Players with roles: ", players); // Debugging

    this.setState({ players: players });
  };

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
    if (player.role === "Merlin") {
      this.setState({ merlinKilled: true, assassinationTarget: player.name });
    } else {
      this.setState({ assassinationTarget: player.name });
    }
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
                  assassinationTarget={this.state.assassinationTarget}
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
