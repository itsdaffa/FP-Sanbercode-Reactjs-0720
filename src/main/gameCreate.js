import React, {useState} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router'


const GameCreate = () => {
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
        .post(`https://backendexample.sanbersy.com/api/games`, input)
        .then(res => { console.log(res)  
          alert("Berhasil menambahkan game!")
        })
        
        setInput("")

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
                            <option selected value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="multiplayer">Multiplayer: </label></td>
                    <td>
                        <select id="multiplayer" name="multiplayer" value={input.multiplayer} onChange={handleChange}>
                            <option selected value="1">Yes</option>
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
        </>
    )
}

export default GameCreate