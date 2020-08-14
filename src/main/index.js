import React, { useContext } from "react";
import "./assets/style.css";
import logo from "./assets/logo.png"; //bcos inline relative paths wont work unless u put it in 'public'
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

import { AuthContext, AuthProvider } from "../components/authcontext";

export const Navbar = () => {
  const [user, setUser] = useContext(AuthContext);

  const handleLogout = e => {
    e.preventDefault()
    setUser(false)
  }

  return (
    <>
      <header>
        <img alt="Sanbercode logo" id="logo" src={logo} width="200px" />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

            <li>
              {user ? (
                <Link to="/editor">Editor</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              {user ? (
                <Button variant="secondary" size="sm" onClick={handleLogout}>Logout</Button>
              ) : ""
              }
            </li>
          </ul>
        </nav>
      </header>
  
    </>
  );
};

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataFilm: null };
  }

  componentDidMount = () => {
    if (this.state.dataFilm == null) {
      axios.get(`http://backendexample.sanbercloud.com/api/movies`)
        .then((res) => {
          let data = res.data.map((el) => {
            return {
              id: el.id,
              title: el.title,
              description: el.description,
              year: el.year,
              duration: el.duration,
              genre: el.genre,
              rating: el.rating,
              pic: el.image_url,
              created: el.created_at,
              updated: el.updated_at

            };
          });
          data.sort((a, b) => Number(b.rating) - Number(a.rating));
          this.setState({ dataFilm: data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState(
        this.state.dataFilm.sort((a, b) => Number(b.rating) - Number(a.rating))
      );
    }
  };

  render() {
    return (
      <>
        <section>
          <h1>Daftar Film Film Terbaik</h1>
          <div style={{display: "flex", flexWrap: "wrap"}} id="article-list">
            {this.state.dataFilm !== null &&
              this.state.dataFilm.map((datum) => {
                return (
                  <div style={{width: "30%",margin: "10px"}}>
                    <img style={{objectFit: "contain", width:"100px", height:"100px"}}  src={datum.pic} />
                    <div className="desc-box">
                    <h2>{datum.title}</h2>
                    <p>
                      <strong>Duration: {datum.duration}</strong>
                    </p>
                    <p>
                      <strong>Genre: {datum.genre}</strong>
                    </p>
                    <p>
                      <strong>Tahun Release: {datum.year}</strong>
                    </p>
                    <p className="desc">Deskripsi: {datum.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
        <footer>
          <h5>&copy; Copyright 2020 by Sanbercode</h5>
        </footer>
      </>
    );
  }
}


