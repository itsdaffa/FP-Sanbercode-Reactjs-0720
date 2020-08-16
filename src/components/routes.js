import React, {useState} from 'react'
import {Switch, Route} from "react-router"

import Header from '../main/layout/header'
import Footer from '../main/layout/footer'
import Sidebar from '../main/layout/sidebar'

import Home from '../main/movieList'
import MovieDetail from '../main/movieDetail'
import MovieEdit from '../main/movieEdit'

import GameList from '../main/gameList'
import GameDetail from '../main/gameDetail'
import About from '../main/about'
import Contact from '../main/contact'
import Editor from '../main/editor'
import Login from '../main/login'

import ProtectedRoute from './protectedroute'

import {AuthProvider} from './authcontext'

const Routes = () => {
  const [user, setUser] = useState(false)
  const handleLogin = e => {
    e.preventDefault()
    console.log(user)
    setUser(true)
  }

  const handleLogout = e => {
    e.preventDefault()
    setUser(false)
  }
  return (
    <>

    <Header />
    <Sidebar />

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movies/:id" component={MovieDetail} />
      <Route exact path="/edit/movies/:id" component={MovieEdit} />
      <Route exact path="/games" component={GameList} />
      <Route exact path="/games/:id" component={GameDetail} />
      <Route exact path="/about" component={About} />
      <Route exact path = "/contact" component={Contact} />
      <Route exact path = "/login" handleLogin={handleLogin} 
        render={props => <Login {...props} user={user} handleLogin={handleLogin} />} />
      <Route exact path ="/editor" component={Editor} />
      {/* <ProtectedRoute exact path ='/editor' user={user} handleLogout={handleLogout} component={Editor} />  */}
    </Switch>

    
    <Footer />
    </>
  )
}

export default Routes