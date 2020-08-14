import React, {useContext} from "react";
import {Link} from "react-router-dom"
import {useHistory} from 'react-router-dom'

import Button from 'react-bootstrap/Button'

import {AuthContext} from "../components/authcontext"

import { Form } from "react-bootstrap";

const Login = (props) => {
  const [user, setUser] = useContext(AuthContext)
  const history = useHistory()
  console.log(useContext(AuthContext))

  const handleLogin = e => {
    e.preventDefault()
    history.push("/editor")
    setUser(true)
  }
  
  return (
    <>

    <section style={{width: "fit-content"}}>
    <Form style={{margin: "auto"}}>
      <Form.Group controlID="user">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter username" />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleLogin}> Login </Button>
    </Form>
    </section>
    </>
  );
};

export default Login;
