import React ,{useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

import Button from 'react-bootstrap/Button'

const MovieEdit = () => {
    let {id} = useParams()
    const [movie, setMovie] = useState(null)
    const [input, setInput] = useState("")
    const history = useHistory()

    useEffect ( () => {
        if (input === "") {
            axios.get(`https://backendexample.sanbersy.com/api/movies/${id}`)
            .then( 
                res =>  {setInput({
                        image_url: res.data.image_url,
                        id: id,
                        title: res.data.title,
                        rating: res.data.rating,
                        description: res.data.description,
                        year: res.data.year,
                        duration: res.data.duration,
                        genre: res.data.genre,
                        review: res.data.review
                    })
                    }
                )
            .catch( err => console.log(err))
        }
        
    })



    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .put(`https://backendexample.sanbersy.com/api/movies/${id}`, input)
        .then(res => {
            console.log(res)
            history.goBack()
        })
        .catch(err => console.log(err) )
        
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setInput( (prevState) => ({
          ...prevState,
          [name] : value
        }))
      }

    
    return (
        <section>
            <h2>Edit Entri</h2>
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
                <br />
                <tr>
                    <td><label htmlFor="description">Description: </label></td>
                    <td><textarea form="entry" name="description" placeholder="Tulis apa gitu di sini" value={input.description} onChange={handleChange}/></td>
                </tr>
                <tr>
                <td><label htmlFor="review">Review: </label></td>
                <td><textarea form="entry" name="review" placeholder="Tulis apa gitu di sini" value={input.review} onChange={handleChange}/></td>    
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
                    <Button type="submit">Submit</Button>
                </tr>
                </tbody>
          
        </form>
      </section>
    )

}

export default MovieEdit