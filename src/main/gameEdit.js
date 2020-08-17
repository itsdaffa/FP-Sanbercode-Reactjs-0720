import React ,{useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

import Button from 'react-bootstrap/Button'

const GameEdit = () => {
    let {id} = useParams()
    const [game, setGame] = useState(null)
    const [input, setInput] = useState("")
    const history = useHistory()

    useEffect ( () => {
        if (input === "") {
            axios.get(`https://backendexample.sanbersy.com/api/games/${id}`)
            .then( 
                res =>  {setInput({
                        image_url: res.data.image_url,
                        id: id,
                        name: res.data.name,
                        genre: res.data.genre,
                        singlePlayer: res.data.singlePlayer,
                        multiplayer: res.data.multiplayer,
                        platform: res.data.platform,
                        release: res.data.release,
                    })
                    }
                )
            .catch( err => console.log(err))
        }
        
    })



    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .put(`https://backendexample.sanbersy.com/api/games/${id}`, input)
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
                    <td><label htmlFor="name">Name: </label></td>
                    <td><input type="text" id="name" name="name" placeholder="Dota" value={input.name} onChange={handleChange} /></td>
                </tr>
                <tr>
                    <td><label htmlFor="genre">Genre: </label></td>
                    <td><input type="text" id="genre" name="genre" placeholder="RPG" value={input.genre} onChange={handleChange} /></td>
                </tr>
                <tr>
                    <td><label htmlFor="singlePlayer">Single Player: </label></td>
                    <td><select id="singlePlayer" name="singlePlayer" value={input.singlePlayer} onChange={handleChange}>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="multiplayer">Multiplayer: </label></td>
                    <td>
                        <select id="multiplayer" name="multiplayer" value={input.multiplayer} onChange={handleChange}>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </td>                
                </tr>
                <tr>
                    <td><label htmlFor="platform">Platform: </label></td>
                    <td><input type="text" id="platform" name="platform" placeholder="180" value={input.platform} onChange={handleChange} /></td>
                </tr>
                <tr>
                    <td><label htmlFor="release">Release: </label></td>
                    <td><input type="number" id="release" name="release" placeholder="2010" value={input.release} onChange={handleChange} /></td>
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

export default GameEdit