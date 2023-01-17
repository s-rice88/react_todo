import React from 'react'
import { Formik, Form, Field } from 'formik' //This will produce the form for creating/editing a category
import catSchema from '../../utilities/validationSchema'
import axios from 'axios'

export default function CatForm(props) {
  const handleSubmit = (values) => {
    console.log(values)
    if (!props.category) {
      //everything in this scope will be create logic, since no props.category exists
      const catToCreate = values//temp object to send in our POST request

      //Below, use axios to make the POST request to the API
      axios.post(`https://localhost:7101/api/Categories`, catToCreate).then(() => {
        props.setShowCreate(false)//this will close the create form via the callback function
        props.getCategories()//this will make a GET request to our API and add the new cat to our table
      })
    }
    else {
        //everything in this scope will be edit logic, since we *do* have a props.category
        const catToEdit = {
            categoryId: props.category.categoryId,
            catName: values.catName,
            catDesc: values.catDesc
        }

        axios.put(`https://localhost:7101/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
            props.setShowEdit(false)
            props.getCategories()
        })
    }
  }

  return (
    <div className='createCategory m-2 text-white text-center'>
      <Formik
        initialValues={{
          //Below is a ternary operator that makes our form behave differently based on whether we have a prop
          //called "category" (if the prop exists, we are editing the category)
          catName: props.category ? props.category.catName : '',
          catDesc: props.category ? props.category.catDesc : '',
        }}
        validationSchema={catSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(errors, touched) => (
          //we will build our form below, passing in the errors and touched objects to it
          <Form id='catForm' className='row text-center m-auto'>
            <div className='form-group m-1 p-1'>
              <Field name='catName' className='form-control' placeholder='Name' />
              {errors.catName && touched.catName ? <div className='text-danger'>{errors.catName}</div> : null}
            </div>
            <div className='form-group m-1 p-1'>
              <Field name='catDesc' className='form-control' placeholder='Description' />
              {errors.catDesc && touched.catDesc ? (
                <div className='text-danger'>{errors.catDesc}</div>
              ) : null}
            </div>
            <div className='form-group m-1'>
              <button type='submit' className='btn btn-success'>
                Submit Category to API
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
