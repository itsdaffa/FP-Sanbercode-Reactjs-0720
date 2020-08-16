import React, { useContext } from "react";
import "./assets/style.css";
import axios from "axios";

import {Link} from "react-router-dom"
import { AuthProvider } from "../components/authcontext";


export default class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataGame: null };
  }

  componentDidMount = () => {
    if (this.state.dataGame == null) {
      axios.get(`https://backendexample.sanbersy.com/api/games`)
        .then((res) => {
          let data = res.data.map((el) => {
            return {
              id: el.id,
              name: el.name,
              genre: el.genre,
              singlePlayer: el.singlePlayer,
              multiplayer: el.multiplayer,
              platform: el.platform,
              release: el.release,
              pic: el.image_url,
              created: el.created_at,
              updated: el.updated_at

            };
          });
          this.setState({ dataGame: data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState(
        this.state.dataGame
      );
    }
  };

  render() {
    return (
      <>
        <section class="container">
          <h1>Best Games</h1>
          <div style={{display: "flex", flexWrap: "wrap"}} id="article-list">
            {this.state.dataGame !== null &&
              this.state.dataGame.map((datum) => {
                return (
                  <div style={{width: "30%",margin: "10px"}}>
                    <Link to={`/games/${datum.id}`}>
                        <img style={{objectFit: "cover", width:"150px", height:"200px"}}  src={datum.pic} />
                        <div className="desc-box">
                            <h2>{datum.name}</h2>
                            <p>
                                <strong>{datum.platform}</strong>
                            </p>
                        </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </section>

      </>
    );
  }
}


