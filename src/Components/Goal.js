const Goal = ({id, name, startDate, hours, increment, decrement, subtasks, taskComplete, update, newTask, deleteGoal, deleteTask, startEdit}) => {
    return(
        <div className="goal">
            <h1>{name}</h1>
            <h4>{startDate}</h4>
            <div className="hours">
                <button onClick={() => increment(id)}>+</button>
                <h2>{hours}</h2>
                <button onClick={() => decrement(id)}>-</button>
            </div>
        
            {subtasks.map(task => ( 
                task.completed ?
                <div key={task._id}>
                    <input type="checkbox" checked onChange={() => taskComplete(task, id)}/>
                    <label>{task.description}</label><br/>
                </div>
                    :
                <div key={task._id}>
                    <input type="checkbox" onChange={() => taskComplete(task, id)}/>
                    <label>{task.description}</label><br/>
                    <button className="delete" onClick={() => deleteTask(task, id)}>Delete Task</button>
                </div>
            ))}
            <form onSubmit={newTask}>
                <input type="text" onChange= {(e) => update(e.target.value, id)}/>
                <input type="submit" value="Add Task"/>
            </form> 
            <button onClick={() => startEdit({id})}>Edit Goal</button>
            <button onClick={() => deleteGoal({id})}>Delete Goal</button>
        </div>
    )
}

export default Goal