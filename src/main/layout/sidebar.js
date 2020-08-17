import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import {AuthContext} from '../../components/authcontext'


const Sidebar = () => {
    const [user, setUser] = useContext(AuthContext);
    return (
    <aside className="sidebar">
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/games">Games</Link>
                </li>


                {user ? (
                    <>
                    <li><Link to="/account">Account</Link></li>
                    <li><Link to="/edit/movies">Edit Movies</Link></li>
                    <li><Link to="/edit/games">Edit Games</Link></li>

                    </>
                ) : (
                    ""
                )}
            </ul>
        </nav>
    </aside>
    )

}

export default Sidebar

