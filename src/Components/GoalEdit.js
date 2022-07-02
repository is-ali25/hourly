const Goal = ({name, startDate, hours, subtasks, update, editTasks}) => {
    return(
        <div className="goal">
            <h1>{name}</h1>
            <h4>{startDate}</h4>
            <h2>{hours}</h2>
            <form onSubmit={e => {editTasks(e)}}>
                {subtasks.map(task => ( 
                    <input key={task.description} type="text" name="name" value={task.description} onChange= {(e) => update(e.target.name, e.target.value)}/>
                ))}
                <input type="submit" placeholder="Submit"/>
            </form> 
        </div>
    )
}

export default Goal