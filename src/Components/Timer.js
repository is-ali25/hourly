import React from 'react'
import TimerCSS from './Timer.module.css'

const Timer = ({seconds, timerOn, startTimer, stopTimer, reset, addTime}) => {
    return(
        <div className={TimerCSS.timer}>
            <h1> {Math.floor(((seconds/3600)/10) % 6)}{(Math.floor(seconds/3600)) % 10}:{Math.floor(((seconds/60)/10) % 6)}{(Math.floor(seconds/60)) % 10}:{Math.floor(seconds/10) % 6}{seconds % 10}</h1>
            <div className={TimerCSS.timerButtons}>
                {!timerOn ? <button onClick={startTimer}>Start Timer</button>
                : <button onClick={stopTimer}>Pause Timer</button>}
                <br/>
                <button onClick={reset}>Reset Timer</button>
                <br/>
                <button onClick={addTime}>Submit Time</button>
            </div>
        </div>
    )
}

export default Timer