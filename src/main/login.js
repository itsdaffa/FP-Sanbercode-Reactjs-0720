import React, {useContext, useState} from "react";
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../components/authcontext"
import axios from "axios"

import Button from 'react-bootstrap/Button'
import { Form } from "react-bootstrap";

const Login = (props) => {
  const [user, setUser] = useContext(AuthContext)
  const [input, setInput] = useState({username: "", password: ""})
  const history = useHistory()
  console.log(useContext(AuthContext))

  const handleLogin = e => {
    e.preventDefault()
    axios.post('https://backendexample.sanbersy.com/api/login', input)
    .then( res => console.log(res))
    .catch( err => console.log(err))
  }

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    
    setInput(
      {...input, [name]:value}
    )

  }
  
  return (
    <>

    <section style={{width: "fit-content"}}>
    <Form onSubmit={handleLogin} style={{margin: "auto"}}>
      <Form.Group controlID="user">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" name="username" value={input.username} onChange={handleChange} placeholder="Enter username" />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={input.password} onChange={handleChange} placeholder="Password"  />
      </Form.Group>
      <Button variant="primary" type="submit"> Login </Button>
    </Form>
    </section>
    </>
  );
};

export default Login;
