import React, {useContext, useEffect, useState} from "react";
import axios from "axios"
import {AuthContext} from '../components/authcontext'
import Button from 'react-bootstrap/Button'

const Editor = (props) => {
  const [dataFilm, setDataFilm] = useState(null)
  const [edit, setEdit] = useState(false)
  const [input, setInput] = useState("")
  const [selectedId, setSelectedId] = useState(0)

  const handleChange = (e) => {
    const {name, value} = e.target
    setInput( (prevState) => ({
      ...prevState,
      [name] : value
    }))
  }

  const handleEdit = (e) => {
    let id = Number(e.target.value)
    let film = dataFilm.find( (datum) => datum.id === id)

    setInput({
      id: film.id,
      title: film.title,
      description: film.description,
      year: film.year,
      duration: film.duration,
      genre: film.genre,
      rating: film.rating
    })  

    setSelectedId(id)
    setEdit(true)

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setInput( (prevState) => ({
        ...prevState,
        created_at: new Date()
      })
    )
    if (edit === true) {
      axios
      .put(`https://backendexample.sanbersy.com/api/movies/${selectedId}`, input)
      .then( res => {
        let film = dataFilm.find( (datum) => datum.id === selectedId)
        film["id"] = selectedId
        film["title"] = input.title
        film["description"] = input.description
        film["year"] = input.year
        film["duration"] = input.duration
        film["genre"] = input.genre
        film["rating"] = input.rating
        setDataFilm([...dataFilm])

      })
    } else {
      axios
    .post(`https://backendexample.sanbersy.com/api/movies`, input)
    .then(res => {
      setDataFilm([...dataFilm, 
        {
          id: res.data.id,
          title: res.data.title,
          description: res.data.description,
          year: res.data.year,
          duration: res.data.duration,
          genre: res.data.genre,
          rating: res.data.rating,
          pic: res.data.image_url,
          created: res.data.created_at,
          updated: res.data.updated_at
        }
      ])
    })
    }
    

    setInput(
      {
      title: "",
      description: "",
      year: "",
      duration: "",
      genre: "",
      rating: ""}
    )
    setEdit(false)
  }

  const handleDelete = (e) => {
    let id = Number(e.target.value)
    let delFilm = dataFilm.filter( datum => datum.id !== id)

    axios
      .delete(` https://backendexample.sanbersy.com/api/movies/${id}`)
      .then( res => console.log(res))
    setDataFilm([...delFilm])
  }
  
  useEffect( ()=> {
    if (dataFilm === null) {
      axios
        .get(`http://backendexample.sanbercloud.com/api/movies`)
        .then( res => {
          setDataFilm(
            res.data.map(el => { 
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
              }
            })
          )
        })
    }
  }

  )

  return (
    <> 
    <section>
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Year</th>
          <th>Duration</th>
          <th>Genre</th>
          <th>Rating</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {dataFilm !== null && dataFilm.map((datum) => {
          return (
              <tr key={datum.id}>
                <td>
                  <img style={{objectFit: "contain", width:"100px", height:"100px"}} src={datum.pic} />
                </td>
                <td>
                  {datum.title}
                </td>
                <td>
                  {datum.year}
                </td>
                <td>
                  {datum.duration}
                </td>
                <td>
                  {datum.genre}
                </td>
                <td>
                  {datum.rating}
                </td>
                <td>
                  {datum.description}
                </td>
                <td className="button">
                  <Button onClick={handleEdit} value={datum.id} style={{marginBottom: "5px"}} variant="primary">Edit</Button><br />
                  <Button onClick={handleDelete} value={datum.id} variant="danger">Delete</Button>
                </td>
              </tr>
          );
        })
       }
      </tbody>
      </table>
    </section>
    <section id="bottom">
      <h2>{edit ? "Edit Entri" : "Tambahkan Entri"}</h2>
      <form onSubmit={handleSubmit} id="entry">
        <tbody>
        <tr>
          <td><label htmlFor="title">Title: </label></td>
          <td><input type="text" id="title" name="title" placeholder="Jumanju" value={input.title} onChange={handleChange} /></td>
        </tr>
        <br />
        <tr>
          <td><label htmlFor="description">Description: </label></td>
          <td><textarea form="entry" name="description" placeholder="Tulis apa gitu di sini" value={input.description} onChange={handleChange}/></td>
        </tr>
        <br />
        <tr>
          <td><label htmlFor="year">Year: </label></td>
          <td><input type="number" id="year" name="year" placeholder="2009" value={input.year} onChange={handleChange} /></td>
        </tr>
        <br/>
        <tr>
          <td><label htmlFor="duration">Duration (minutes): </label></td>
          <td><input type="number" id="duration" name="duration" placeholder="180" value={input.duration} onChange={handleChange} /></td>
        </tr>
        <br />
        <tr>
          <td><label htmlFor="genre">Genre: </label></td>
          <td><input type="text" id="genre" name="genre" placeholder="Action" value={input.genre} onChange={handleChange} /></td>
        </tr>
        <br/>
        <tr>
          <td><label htmlFor="rating">Rating (out of 10): </label></td>
          <td><input type="number" id="rating" name="rating" placeholder="7" value={input.rating} onChange={handleChange} /></td>
        </tr>
        <br/>
        <tr>
          <Button type="submit">{edit ? "Submit" : "Tambahkan"}</Button>
        </tr>
        </tbody>
        
      </form>
      
    </section>
      
    </>
  );
};

export default Editor;
