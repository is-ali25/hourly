import './App.css';
import Goal from './Components/Goal'
import GoalEdit from './Components/GoalEdit'
import New from './Components/New'
// import Test from './Components/Test'
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

  
  //for adding goals
  const formHandler = async (e) => {
    e.preventDefault()
    const formatted = Utils.format(formData, goals.length)
    await axios.post('http://localhost:5100/add', formatted)
    .catch(err => console.error(err))
    setAddNew(false)
    setFormData(Utils.blankForm())
  }

  //for adding tasks to goals
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
    await axios.put(`http://localhost:5100/task-update/${taskData.id}`, newTask)
    .then(res => res.data)
    .catch(err => console.error(err))
    //need to make component rerender
    setTaskData(prevData => {return {...prevData, "description": ""}})
  }
  
  //for editing tasks
  const startEdit = (id) => {
    setFormData(prevData => {
      let newData = prevData
      newData.id = id
      goals.forEach(goal => {
        if (goal._id === id.id) {
          newData.tasks = goal.tasks
        }
      })
      return newData
    })
    setEditReady(true)
  }

  const updateForm = (name, value, id) => {
    console.log(id)
    name == "tasks" ?
      setFormData(prevData => {
        let newTasks = prevData.tasks
        newTasks.forEach(task => {
          if (task._id == id) {
            task.description = value
          }
        })
        return {...prevData, "tasks": newTasks}
      })
    :
      setFormData(prevData => {return {...prevData, [name]: value }})
  }

  const updateGoal = async (e) => {
    e.preventDefault()
    console.log(formData)
    console.log(formData.id)
    await axios.put(`http://localhost:5100/goal-update/${formData.id.id}`, formData)
    .then(res => res.data)
    .catch(err => console.error(err))
    setEditReady(false)
  }

  // for toggling tasks

  //the actual app
  return (
    <div>
      <div className="App">
        {goals.map(goal => (
          editReady ? 
          <GoalEdit 
            key={goal._id}
            id={goal._id} 
            name={goal.name}
            startDate={goal.startDate.split("T")[0]} 
            hours={goal.hours} 
            subtasks={goal.tasks}
            update={updateForm}
            edit={updateGoal}
            cancel={() => setEditReady(false)}/>
            :
          <Goal 
            key={goal._id}
            id={goal._id} 
            name={goal.name}
            startDate={goal.startDate.split("T")[0]} 
            hours={goal.hours} 
            subtasks={goal.tasks}
            update={updateTaskForm}
            newTask={addTask}
            startEdit={startEdit}
          />
        ))}
      </div>
        
        <div className='addGoal'>
        <button className="newItem" onClick={() => setAddNew(!addNew)}>Add Goal</button>
        {addNew ? <New 
          name={formData.name}
          startDate={formData.startDate}
          hours={formData.hours}
          update={updateForm}           //arguments aere currently incompatible, but let's see if it still works
          cancel={() => setAddNew(false)}
          onSubmit={formHandler}
        /> : null}
        </div>
    
    </div>
  );
}

export default App;
