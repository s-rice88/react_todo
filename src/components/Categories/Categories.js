import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
//npm install axios - this package retrieves data from the api and makes other requests (Post, Push, Delete)
import axios from 'axios'
import SingleCategory from './SingleCategory'
//for create functionality, we need to check *who* the current user is (only admin can create), so we need use auth
import { useAuth } from '../../contexts/AuthContext'
import CatCreate from './CatCreate'

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the categories
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each category to the screen (also add any supplemental UI (table and thead)...combo of Categories and SingleCategory)

//Steps to Create functionality
//1. Create validationSchema and form specific to Categories
//2. import currentUser from the context
//3. Create a react hook to show/hide the form
//4. Create and render CatCreate in the conditonal rendering, based on whether the user is an admin or not
//5. Update the create functionality in CatForm.js

export default function Categories() {
    //hook to store the data returned from the API
    const [categories, setCategories] = useState([])

    //Below we write a function that makes our GET request to the API
    const getCategories = () => {
        axios.get(`https://localhost:7101/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }

    //Below we instantiate the currenUser object by setting its value to the useAuth()
    const {currentUser} = useAuth()
    //We also need a hook to show/hide the create form in this component
    const [showCreate, setShowCreate] = useState(false)

    //useEffect() will call our getCategories() function right when this component is mounted. the 1st param is a function (what to do)
    //2nd param is an array of objects that we can listen for (by default [] will run once as the component mounts in the virtual DOM)
    useEffect(() => {
        getCategories()
    }, [])

  return (
    <section className="categories">
        <article className="bg-secondary p-5">
            <h1 className="text-center">Categories Dashboard</h1>
        </article>
        
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <div className="bg-dark p-2 mb-3 text-center">
                {showCreate ?
                    <>
                        <button onClick={() => setShowCreate(false)} className='btn btn-warning'>Cancel</button>
                        <CatCreate getCategories={getCategories} setShowCreate={setShowCreate} />
                    </>
                :   <button className='btn btn-secondary' onClick={() => setShowCreate(true)}>Create Category</button>
                }
            </div>
        }

        <Container className='p-2'>
            <table className="table bg-secondary table-dark my-3">
                <thead className="table-secondary text-uppercase">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        {/* Edit/Delete column for our incons */}
                        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                            <th>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {categories.map(cat =>
                        //We add getCategories as a prop so we can call it from the SingleCategory component
                        <SingleCategory key={cat.categoryId} category={cat} getCategories={getCategories} />

                    )}
                </tbody>
            </table>
        </Container>
    </section>
  )
}
