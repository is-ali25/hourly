import React from "react"
import GoalEditCSS from "./GoalEdit.module.css"

const GoalEdit = ({id, name, startDate, hours, subtasks, update, edit, cancel}) => {
     return(
        <div className={GoalEditCSS.goalEdit}>
            <h1>{name}</h1>
            <h2>{parseFloat(hours).toFixed(2)}</h2>
            <form className={GoalEditCSS.taskEdit} onSubmit={edit}>
                <input className={GoalEditCSS.calendar} type="date" name="startDate" placeholder="Start Date" value={startDate} onChange= {(e) => update(e.target.name, e.target.value)}/>
                {subtasks.map(task => (
                    <input className={GoalEditCSS.taskInput} type="text" name="tasks" value={task.description} placeholder={task.description} onChange= {(e) => update(e.target.name, e.target.value, task._id)}/>
                ))}
                <input className={GoalEditCSS.submit} type="submit" placeholder="Submit"/>
            </form> 
            <button className={GoalEditCSS.cancel} onClick={cancel} >Cancel</button>
        </div>
    )
}

export default GoalEdit