import './App.css';
import Goal from './Components/Goal'
import GoalEdit from './Components/GoalEdit'
import New from './Components/New'
import Test from './Components/Test'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as Utils from './utils'
import './App.css'

function App() {
  const [goals, setGoals] = useState([])
  const [addNew, setAddNew] = useState(false)
  const [editReady, setEditReady] = useState(false)
  const [taskData, setTaskData] = useState({})
  const [formData, setFormData] = useState(Utils.blankForm())

  //retrieve goals from database
  useEffect(() => {
    async function start() {
      await axios.get('http://localhost:5100/')
      .then(res => {
        // console.log(res.data)
        const cleaned = res.data.map(item => Utils.convertToGoal(item))
        console.log(cleaned)
        setGoals(cleaned)
      })
      .catch(err => console.error(err))
    }

    start()
  }, [])

  console.log(goals)

   const updateForm = (name, value) => {
    setFormData(prevData => {return {...prevData, [name]: value }})
  }

   const updateTaskForm = (value, id) => {
    setTaskData({"id": id, "description": value })
  }

  const addTask = async (e) => {
    e.preventDefault()
    console.log(taskData.id)
    const newTask = {
      description: taskData.description,
      completed: false
    }
    await axios.put(`http://localhost:5100/update/${taskData.id}`, newTask)
    .then(res => res.data)
    .catch(err => console.error(err))
    //need to make component rerender
    setTaskData(prevData => {return {...prevData, "description": ""}})
  }

  const updateTasks = async (e) => {
    e.preventDefault()
    console.log(e.target.value)
    // console.log("update begun")
    // await axios.put('http://localhost:5100/0', formatted)
    // .catch(err => console.error(err))
    setEditReady(false)
  }

  // for toggling tasks
  // you gotta edit the database no?

  const formHandler = async (e) => {
    e.preventDefault()
    const formatted = Utils.format(formData, goals.length)
    await axios.post('http://localhost:5100/add', formatted)
    .catch(err => console.error(err))
    setAddNew(false)
    setFormData(Utils.blankForm())
  }

  return (
    <div>
      <div className="App">
        {goals.map(goal => (
          editReady == true ? 
          <GoalEdit 
            key={goal.id}
            name={goal.name}
            startDate={goal.startDate} 
            hours={goal.hours} 
            subtasks={goal.tasks}
            update={updateForm}
            editTasks={updateTasks}/>
            :
          <Goal 
            key={goal.id}
            id={goal.id} 
            name={goal.name}
            startDate={goal.startDate} 
            hours={goal.hours} 
            subtasks={goal.tasks}
            update={updateTaskForm}
            newTask={addTask}
            startEdit={() => setEditReady(true)}
          />
        ))}
      </div>
        
        <div className='addGoal'>
        <button className="newItem" onClick={() => setAddNew(!addNew)}>Add Goal</button>
        {addNew ? <New 
          name={formData.name}
          startDate={formData.startDate}
          hours={formData.hours}
          update={updateForm}
          cancel={() => setAddNew(false)}
          onSubmit={formHandler}
        /> : null}
        </div>
    
    </div>
  );
}

export default App;
