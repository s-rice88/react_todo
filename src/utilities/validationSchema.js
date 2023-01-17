//This file will house the schemas for both todos and categories for create/edit form.
//To bring in a simple validation implementation, we are using Yup by installing it with npm.
//Yup will work in tandem with Formik, which is an npm package that creates and stores form
//inputs for each item (catName, catDesc) that we need in our form.

//remember we can install multiple npm packages by space-separating them in our npm install command
//npm install yup formik

/* This is what we need for our category POST (These are inputs we need in the form)
    {
        "catName": "Test",
        "catDesc": "Test description"
    }
*/
import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    //Below we call to each property we need to validate and use Yup to define the requirements (required, max length, etc.)
    catName: Yup.string().max(25, 'Max 25 characters').required('Required'),
    catDesc: Yup.string().max(100, 'Max 100 characters')
})

const todoSchema = Yup.object().shape({
    catName: Yup.string().max(25, 'Max 25 characters').required('Required'),
    catDesc: Yup.string().max(100, 'Max 100 characters'),
    categoryId: Yup.number().required('Required')
})

//Below we export catSchema as the default object for this file. Exporting as default will change the way we
//can import it in other files
export { todoSchema }
export default catSchema