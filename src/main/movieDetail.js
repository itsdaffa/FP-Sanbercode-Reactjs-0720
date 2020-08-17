import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useHistory} from 'react-router'
import axios from 'axios'


const MovieDetail = () => {
    let {id} = useParams()
    const [movie, setMovie] = useState(null)
    const history = useHistory()

    useEffect( () => {
        if (movie === null) {
            axios
            .get(`https://backendexample.sanbersy.com/api/movies/${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.log(err))
           }
    }

    )

    return (
        <>
            {movie !== null && (
                <section>
                    <img src={movie.image_url} />
                    <h1>{movie.title}</h1>
                    <h2>⭐{movie.rating}</h2>
                    <p>Genre: {movie.genre}</p>
                    <p>Tahun Release: {movie.year}</p>
                    <p>Durasi: {((movie.duration)/60).toFixed(2)} jam</p>
                    <p className="desc">Deskripsi: {movie.description}</p>
                    <p>Review: </p>
                    <p>{movie.review}</p>
                    <Button size="sm" type="secondary" onClick={() => history.goBack()}>Back</Button>
                </section>
            )}
       </>
    )
}

export default MovieDetail