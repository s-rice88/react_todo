import React, { useState, useEffect } from 'react'
import {Formik, Field, Form} from 'formik'
import { todoSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function ToDoForm(props) {
    //We need to get categories from the API to populate the dropdown list of categories
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        //below we don't log the response, we just save the response.data to our hook
        axios.get(`https://localhost:7101/api/Categories`).then(response => setCategories(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.todo){
            //Everything in this scope will be create logic since there is no props.todo
            const todoToCreate = values;
            axios.post(`https://localhost:7101/api/ToDoes`, todoToCreate).then(() => {
                props.getToDos()//called to update the todos and display the newest one
                props.setShowCreate(false)//called to close the create form
            })
        }
        else {
            //Everything in this scope will be edit logic since there *is* a props.todo
            const todoToEdit = {
                todoId: props.todo.ToDoId,
                name: values.name,
                categoryId: values.categoryId
            }

            axios.put(`https://localhost:7239/api/ToDoes/${props.todo.toDoId}`, todoToEdit).then(() => {
                props.getToDos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

  return (
    <Formik
        initialValues={{
            catName: props.todo ? props.todo.catName : '',
            catDesc: props.todo ? props.todo.catDesc : '',
            categoryId: props.todo ? props.todo.categoryId : ''
        }}
        validationSchema={todoSchema}
        onSubmit={(values) => handleSubmit(values)}>
        {({errors, touched}) => (
            <Form id='todoForm'>
                <div className='form-group m-3'>
                    <Field name='name' className='form-control' placeholder='Name' />
                    {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
                    ) : null}
                </div>
                {/* <div className='form-group m-3'>
                    <Field name='description' as='textarea' className='form-control' placeholder='Description' style={{resize: 'none', height: '5em'}} />
                    {errors.catDesc && touched.catDesc ? (
                        <div className='text-danger'>{errors.catDesc}</div>
                    ) : null}
                </div> */}
                <div className='form-group m-3'>
                    <Field name='categoryId' as='select' className='form-control'>
                        {/* Below we will map an option tag for every category in the API
                            We also will hard code a disabled option as a user prompt */}
                        <option value='' disabled>[--Please Choose--]</option>
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>
                        )}
                    </Field>
                </div>
                <div className='form-group m-3'>
                    <button type='submit' className='btn btn-secondary m-3'>Submit ToDo to API</button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
