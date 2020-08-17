import React, {useContext, useEffect, useState} from "react";
import axios from "axios"
import {AuthContext} from '../components/authcontext'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { numberFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router'


const EditorGame = (props) => {
  const [dataGame, setDataGame] = useState(null)
  const [search, setSearch] = useState({query: ""})
  const history = useHistory()

  const handleSearch = (e) => {
    const {name, value} = e.target
    setSearch((prevState) => ({
      ...prevState, 
      [name]: value
    }))
  }

  const filtered = (
    search.query === "" 
    ? dataGame 
    : dataGame.filter(x => x.title.toLowerCase().includes(search.query.toLowerCase()))
  )

  const handleDelete = (e) => {
    let id = Number(e.target.value)
    let delGame = dataGame.filter( datum => datum.id !== id)

    axios
      .delete(` https://backendexample.sanbersy.com/api/games/${id}`)
      .then( res => console.log(res))
    setDataGame([...delGame])
  }

  // REACT TABLE
  const buttonFormatter = (cell, row) => {
    return(
    <>
    <Link to={`/edit/games/${row.id}`}><Button className="btnTable" variant="primary">Edit</Button></Link>
    <Button className="btnTable" onClick={handleDelete} value={row.id} variant="danger">Delete</Button>
    </>)
  ;
  }

  const selectOptions = {
    0: 'No',
    1: 'Yes'
  };

  const imgFormatter = (cell, row) => {
    return(<img style={{objectFit: "contain", width:"100px", height:"100px"}} src={row.image_url} />)
  }

  const boolFormatter = (cell, row) => {
      if (cell===1) {
          return("Yes")
      } else if (cell===0) {
          return("No") 
      } else {
          return cell
      }
  }

  const columnsGame = [{
    dataField: 'image_url',
    text: 'Image',
    formatter: imgFormatter
  }, {
    dataField: 'name',
    text: 'Name',
    sort: true
  }, {
    dataField: 'release',
    text: 'Release',
    sort: true,
    filter: numberFilter()
  }, {
    dataField: 'singlePlayer',
    text: 'Single Player?',
    sort: true,
    filter: multiSelectFilter({
        options: selectOptions
    }),
    formatter: boolFormatter
  }, {
    dataField: 'multiplayer',
    text: 'Multiplayer?',
    sort: true,
    filter: multiSelectFilter({
        options: selectOptions
    }),
    formatter: boolFormatter
  }, {
    dataField: 'button',
    text: 'Actions',
    formatter: buttonFormatter
  }];


  
  useEffect( ()=> {
    if (dataGame === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/games`)
        .then( res => {
          setDataGame(
            res.data.map(el => { 
              return {
              id: el.id,
              image_url : el.image_url,
              name: el.name,
              genre: el.genre,
              singlePlayer: el.singlePlayer,
              multiplayer: el.multiplayer,
              platform: el.platform,
              release: el.release,
              description: el.description,
              year: el.year,
              duration: el.duration,
              created: el.created_at,
              updated: el.updated_at
              }
            })
          )
        })
    }
  }) 

  return (
    
    <section>
        <Button onClick={() => history.push('/create/games')}>Tambahkan Game</Button>
        <Form.Control className="search" type="text" onChange={handleSearch} name="query" value={search.query} placeholder="Cari judul..." />
      {dataGame !== null &&  <BootstrapTable bootstrap4 keyField='id' data={ dataGame } columns={ columnsGame } filter={ filterFactory() }/>}
    </section>
 
    
  )
}

export default EditorGame;