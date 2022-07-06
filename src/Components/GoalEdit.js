import React from "react"

const GoalEdit = ({id, name, startDate, hours, subtasks, update, edit, cancel}) => {
     return(
        <div className="goalEdit">
            <h1>{name}</h1>
            <h4>{startDate}</h4>
            <h2>{hours}</h2>
            <form onSubmit={edit}>
                {subtasks.map(task => (
                    <div key={task._id}>
                        <input type="text" name="tasks" value={task.description} placeholder={task.description} onChange= {(e) => update(e.target.name, e.target.value, task._id)}/>
                        <br/>
                    </div>
                ))}
                <input type="submit" placeholder="Submit"/>
            </form> 
            <button onClick={cancel} >Cancel</button>
        </div>
    )
}

export default GoalEdit