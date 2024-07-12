import React, { Component } from "react";

class PlayerRole extends Component {
  constructor(props) {
    super(props);
    this.state = { displayRole: false, hidePlayer: false };
  }

  // Get Merlin and Morgana for Percy
  getPercyRole = () => {
    if (
      this.props.players.filter((player) => player.role === "Morgana").length >
      0
    )
      return (
        <div>
          <p>
            These two are Merlin and Morgana, but you are unsure which is which:
          </p>
          <p>
            {
              this.props.players.filter((player) => player.role === "Merlin")[0]
                .name
            }
            ,{" "}
            {
              this.props.players.filter(
                (player) => player.role === "Morgana"
              )[0].name
            }
          </p>
        </div>
      );
    return (
      <div>
        <p>Protect Merlin at all costs. Merlin is:</p>
        <p className="good">
          {
            this.props.players.filter((player) => player.role === "Merlin")[0]
              .name
          }
        </p>
      </div>
    );
  };

  //Get all the bad guys for Merlin except Mordred
  getMerlinRole = () => {
    return this.props.players
      .filter(
        (player) =>
          (player.role === "Bad guy" &&
            player.name !== this.props.player.name) ||
          (player.role === "Assassin" &&
            player.name !== this.props.player.name) ||
          (player.role === "Morgana" &&
            player.name !== this.props.player.name) ||
          (player.role === "Oberon" && player.name !== this.props.player.name)
      )
      .map((player) => player.name)
      .join(", ");
  };

  //this returns the other bad guys

  getOtherBadGuys = () => {
    return this.props.players
      .filter((player) => {
        if (
          (player.role === "Bad guy" &&
            player.name !== this.props.player.name) ||
          (player.role === "Assassin" &&
            player.name !== this.props.player.name) ||
          (player.role === "Mordred" &&
            player.name !== this.props.player.name) ||
          (player.role === "Morgana" && player.name !== this.props.player.name)
        )
          return true;
      })
      .map((player) => player.name)
      .join(", ");
  };

  // Display role on click of the button

  displayPlayerRole = () => {
    this.setState({ displayRole: !this.state.displayRole });
  };

  // hide the player to move to the next one
  hidePlayer = () => {
    this.setState({ hidePlayer: !this.state.hidePlayer });
  };

  //renders a description text for each role
  getRoleDescription = (role) => {
    switch (role) {
      case "Merlin":
        return (
          <div>
            <p>Don't get caught .The Bad Guys you found are:</p>
            <p className="bad">{this.getMerlinRole()}</p>
          </div>
        );

      case "Assassin":
        return (
          <div>
            <p>Kill Merlin. The other Bad Guys are:</p>
            <p className="bad">{this.getOtherBadGuys()}</p>
          </div>
        );

      case "Good guy":
        return (
          <div>
            <p>
              Good must prevail. Try to figure out who your fellow Good Guys are
            </p>
          </div>
        );

      case "Bad guy":
        return (
          <div>
            <p>Evil must prevail. The other Bad Guys are:</p>
            <p className="bad">{this.getOtherBadGuys()}</p>
          </div>
        );

      case "Percy":
        return this.getPercyRole();

      case "Morgana":
        return (
          <div>
            <p>Evil must prevail. The other Bad Guys are:</p>
            <p className="bad">{this.getOtherBadGuys()}</p>
          </div>
        );

      case "Mordred":
        return (
          <div>
            <p>Merlin doesn't know who you are. The other Bad Guys are:</p>
            <p className="bad">{this.getOtherBadGuys()}</p>
          </div>
        );

      case "Oberon":
        return (
          <div>
            <p>
              Evil must prevail. You have no idea who your fellow Bad Guys are.
            </p>
          </div>
        );

      case "Lover":
        return (
          <div>
            <p>
              You are in love with{" "}
              {
                this.props.players.filter(
                  (player) => player.role === "Lover" && player !== this.props.player
                )[0].name
              }
              . Both of you must survive for the good guys to win.
            </p>
          </div>
        );

      case "Jester":
        return (
          <div>
            <p>
              Your goal is to be assassinated by the bad guys. If you are chosen
              as Merlin, you win the game by yourself.
            </p>
          </div>
        );

      default:
        return <p>Your role hasn't been assigned yet</p>;
    }
  };

  displayRole = () => {
    let { role } = this.props.player;
    if (this.state.displayRole === false) return;
    return (
      <div>
        <h4>{this.props.player.name}</h4>
        <p>your role is:</p>
        <p
          className={
            role === "Good guy" ||
            role === "Merlin" ||
            role === "Percy" ||
            role === "Lover"
              ? "good"
              : role === "Jester"
              ? "jester"
              : "bad"
          }
        >
          {this.props.player.role}
        </p>
        {this.getRoleDescription(this.props.player.role)}
        <button onClick={this.hidePlayer} className="btn btn-outline-success">
          Got it
        </button>
      </div>
    );
  };

  render() {
    return (
      <div
        className={` player player-${
          this.state.hidePlayer === false
            ? this.props.player.id
            : `${this.props.player.id}-hidden`
        }`}
      >
        <div
          className={this.state.displayRole === false ? null : "iam-btn-hidden"}
        >
          <p>
            Pass the phone to <b>{this.props.player.name}</b>
          </p>
          <button
            onClick={this.displayPlayerRole}
            className="btn btn-outline-light"
          >
            I am {this.props.player.name}
          </button>
        </div>
        {this.displayRole()}
      </div>
    );
  }
}

export default PlayerRole;
