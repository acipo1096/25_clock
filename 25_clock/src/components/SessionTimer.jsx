import React, {useState, useEffect, isValidElement} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'


const SessionTimer = () => {
    const [sessionMinutes, setSessionMinutes] = useState(25);
    const [sessionSeconds, setSessionSeconds] = useState(60);
    const [timerLabel, setTimerLabel] = useState("Session");
    const [isActive, setIsActive] = useState(false);
    const [playPause, setPlayPause] = useState(<FontAwesomeIcon icon={faPlay} />);
    const nextSecond = sessionSeconds - 1;
    const nextMinute = sessionMinutes - 1;
    let timeLeft = document.getElementById('time-left')

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

    useEffect(()=> {
        if(isActive === true) {
            setPlayPause(<FontAwesomeIcon icon={faPause} />)
        } else {
            setPlayPause(<FontAwesomeIcon icon={faPlay} />)
        }
        }, [isActive]
    )

    useEffect(()=>{
        let interval = null;
        if(isActive && nextSecond >= 10){
            interval = setInterval(()=>{
                console.log(nextSecond)
                setSessionSeconds(nextSecond);
                timeLeft.innerText = `${nextMinute}:${nextSecond}`;
            },1000);
        } else if(isActive && nextSecond < 10 && nextSecond > -1){
            interval = setInterval(()=>{
                console.log(nextMinute)
                setSessionSeconds(nextSecond);
                timeLeft.innerText = `${sessionMinutes}:0${nextSecond}`;
                console.log(nextSecond)
            },1000);
        } else if(isActive && nextSecond === -1) {
            console.log(nextSecond)
            if (nextMinute !== -1) {
                setSessionMinutes(nextMinute)
                setSessionSeconds(nextSecond + 61);
            } else {
                console.log('Timer done!')
            }
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
                        <div id="session-length" className="expand">{sessionMinutes}:00</div>
                        <div className="expand"><i id="session-decrement" onClick={decrementSessionMinutes}>
                        <FontAwesomeIcon icon={faArrowDown} /></i></div>
                    </div>
            </div>
            <div id="timer-border">
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{sessionMinutes}:00
          <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
       </div>
        <div id="timer-options">
            <div id="start_stop"><i className="fa-solid fa-play" onClick={()=> {
                toggle();
                // setTimeout(()=>{
                //     setSessionMinutes(nextMinute);
                // },770);
                
            }}>
                {playPause}</i></div>
            <div id="reset"><i className="fas fa-undo"><FontAwesomeIcon icon={faUndo} /></i></div>
        </div>
        </>
    )
}

export default SessionTimer;