import React, {useState} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router'


const MovieCreate = () => {
    const [input, setInput] = useState("")
    const history = useHistory()


    const handleChange = (e) => {
        const {name, value} = e.target
        setInput( (prevState) => ({
          ...prevState,
          [name] : value
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post(`https://backendexample.sanbersy.com/api/movies`, input)
        .then(res => { console.log(res)  
          alert("Berhasil menambahkan film!")
        })
        
        setInput(
          {
          title: "",
          description: "",
          year: "",
          duration: "",
          genre: "",
          rating: ""}
        )

    }

    
    return(
        <>
        <section>
            <Button size="sm" variant="secondary" onClick={() => history.goBack()}>← Kembali</Button>
            <h2>Tambahkan Entri</h2>
            <form onSubmit={handleSubmit} id="entry">
              <tbody>
                <tr>
                <td><label htmlFor="pic">Image URL: </label></td>
                <td><input type="text" id="pic" name="image_url" placeholder="URL" value={input.image_url} onChange={handleChange} /></td>
                </tr>
              <tr>
                <td><label htmlFor="title">Name: </label></td>
                <td><input type="text" id="title" name="title" placeholder="Jumanju" value={input.title} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td><label htmlFor="description">Description: </label></td>
                <td><textarea form="entry" id="description" name="description" placeholder="Tulis apa gitu di sini" value={input.description} onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor="review">Review: </label></td>
                <td><textarea form="entry" id="review" name="review" placeholder="Tulis apa gitu di sini" value={input.review} onChange={handleChange}/></td>
              </tr>
              <tr>
                <td><label htmlFor="year">Year: </label></td>
                <td><input type="number" id="year" name="year" placeholder="2009" value={input.year} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td><label htmlFor="duration">Duration (minutes): </label></td>
                <td><input type="number" id="duration" name="duration" placeholder="180" value={input.duration} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td><label htmlFor="genre">Genre: </label></td>
                <td><input type="text" id="genre" name="genre" placeholder="Action" value={input.genre} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td><label htmlFor="rating">Rating (out of 10): </label></td>
                <td><input type="number" id="rating" name="rating" placeholder="7" value={input.rating} onChange={handleChange} /></td>
              </tr>
              <tr>
                <Button type="submit">Submit</Button>
              </tr>
              </tbody>
              
            </form>
            
        </section>
        </>
    )
}

export default MovieCreate