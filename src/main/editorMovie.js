import React, {useContext, useEffect, useState} from "react";
import axios from "axios"
import {AuthContext} from '../components/authcontext'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { numberFilter } from 'react-bootstrap-table2-filter';
import {useHistory} from 'react-router'



import {Link} from 'react-router-dom'


const Editor = (props) => {
  const [dataFilm, setDataFilm] = useState(null)
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
    ? dataFilm 
    : dataFilm.filter(x => x.title.toLowerCase().includes(search.query.toLowerCase()))
  )
  
  const handleDelete = (e) => {
    let id = Number(e.target.value)
    let delFilm = dataFilm.filter( datum => datum.id !== id)

    axios
      .delete(` https://backendexample.sanbersy.com/api/movies/${id}`)
      .then( res => console.log(res))
    setDataFilm([...delFilm])
  }

  // REACT TABLE
  const buttonFormatter = (cell, row) => {
    return(<>
    <Link to={`/edit/movies/${row.id}`}><Button className="btnTable" variant="primary">Edit</Button></Link>
    <Button className="btnTable" onClick={handleDelete} value={row.id} variant="danger">Delete</Button>
    </>)
  ;
  }

  const imgFormatter = (cell, row) => {
    return(<img style={{objectFit: "contain", width:"100px", height:"100px"}} src={row.pic} />)
  }

  const textFormatter = (cell, row) => {
    return(row.description !== null && row.description.length > 50 ? `${row.description.substring(0,50)}...` : row.description)
  }

  const columnsFilm = [{
    dataField: 'pic',
    text: 'Image',
    formatter: imgFormatter
  }, {
    dataField: 'title',
    text: 'Name',
    sort: true
  }, {
    dataField: 'year',
    text: 'Year',
    sort: true,
    filter: numberFilter()
  }, {
    dataField: 'duration',
    text: 'Duration',
    sort: true,
    filter: numberFilter()
  }, {
    dataField: 'genre',
    text: 'Genre',
    sort: true
  }, {
    dataField: 'rating',
    text: 'Rating',
    sort: true,
    filter: numberFilter()
  }, {
    dataField: 'description',
    text: 'Description',
    formatter: textFormatter
  }, {
    dataField: 'button',
    text: 'Actions',
    formatter: buttonFormatter
  }];

  
  useEffect( ()=> {
    if (dataFilm === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/movies`)
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
  }) 

  return (

    <section>
      <Button onClick={() => history.push('/create/movies')}>Tambahkan Film </Button>
      <Form.Control className="search" type="text" onChange={handleSearch} name="query" value={search.query} placeholder="Cari judul..." />
      {dataFilm !== null &&  <BootstrapTable bootstrap4 keyField='id' data={filtered} columns={ columnsFilm } filter={ filterFactory() }/>}
    </section>

  )

};

export default Editor;
