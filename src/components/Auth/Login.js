import React from 'react'
//below we import useAuth from our AuthContext in order to access the login() function
//useAuth() is the function we want to import any time we need currentUser, login() or logout()
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'



export default function Login() {

    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleAuth() {
        //Await keyword will pause any more code from executing until we get a response back from firebase
        await login()

        //return the user to a specific location using useNavigate from react-router-dom
        return navigate('/')
    }



  return (
    <div className='login'>
        <article className="bg-secondary mb-5 p-5 text-dark">
            <h1 className="text-center">Welcome to ToDos!</h1>
        </article>
        <Container>
            <Card className='m-2 border-dark text-center'>
                <Card.Header className='bg-dark text-white'>
                    <h2>Login for full functionality</h2>
                </Card.Header>
                <Card.Body>
                    <button className="btn btn-success" onClick={() => handleAuth()}>
                        Login w/ Github
                    </button>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}
