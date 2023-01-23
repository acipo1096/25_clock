import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'


const SessionTimer = () => {
    const [sessionMinutes, setSessionMinutes] = useState(25);
    const [sessionSeconds, setSessionSeconds] = useState(60);
    const [timerLabel, setTimerLabel] = useState("Session");
    const [isActive, setIsActive] = useState(false);
    const [playPause, setPlayPause] = useState(<FontAwesomeIcon icon={faPlay} />);

    function toggle() {
        setIsActive(!isActive);
    }

    function incrementSessionMinutes() {
        setSessionMinutes(sessionMinutes + 1);
    }

    function decrementSessionMinutes() {
        if(sessionMinutes > 0){
            setSessionMinutes(sessionMinutes - 1);
        }
    }

    useEffect(()=>{
        let interval = null;
        if(isActive && sessionSeconds > 0){
            interval = setInterval(()=>{
                setSessionSeconds(sessionSeconds => sessionSeconds - 1);
            },1000);
        } 
        return () => clearInterval(interval);
    }, [isActive, sessionSeconds]);


    return(
        <>
            <div id="session-block">        
                <p id="session-label">Session Length</p>
                    <div id="session-counter">
                    <div className="expand"><i id="session-increment" onClick={incrementSessionMinutes}>
                        <FontAwesomeIcon icon={faArrowUp} /></i></div>
                        <div id="session-length" className="expand">{sessionMinutes}:0{sessionSeconds}</div>
                        <div className="expand"><i id="session-decrement" onClick={decrementSessionMinutes}>
                        <FontAwesomeIcon icon={faArrowDown} /></i></div>
                    </div>
            </div>
            <div id="timer-border">
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{sessionMinutes}:{sessionSeconds}
          <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
       </div>
        <div id="timer-options">
            <div id="start_stop"><i className="fa-solid fa-play" onClick={toggle}>
                {playPause}</i></div>
            <div id="reset"><i className="fas fa-undo"><FontAwesomeIcon icon={faUndo} /></i></div>
        </div>
        </>
    )
}

export default SessionTimer;