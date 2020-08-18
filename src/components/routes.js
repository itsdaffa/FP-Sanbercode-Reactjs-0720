import React, {useState, useContext} from 'react'
import {Switch, Route} from "react-router"

import Header from '../main/layout/header'
import Footer from '../main/layout/footer'
import Sidebar from '../main/layout/sidebar'

import Home from '../main/movieList'
import MovieDetail from '../main/movieDetail'
import MovieEdit from '../main/movieEdit'
import MovieCreate from '../main/movieCreate'
import Editor from '../main/editorMovie'

import GameList from '../main/gameList'
import GameDetail from '../main/gameDetail'
import GameEdit from '../main/gameEdit'
import EditorGame from '../main/editorGame'
import GameCreate from '../main/gameCreate'
import Account from '../main/account'
import Login from '../main/login'

import NotFound from '../main/notFound'

import { AuthContext} from "./authcontext";
// import ProtectedRoute from './protectedroute'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



const Routes = () => {

  const [user, setUser] = useContext(AuthContext);


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
      <Header/>

      <Sidebar />

          <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/movies/:id" component={MovieDetail} />
                
                <Route exact path="/games" component={GameList} />
                <Route exact path="/games/:id" component={GameDetail} />
              
              {user ?  (
                <>
                <Route exact path ="/edit/movies" component={Editor} />
                <Route exact path="/edit/movies/:id" component={MovieEdit} />
                <Route exact path="/create/movies" component={MovieCreate} />
                
                <Route exact path="/edit/games" component={EditorGame} />
                <Route exact path="/edit/games/:id" component={GameEdit} />
                <Route exact path="/create/games" component={GameCreate} />

                <Route exact path="/account" component={Account} />
                </>
              ) : ("") }


                
                <Route exact path = "/login" handleLogin={handleLogin} 
                  render={props => <Login {...props} user={user} handleLogin={handleLogin} />} />

                <Route component={NotFound} />
                
            {/* <ProtectedRoute exact path ='/editor' user={user} handleLogout={handleLogout} component={Editor} />  */}
          </Switch>

        <Footer />
   </>
  )
}

export default Routes