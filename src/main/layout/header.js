import React, { useContext } from "react";

import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import logo from "../assets/logo.png"; //bcos inline relative paths wont work unless u put it in 'public'

import { AuthContext} from "../../components/authcontext";

const Header = () => {
    const [user, setUser] = useContext(AuthContext);
  
    const handleLogout = e => {
      e.preventDefault()
      setUser(false)
    }
  
    return (
      <>
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
    
      </>
    );
  };

  export default Header