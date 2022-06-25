const Goal = ({id, name, startDate, hours, subtasks, taskComplete, newTask}) => {
    return(
        <div className="goal">
            <h1>{name}</h1>
            <h4>{startDate}</h4>
            <h2>{hours}</h2>
            <div>
                {subtasks.map(task => (
                    <div>
                        <input type="checkbox" id={id} onChange={taskComplete}/>
                        <label for={id}>{task.description}</label><br/>
                    </div>
                ))}
                <button onClick={newTask}>Add Task</button>
            </div>
        </div>
    )
}

export default Goal