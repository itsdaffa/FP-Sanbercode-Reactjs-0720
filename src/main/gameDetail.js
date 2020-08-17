import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'



const GameDetail = () => {
    let {id} = useParams()
    const [game, setGame] = useState(null)

    useEffect( () => {
        if (game === null) {
            axios
            .get(`https://backendexample.sanbersy.com/api/games/${id}`)
            .then((res) => setGame(res.data))
            .catch((err) => console.log(err))
           }
    }

    )

    return (
        <>
            {game !== null && (
                <section>
                    <img src={game.image_url} />
                    <h1 style={{textAlign: "left"}}>{game.name}</h1>
                    <p>Genre: {game.genre}</p>
                    <p>Single Player: {game.singlePlayer === 1 ? "✅" : "❌"}</p>
                    <p>Multiplayer: {game.multiplayer === 1 ? "✅" : "❌"}</p>
                    <p>Platform: {game.platform}</p>
                    <p>Release: {game.release}</p>
                    <Link to="/games"><Button >Back</Button></Link>
                </section>

            )}
       </>
    )
}

export default GameDetail