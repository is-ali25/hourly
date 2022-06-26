const New = ({onSubmit, name, startDate, hours, update, cancel}) => {
    return(
        <div>
            <form onSubmit={e => {onSubmit(e)}}>
            <input type="text" name="name" placeholder="Name" value={name} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="date" name="startDate" placeholder="Start Date" value={startDate} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="number" name="hours" placeholder="Hours" min="0" value={hours} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="submit" placeholder="Submit"/>
            <button onClick={cancel}>Cancel</button>
            </form>
        </div>
    )
}

export default New