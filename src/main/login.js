import React, {useContext} from "react";
import {Link} from "react-router-dom"

import {AuthContext} from "../components/authcontext"

const Login = (props) => {
  return (
    <>
      <button style={{ marginTop: "100px" }} onClick={props.handleLogin}>
        Login
      </button>
      <p> You are {props.user ? "" : "not"} logged in </p>
      {props.user?(<Link to="/editor">Ke Editor</Link>):""}
    </>
  );
};

export default Login;
