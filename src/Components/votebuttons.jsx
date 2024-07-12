import React, { Component } from "react";

class VoteButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { voteClicked: false };
  }

  handlePassVote = (mission) => {
    this.props.onPassVote(mission);
    this.setState({ voteClicked: !this.state.voteClicked });
  };

  handleFailVote = (mission) => {
    this.props.onFailVote(mission);
    this.setState({ voteClicked: !this.state.voteClicked });
  };

  render() {
    return (
      <div
        key={this.props.player.id}
        className={
          this.state.voteClicked === false
            ? `player player-${this.props.player.id}`
            : `player player-${this.props.player.id}-hidden`
        }
      >
        <p>
          <b>{this.props.player.name}</b>, act on the mission!
        </p>
        <button
          className="btn btn-outline-success m-3"
          onClick={() => this.handlePassVote(this.props.mission)}
        >
          PASS
        </button>
        <button
          className="btn btn-outline-danger m-3"
          onClick={
            this.props.player.role === "Good guy" ||
            this.props.player.role === "Merlin" ||
            this.props.player.role === "Percy"
              ? () => this.handlePassVote(this.props.mission)
              : () => this.handleFailVote(this.props.mission)
          }
        >
          FAIL
        </button>
      </div>
    );
  }
}

export default VoteButtons;
