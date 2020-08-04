import React, { Component } from "react";
import { Link } from "react-router-dom";

class SpecialCharacterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MordredClicked: false,
      MorganaClicked: false,
      PercyClicked: false,
      OberonClicked: false,
    };
  }

  addSpecialCharacter = (name) => {
    this.props.onAddSpecialCharacter(name);
    switch (name) {
      case "Mordred":
        this.setState({ MordredClicked: true });
        break;
      case "Percy":
        this.setState({ PercyClicked: true });
        break;
      case "Morgana":
        return this.state.PercyClicked === false
          ? null
          : this.setState({ MorganaClicked: true });
        break;
      case "Oberon":
        this.setState({ OberonClicked: true });
        break;
    }
  };

  getBtnClass = (name) => {
    switch (name) {
      case "Mordred":
        return this.state.MordredClicked === false
          ? "btn btn-outline-danger"
          : "btn btn-danger";
        break;
      case "Morgana":
        return this.state.MorganaClicked === false
          ? "btn btn-outline-danger"
          : "btn btn-danger";
        break;
      case "Oberon":
        return this.state.OberonClicked === false
          ? "btn btn-outline-danger"
          : "btn btn-danger";
        break;
      case "Percy":
        return this.state.PercyClicked === false
          ? "btn btn-outline-success"
          : "btn btn-success";
        break;
    }
  };

  clear = () => {
    this.setState({
      MordredClicked: false,
      MorganaClicked: false,
      PercyClicked: false,
      OberonClicked: false,
    });
    this.props.onClearSpecialCharacters();
  };

  render() {
    const specialCharacters = [
      {
        name: "Mordred",
        ability:
          "Mordred's identity is not revealed to Merlin at the start of the game.",
      },
      {
        name: "Percy",
        ability: "Percy knows Merlin's identity at the start of the game.",
      },
      {
        name: "Morgana",
        ability:
          "Morgana's power is that she appears to be Merlin - revealing herself to Percival as Merlin.",
      },

      {
        name: "Oberon",
        ability:
          "Whilst being on the side of the evil, Oberon does not reveal himself to the other evil players, nor does he gain knowledge of the other evil players.",
      },
    ];

    return (
      <div className="tile text-light">
        <h3 className="text-center">Special characters</h3>
        <p className="text-center">
          <em>
            Merlin & the Assassin are included by default. <br />
            Click to select a character:
          </em>
        </p>

        {specialCharacters.map((character) => {
          return (
            <div key={character.name} className="row m-2">
              <div className="col-sm-2 text-center">
                <button
                  className={this.getBtnClass(character.name)}
                  onClick={() => this.addSpecialCharacter(character.name)}
                >
                  {character.name}
                </button>
              </div>
              <div className="col-sm-10">
                <p>{character.ability}</p>
              </div>
            </div>
          );
        })}

        <div className="d-flex justify-content-center">
          <button
            className="btn btn-outline-warning btn-sm m-2"
            onClick={this.clear}
          >
            Clear selection
          </button>
          <button className="btn btn-outline-light btn-sm m-2">
            <a
              href="https://www.ultraboardgames.com/avalon/game-rules.php"
              target="_blank"
            >
              Rules
            </a>
          </button>
          <Link to="/addplayer">
            {" "}
            <button className="btn btn-outline-light btn-sm m-2">Next</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default SpecialCharacterPage;
