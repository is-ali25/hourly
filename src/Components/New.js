import NewCSS from './New.module.css'

const New = ({onSubmit, name, startDate, hours, update, cancel}) => {
    return(
        <div className={NewCSS.new}>
            <form className={NewCSS.newGoalForm} onSubmit={e => {onSubmit(e)}}>
                <input className={NewCSS.name} type="text" name="name" placeholder="Name" value={name} onChange= {(e) => update(e.target.name, e.target.value)}/>
                <input className={NewCSS.calendar} type="date" name="startDate" placeholder="Start Date" value={startDate} onChange= {(e) => update(e.target.name, e.target.value)}/>
                <input className={NewCSS.hours} type="number" name="hours" placeholder="Hours" min="0" value={hours} onChange= {(e) => update(e.target.name, e.target.value)}/>
                <input className={NewCSS.submit} type="submit" placeholder="Submit"/>
                <button className={NewCSS.cancel} onClick={cancel}>Cancel</button>
            </form>
        </div>
    )
}

export default New