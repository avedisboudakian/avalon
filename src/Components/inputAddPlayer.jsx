import React from "react";
import { Link } from "react-router-dom";

const InputAddPlayer = (props) => {
  return (
    <form className="d-flex m-3 form-group-row justify-content-center" onSubmit={props.addPlayer}>
      <input
        type="text"
        className="input-group form-control-sm col-sm-6"
        placeholder="Type player name"
        value={props.inputAddPlayer}
        onChange={props.onChange}
      />
      <button
        type="submit"
        className="btn btn-outline-light form-control-sm ml-2 mr-2"
      >
        +
      </button>
      <Link to="/">
        <button
          className="btn btn-outline-light form-control-sm"
          onClick={props.reset}
        >
          Reset
        </button>
      </Link>
    </form>
  );
};

export default InputAddPlayer;
