import React, {useState, useContext} from 'react'
import {Switch, Route} from "react-router"

import {Home, Navbar} from '../main/index'
import About from '../main/about'
import Contact from '../main/contact'
import Editor from '../main/editor'
import Login from '../main/login'

import ProtectedRoute from './protectedroute'

import {AuthProvider, AuthContext} from './authcontext'

const Routes = () => {
  const [user, setUser] = useContext(AuthContext)
  console.log(useContext(AuthContext  ))

  const handleLogin = e => {
    e.preventDefault()
    setUser(true)
  }

  const handleLogout = e => {
    e.preventDefault()
    setUser(false)
  }
  return (

  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path = "/contact" component={Contact} />
      <Route exact path = "/login" 
        render={props => <Login {...props} user={user} handleLogin={handleLogin} />} />
      <Route exact path ="/editor"
        render = {props => <Editor {...props} user={user} handleLogout={handleLogout}/>}/>
    </Switch>
</> 
  

  )
}

export default Routes