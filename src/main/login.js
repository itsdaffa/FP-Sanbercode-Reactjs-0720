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

  const handleChange = e => {
    console.log(input)
    setInput(
      {...input,[e.target.name]:e.target.value}
    )
  }

  const handleLogin = e => {
    e.preventDefault()
    axios.post('https://backendexample.sanbersy.com/api/login', {username: input.username, password: input.password})
    .then( res => { console.log(res)
      if (res.data.id) {
        setUser( {
          id: res.data.id,
          username: res.data.username,
          password: res.data.password
        })
        localStorage.setItem(
          "user",
          JSON.stringify(res.data)
        )
      } else {
        alert(res.data)
      }
    })
    .catch( err => console.log(err) )
    history.push('/')
  }

  const handleRegister = e => {
    e.preventDefault()
    axios.post('https://backendexample.sanbersy.com/api/users', {username: input.regUsername, password: input.regPassword})
    .then( res => {
      if (res.data.id) {
        alert("Yay, berhasil daftar!")
      } else {
        alert(`Error: ${res.data}`)
      }
    })
    .catch(err => console.log(err))
    history.push('/login')
  }

  
  return (
    <>
    <section>
    <section className="loginBox">
      <h1>Login</h1>
      <Form onSubmit={handleLogin} style={{margin: "auto"}}>
        <Form.Group controlID="user">
          <Form.Label>Username:</Form.Label>
          <Form.Control size="lg" type="text" name="username" value={input.username} onChange={handleChange} placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control size="lg" type="password" name="password" value={input.password} onChange={handleChange} placeholder="Enter password"  />
        </Form.Group>
        <Button size="lg" variant="primary" type="submit"> Login </Button>
      </Form>
    </section>
    <section className="loginBox" >
      <h2>Belum punya akun? Register aja!</h2>
      <Form onSubmit={handleRegister} style={{margin: "auto"}}>
        <Form.Group controlID="user">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" name="regUsername" value={input.regUsername} onChange={handleChange} placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="regPassword" value={input.regPassword} onChange={handleChange} placeholder="Enter password"  />
        </Form.Group>
        <Button variant="secondary" type="submit"> Register </Button>
      </Form>
    </section>
    </section>

    </>
  );
};

export default Login;
