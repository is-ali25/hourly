import GoalCSS from "./Goal.module.css"
import {FaTrash, FaPlusCircle, FaMinusCircle} from 'react-icons/fa'

const Goal = ({id, name, startDate, hours, increment, decrement, incomplete, taskComplete, complete, update, newTask, deleteGoal, deleteTask, startEdit, addtoActive}) => {
    return(
        <div id={id} className={GoalCSS.goal}>
            <h1>{name}</h1>
            <h4>Started: {startDate.split("-")[1]}/{startDate.split("-")[2]}/{startDate.split("-")[0]}</h4>
            <div className={GoalCSS.hours}>
                <button onClick={() => decrement(id)}><FaMinusCircle/></button>
                <h1>{parseFloat(hours).toFixed(2)}</h1>
                <button onClick={() => increment(id)}><FaPlusCircle/></button>
            </div>
        
            {incomplete && incomplete.map(task => ( 
                <div key={task._id} className={GoalCSS.task}>
                <input type="checkbox" onChange={() => taskComplete(task, id)}/>
                <label>{task.description}</label><br/>
                <button className="delete" onClick={() => deleteTask(task, id)}><FaTrash/></button>
                </div>
            ))}
            <form className={GoalCSS.addTaskForm} onSubmit={newTask}>
                <input id={id} className={GoalCSS.textInput} type="text" onChange= {(e) => update(e.target.value, id)}/> 
                <input type="submit" value="+"></input>
            </form> 
            {complete && complete.map(task => ( 
                //prolly wanna change the className this later
                <div key={task._id} className={GoalCSS.task}>
                    <input type="checkbox" onChange={() => taskComplete(task, id)}/>
                    <label>{task.description}</label><br/>
                    <button className="delete" onClick={() => deleteTask(task, id)}><FaTrash/></button>
                </div>
            ))}
            <div className={GoalCSS.goalButtons}>
                <button onClick={() => startEdit(id)}>Edit Goal</button>
                <button onClick={() => deleteGoal(id)}>Delete Goal</button>
                <button onClick={() => addtoActive(id)}>Add to Active List</button>
            </div>
        </div>
    )
}

export default Goal