const Goal = ({id, name, startDate, hours, subtasks, taskComplete, update, newTask, startEdit}) => {
    return(
        <div className="goal">
            <h1>{name}</h1>
            <h4>{startDate}</h4>
            <h2>{hours}</h2>
            {subtasks.map(task => ( 
                <div key={task.description.length}>
                    <input type="checkbox" id={task.description.length} onChange={taskComplete}/>
                    <label>{task.description}</label><br/>
                </div>
            ))}
            <form onSubmit={newTask}>
                <input type="text" onChange= {(e) => update(e.target.value, id)}/>
                <input type="submit" value="Add Task"/>
            </form> 
            <button onClick={startEdit}>Edit</button>
        </div>
    )
}

export default Goal