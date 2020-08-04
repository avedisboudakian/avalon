import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import logo from "./logo.png";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <div className="background">
    <img src={logo} alt="logo" className="logo"></img>
    <App />
  </div>,
  document.getElementById("root")
);
