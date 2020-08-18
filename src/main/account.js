import React, { useContext, useState } from 'react';
import {AuthContext} from '../components/authcontext'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const Account = () => {
    const [user, setUser] = useContext(AuthContext)
    const [input, setInput] = useState({oldpass:"", password: ""})
    const handleSubmit = e => {
        e.preventDefault()
        if(input.oldpass === user.password) {
            axios.put(`https://backendexample.sanbersy.com/api/users/${user.id}`, {...user, password: input.password})
            .then( res => { console.log(res)
            if (res.data.id) {
                setUser({
                    id: res.data.id,
                    username: res.data.username,
                    password: res.data.password
                })
                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data)
                )
                alert("Yayyy, berhasil ganti password!")
            }
            })
            .catch( err => console.log(err))
            setInput({oldpass:"", password: ""})
            
        } else {
            alert("Maaf, password salah")
        }
}
      
      const handleChange = e => {
            setInput(
                {...input,[e.target.name]:e.target.value}
              )
      }

    return(
        <>
        <section>
            <h1 style={{textAlign: "left"}}>Hai, {user.username}!</h1>
            <h2 style={{marginTop: "50px"}}>Ganti Password</h2>
            
            <Form onSubmit={handleSubmit} style={{width: "50%"}}>
                <Form.Group controlID="oldpass">
                    <Form.Label>Old Password:</Form.Label>
                    <Form.Control type="text" name="oldpass" value={input.oldpass} onChange={handleChange} placeholder="Enter old password" />
                </Form.Group>

            <Form.Group controlId="newpass">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="text" name="password" value={input.password} onChange={handleChange} placeholder="Enter new password"  />
            </Form.Group>
            <Button variant="primary" type="submit"> Change Password </Button>
            </Form>
        </section>
        </>
    )
}

export default Account;