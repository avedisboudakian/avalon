import React, { Component } from "react";

const StartButton = (props) => {
  return (
    <button
      className="btn btn-outline-success mr-3 btn-sm"
      onClick={props.onSetPlayerRoles}
    >
      Start
    </button>
  );
};

export default StartButton;
