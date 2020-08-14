import React, {useState, useContext} from 'react'
import {Switch, Route} from "react-router"
import {useHistory} from 'react-router-dom'
import history from './history'

import {Home, Navbar} from '../main/index'
import About from '../main/about'
import Contact from '../main/contact'
import Editor from '../main/editor'
import Login from '../main/login'

import ProtectedRoute from './protectedroute'

import {AuthContext} from './authcontext'

const Routes = () => {
  const [user, setUser] = useContext(AuthContext)
  // const history = useHistory()
  // console.log(useContext(AuthContext))

  // const handleLogin = e => {
  //   e.preventDefault()
  //   history.push("/about")
  //   setUser(true)
  // }


  return (

  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path = "/contact" component={Contact} />
      <Route exact path = "/login">
        <Login />
      </Route>
      {/* <Route exact path = "/login" 
        render={props => <Login {...props} user={user} handleLogin={handleLogin} />} /> */}
      <ProtectedRoute exact path ="/editor" user={user} component={Editor}/>
    </Switch>
</> 
  

  )
}

export default Routes