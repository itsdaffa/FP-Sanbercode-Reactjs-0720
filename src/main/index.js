import React, { useContext } from "react";
import "./assets/style.css";
import logo from "./assets/logo.png"; //bcos inline relative paths wont work unless u put it in 'public'
import Axios from "axios";
import { Link } from "react-router-dom";

import { AuthContext, AuthProvider } from "../components/authcontext";

export const Navbar = () => {
  const [user, setUser] = useContext(AuthContext);

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
      Axios.get(`http://backendexample.sanbercloud.com/api/movies`)
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
          <div id="article-list">
            {this.state.dataFilm !== null &&
              this.state.dataFilm.map((datum) => {
                return (
                  <div>
                    <img style={{float: left}} src={datum.pic} />
                    <div class="desc-box">
                    <h2>{datum.title}</h2>
                    <p>
                      <strong>Rating: {datum.duration}</strong>
                    </p>
                    <p>
                      <strong>Genre: {datum.genre}</strong>
                    </p>
                    <p>
                      <strong>Tahun Release: {datum.year}</strong>
                    </p>
                    <p class="desc">Deskripsi: {datum.description}</p>
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

// export const Home = () => {
//   return (
//     <>
//       <section>
//         <h1>Featured Posts</h1>
//         <div id="article-list">
//           <div>
//             <a href="">
//               <h3>Lorem Post 1</h3>
//             </a>
//             <p>
//               Lorem Ipsum Dolor Sit Amet, mea te verear signiferumque, per illum
//               labores ne. Blandit omnesque scripserit pri ex, et pri dicant
//               eirmod deserunt. Aeque perpetua ea nec. Sit erant patrioque
//               delicatissimi ut. Et sea quem sint, nam in minim voluptatibus.
//               Etiam placerat eam in.
//             </p>
//           </div>
//           <div>
//             <a href="">
//               <h3>Lorem Post 2</h3>
//             </a>
//             <p>
//               Lorem Ipsum Dolor Sit Amet, mea te verear signiferumque, per illum
//               labores ne. Blandit omnesque scripserit pri ex, et pri dicant
//               eirmod deserunt. Aeque perpetua ea nec. Sit erant patrioque
//               delicatissimi ut. Et sea quem sint, nam in minim voluptatibus.
//               Etiam placerat eam in.
//             </p>
//           </div>
//           <div>
//             <a href="">
//               <h3>Lorem Post 3</h3>
//             </a>
//             <p>
//               Lorem Ipsum Dolor Sit Amet, mea te verear signiferumque, per illum
//               labores ne. Blandit omnesque scripserit pri ex, et pri dicant
//               eirmod deserunt. Aeque perpetua ea nec. Sit erant patrioque
//               delicatissimi ut. Et sea quem sint, nam in minim voluptatibus.
//               Etiam placerat eam in.
//             </p>
//           </div>
//           <div>
//             <a href="">
//               <h3>Lorem Post 4</h3>
//             </a>
//             <p>
//               Lorem Ipsum Dolor Sit Amet, mea te verear signiferumque, per illum
//               labores ne. Blandit omnesque scripserit pri ex, et pri dicant
//               eirmod deserunt. Aeque perpetua ea nec. Sit erant patrioque
//               delicatissimi ut. Et sea quem sint, nam in minim voluptatibus.
//               Etiam placerat eam in.
//             </p>
//           </div>
//           <div>
//             <a href="">
//               <h3>Lorem Post 5</h3>
//             </a>
//             <p>
//               Lorem Ipsum Dolor Sit Amet, mea te verear signiferumque, per illum
//               labores ne. Blandit omnesque scripserit pri ex, et pri dicant
//               eirmod deserunt. Aeque perpetua ea nec. Sit erant patrioque
//               delicatissimi ut. Et sea quem sint, nam in minim voluptatibus.
//               Etiam placerat eam in.
//             </p>
//           </div>
//         </div>
//       </section>
//       <footer>
//         <h5>&copy; Copyright 2020 by Sanbercode</h5>
//       </footer>
//     </>
//   );
// };
