const New = ({onSubmit, name, description, startDate, hours, update, cancel}) => {
    return(
        <div>
            <form onSubmit={e => {onSubmit(e)}}>
            <input type="text" name="name" placeholder="name" value={name} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <textarea type="text-area" name="description" placeholder="description" value={description} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="text" name="startDate" placeholder="startDate" value={startDate} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="text" name="hours" placeholder="hours" value={hours} onChange= {(e) => update(e.target.name, e.target.value)}/>
            <input type="submit" placeholder="Submit"/>
            <button onClick={cancel}>Cancel</button>
            </form>
        </div>
    )
}

export default New