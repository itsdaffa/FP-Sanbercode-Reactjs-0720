import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import {AuthContext} from '../../components/authcontext'


const Sidebar = () => {
    const [user, setUser] = useContext(AuthContext);
    return (
    <div className="sidebar">
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/games">Games</Link>
                </li>
    
                <li>
                    <Link to="/about">About</Link>
                </li>
    
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
    
                
                    {user ? (
                    <li><Link to="/editor">Editor</Link></li>
                    ) : (
                    ""
                    )}
                
            </ul>
        </nav>
    </div>
    )

}

export default Sidebar

