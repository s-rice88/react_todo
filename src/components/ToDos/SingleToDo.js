import React, { useState } from 'react'
import { useAuth} from '../../contexts/AuthContext'
import ToDoEdit from './ToDoEdit'
import axios from 'axios'

//React icons imported below
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

export default function SingleToDo(props) {
  const { currentUser } = useAuth()
  //Create a hook that will open/close the Edit modal
  const [showEdit, setShowEdit] = useState(false)
  
  const deleteToDo = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.todo.name}?`)) {
      axios.delete(`https://localhost:7239/api/ToDoes/${id}`).then(() => {props.getToDos()})
    }
  }

  return (
    <div className='singleToDo col-md-5 m-4'>
      {/* {Edit and delete UI conditionally rendered below */}
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div>
          <button id='editLink' onClick={() => setShowEdit(true)}>
            <FaEdit />
          </button>
          <button id='deleteLink' onClick={() => deleteToDo(props.ToDo.toDoId)}>
            <FaTrashAlt />
          </button>
          {showEdit &&
            <ToDoEdit
              todo={props.todo}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getToDos={props.getToDos} />
          }
        </div>
      }
        <h3>{props.todo.name}</h3>
        
    </div>
  )
}
