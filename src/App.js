import './App.css';
import Goal from './Components/Goal'
import New from './Components/New'
import Test from './Components/Test'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as Utils from './utils'

function App() {
  const [goals, setGoals] = useState([])
  const [addNew, setAddNew] = useState(false)
  const [formData, setFormData] = useState(Utils.blankForm())

  //retrieve goals from database
  useEffect(() => {
    async function start() {
      await axios.get('http://localhost:5100/')
      .then(res => {
        console.log(res.data)
        setGoals(res.data)
      })
      .catch(err => console.error(err))
    }

    start()
  }, [])

   const updateForm = (name, value) => {
    setFormData(prevData => {return {...prevData, [name]: value }})
  }

  // for toggling tasks
  // you gotta edit the database no?


  const formHandler = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5100/add', formData)
        .then(res => {
          setGoals(prevData => {
            return [...prevData, Utils.formToGoal(res.data)]
          })
    }).catch(err => console.error(err))
    setAddNew(false)
    setFormData(Utils.blankForm())
  }

  return (
    <div className="App">
      {goals.map(goal => (
        <Goal 
          id={goal.id} 
          name={goal.name} 
          startDate={goal.startDate} 
          hours={goal.hours} 
          subtasks={goal.tasks}/>
      ))}
      <button className="newItem" onClick={() => setAddNew(!addNew)}>+</button>

      <Test/>

      {addNew ? <New 
        name={formData.name}
        startDate={formData.startDate}
        hours={formData.hours}
        update={updateForm}
        cancel={() => setAddNew(false)}
        onSubmit={formHandler}
      /> : <></>}
    </div>
  );
}

export default App;
