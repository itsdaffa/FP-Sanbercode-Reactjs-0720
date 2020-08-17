import React, { useContext } from "react";

import {Switch, Route} from "react-router"
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import logo from "../assets/logo.png"; //bcos inline relative paths wont work unless u put it in 'public'
import { AuthContext} from "../../components/authcontext";



const Header = () => {
    const [user, setUser] = useContext(AuthContext);

    const handleLogin = e => {
      e.preventDefault()
      console.log(user)
      setUser(true)
    }
  
    const handleLogout = e => {
      e.preventDefault()
      setUser(false)
      localStorage.removeItem("user")
    }
  
    return (
  
        <header>
          <img alt="Sanbercode logo" id="logo" src={logo} width="200px" />
          <nav className="login">

                {user ? (
                  <Button variant="secondary" onClick={handleLogout}>Logout</Button>
                ) : (
                  <Link to="/login"><Button variant="primary" >Login</Button></Link>
                )
                }

          </nav>
        </header>

    );
  };

  export default Header