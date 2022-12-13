//styles
import './App.css'

//componenets
import Goal from './Components/Goal'
import GoalEdit from './Components/GoalEdit'
import New from './Components/New'
import Timer from './Components/Timer'
// import Test from './Components/Test'

//dependencies and external libraries
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as Utils from './utils'

function App() {
  const [goals, setGoals] = useState([])

    //determines if the form to add a new goal will be displayed
  const [addNew, setAddNew] = useState(false)

    //includes goals which are editable
  const [editReady, setEditReady] = useState([])

    //used to keep track of the info related to a particular task the user is editing
  const [taskData, setTaskData] = useState({})

    //contains the completed and uncompleted tasks for each goal
  const [complete, setComplete] = useState({})
  const [incomplete, setIncomplete] = useState({})

    //data used for post requests
  const [formData, setFormData] = useState(Utils.blankForm())

    //determines if the timer is active or not
  const [timerOn, setTimerOn] = useState(false)

    //used to display the values on the timer
  const [seconds, setSeconds] = useState(0)

    //contains the goals whose hours will be modified according to the value of the timer
  const [active, setActive] = useState([])



  //retrieve goals from database
  useEffect(() => {
    async function start() {
      await axios.get('http://localhost:5100/')
      .then(res => {
        // console.log(res.data)
        const cleaned = res.data.map(item => Utils.convertToGoal(item))
        setGoals(cleaned)

        cleaned.forEach(goal => {               //have to use cleaned cuz it won't work when I used goals instead
          const goalId = goal.id;
          setComplete(prevData => {
            return {...prevData, [goalId]: []}
          })
          setIncomplete(prevData => {
            return {...prevData, [goalId]: []}
          })
        })

        cleaned.forEach(goal => {
          goal.tasks.forEach(task => {
            if (task.completed) {
              setComplete(prevData => {
                const goalId = goal.id
                let newCompletes = prevData[goalId]
                newCompletes.push(task)
                return {...prevData, goalId: newCompletes}
              })
            } else {
              setIncomplete(prevData => {
                const goalId = goal.id
                let newIncompletes = prevData[goalId]
                newIncompletes.push(task)
                return {...prevData, goalId: newIncompletes}
              })
            }
          })
        })
      })
      .catch(err => console.error(err))
    }

    start()

    //cleanup function
    // return () => {
    //   goals.forEach(goal => {
    //     const newHours = goal.hours
    //     axios.put(`http://localhost:5100/update-hours/${goal.id}`, newHours)
    //   .then(res => res.data)
    //   .catch(err => console.error(err))
    //   })
    // }
  }, [])

  // console.log(goals)
  // console.log(complete)
  // console.log(incomplete)

  
  //for adding goals
  const formHandler = async (e) => {
    e.preventDefault()
    const formatted = Utils.format(formData, goals.length)
    await axios.post('http://localhost:5100/add', formatted)
    .catch(err => console.error(err))
    setAddNew(false)
    setFormData(Utils.blankForm())
    setGoals(prevData => [...prevData, formatted])
  }

  //for adding tasks to goals
  const updateTaskForm = (value, id) => {
    setTaskData({"id": id, "description": value, "completed": false})
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

    setGoals(prevData => {
      let goals = prevData
      goals.forEach(goal => {
        if (goal.id === taskData.id && !(goal.tasks.includes(newTask))) { //adds new task to list twice w/o the second condition. Need to find out why
          goal.tasks.push(newTask)
        }
      })
      return goals
    })

    document.getElementById(taskData.id).value = ""
    setTaskData(prevData => {return {...prevData, "description": ""}})
  }
  
  //for editing and deleting tasks
  const toggleBox = async (task, id) => {
    console.log(id)
    await axios.put(`http://localhost:5100/toggle/${id}`, task)
    .then(res => res.data)
    .catch(err => console.error(err))
  }

  const deleteTask = async (task, id) => {
    console.log(task)
    await axios.put(`http://localhost:5100/delete-task/${id}`, task)
    .then(res => res.data)
    .catch(err => console.error(err))

    setGoals(prevData => {
      let goals = [...prevData]
      goals.forEach(goal => {
        if (goal.id === id) {
          goal.tasks = goal.tasks.filter(item => {
            return item.description !== task.description
          })
        }
      })
      return goals
    })
  }

  const startEdit = (id) => {
    console.log(id)
    setFormData(prevData => {
      let newData = prevData
      newData.id = id
      goals.forEach(goal => {
        if (goal.id === id) {
          newData.tasks = goal.tasks
        }
      })
      return newData
    })
    setEditReady(prevData => [...prevData, id])
  }

  const cancelEdit = (id) => {
    console.log(id)
    setEditReady(prevData => {
      const a = [...prevData].filter(curr => {return curr !== id})
      return a
    })
  }

  const updateForm = (name, value, id) => {
    console.log(id)
    name === "tasks" ?
      setFormData(prevData => {
        let newTasks = prevData.tasks
        newTasks.forEach(task => {
          if (task._id === id) {
            task.description = value
          }
        })
        return {...prevData, "tasks": newTasks}
      })
    :
      setFormData(prevData => {return {...prevData, [name]: value }})
  }

  const incrementHour = async (id) => {
    console.log(id)
    await axios.put(`http://localhost:5100/increment/${id}`)
    .then(res => res.data)
    .catch(err => console.error(err))
    setGoals(prevData => {
      let goals = [...prevData]
      goals.forEach((goal) => {
        console.log(goal.id)
          if (goal.id === id) {
            console.log("found goal to increment")
            goal.hours++
          }
      })
      return goals
    })
  }

  const decrementHour = async (id) => {
    await axios.put(`http://localhost:5100/decrement/${id}`)
    .then(res => res.data)
    .catch(err => console.error(err))
    setGoals(prevData => {
      let newGoals = [...prevData]
      goals.forEach((goal) => {
        console.log(goal.id)
          if (goal.id === id) {
            console.log("found goal to decrement")
            goal.hours--
          }
      })
      return newGoals
    })
  }
  
  //for editing and deleting goals
  const updateGoal = async (e) => {
    e.preventDefault()
    console.log(formData)
    console.log(formData.id)
    await axios.put(`http://localhost:5100/goal-update/${formData.id}`, formData)
    .then(res => res.data)
    .catch(err => console.error(err))
    setEditReady(prevData => {
      const a = [...prevData].filter(curr => {return curr !== formData.id})
      return a
    })
  }

  const deleteGoal = async (id) => {
    console.log(id)
    await axios.delete(`http://localhost:5100/delete-goal/${id}`)
    .then(res => res.data)
    .catch(err => console.error(err))
    setGoals(goals.filter(goal => goal.id !== id))
  }

  const addtoActive = (id) => {
    if (!active.includes(id)) {
      setActive(prevData => [...prevData, id])
      document.getElementById(id).style.backgroundColor = "#AB90ff"
    } else {
      setActive(prevData => {
        let a = [...prevData].filter(curr => curr !== id)
        return a
      })
      document.getElementById(id).style.backgroundColor = "rgba(153, 249, 217, 0.896)"
    }
  }

  //for starting, stopping, and changing data with the timer
  const startTimer = () => {
    setTimerOn(true)
  }

  useEffect(() => {
    let intervalId = null;
    if (timerOn) {
      intervalId = setInterval(() => {
        setSeconds(seconds => seconds + 1)
        }, 1000)
    } else {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [timerOn])

  const stopTimer = () => {
    setTimerOn(false)
  }

  const resetTimer = () => {
    setSeconds(0)
  }

  const addTime = () => {
    active.forEach(id => {
      const data = {id: id, time: seconds}
      axios.put(`http://localhost:5100/addTime/${id}`, data)
      .then(res => res.data)
      .catch(err => console.error(err))

      setGoals(prevData => {
        const goals = prevData.map((goal) => {
            if (goal.id === id) {
              console.log("found goal to increment")
              goal.hours += (seconds/3600)
            }
            return goal
        })
        return goals
      })
    })
  }

  //redundant?
  const addtoComplete = (task, goalId) => {
    console.log(goalId)
    console.log(`adding task to ${goalId} completed list`)
    setComplete(prevData => {
      let newCompletes = prevData[goalId]
      newCompletes.push(task)
      return {...prevData, goalId: newCompletes}
    })
  }

  //the actual app
  return (
    <div>
      {addNew ? 
      <div className='filter'></div>
      : null}

      <Timer seconds={seconds} timerOn={timerOn} startTimer={startTimer} stopTimer={stopTimer} reset={resetTimer} addTime={addTime}/>
      <div className="App">
        {goals.map(goal => (
          editReady.includes(goal.id) ? 
          <GoalEdit 
            key={goal.id}
            id={goal.id} 
            name={goal.name}
            startDate={goal.startDate.split("T")[0]} 
            hours={goal.hours} 
            subtasks={goal.tasks}
            update={updateForm}
            edit={updateGoal}
            cancel={() => cancelEdit(goal.id)}/>
            :
          <Goal 
            key={goal.id}
            id={goal.id} 
            name={goal.name}
            startDate={goal.startDate.split("T")[0]} 
            hours={goal.hours} 
            incomplete={incomplete[goal.id]}
            taskComplete={toggleBox}
            complete={complete[goal.id]}
            update={updateTaskForm}
            newTask={addTask}
            increment={incrementHour}
            decrement={decrementHour}
            deleteTask={deleteTask}
            deleteGoal={deleteGoal}
            startEdit={startEdit}
            addtoActive={addtoActive}
          />
        ))}
      </div>
        
        {/* <div className='addGoal'> */}
        <button className='addGoalButton' onClick={() => setAddNew(!addNew)}>Add Goal</button>
        {addNew ? <New 
          name={formData.name}
          startDate={formData.startDate}
          hours={formData.hours}
          update={updateForm}  
          cancel={() => setAddNew(false)}
          onSubmit={formHandler}
        /> : null}
        {/* </div> */}
    
    </div>
  );
}

export default App;
