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

  // for toggling tasks
  // you gotta edit the database no?

  const formHandler = async (e) => {
    e.preventDefault()
    const formatted = Utils.format(formData, goals.length)
    await axios.post('http://localhost:5100/add', formatted)
    //     .then(res => {
    //       setGoals(prevData => {
    //         return [...prevData, res.data]
    //       })
    // })
    .catch(err => console.error(err))
    setAddNew(false)
    setFormData(Utils.blankForm())
  }

  return (
    <div className="App">
      {goals.map(goal => (
        <Goal key={goal.id}
          id={goal.id} 
          name={goal.name}
          startDate={goal.startDate} 
          hours={goal.hours} 
          subtasks={goal.tasks}/>
      ))}
      <button className="newItem" value={addNew ? "-" : "+"} onClick={() => setAddNew(!addNew)}>Add Goal</button>

      {addNew ? <New 
        name={formData.name}
        startDate={formData.startDate}
        hours={formData.hours}
        update={updateForm}
        cancel={() => setAddNew(false)}
        onSubmit={formHandler}
      /> : null}
    </div>
  );
}

export default App;
