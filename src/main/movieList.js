import React, { useContext } from "react";
import "./assets/style.css";
import axios from "axios";
import {Link} from "react-router-dom"


export default class Home extends React.Component {
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
          <h1>Best Movies</h1>
          <div style={{display: "flex", flexWrap: "wrap"}} id="article-list">
            {this.state.dataFilm !== null &&
              this.state.dataFilm.map((datum) => {
                return (

                  <div style={{width: "30%",margin: "10px"}}>
                    <Link to={`/movies/${datum.id}`}>
                    <img style={{objectFit: "cover", width:"150px", height:"200px"}}  src={datum.pic} />
                    <div className="desc-box">
                      <h2>{datum.title}</h2>
                      <p>
                        <strong>{datum.year}</strong>
                      </p>
                      <p>
                        <strong>⭐{datum.rating}</strong>
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


