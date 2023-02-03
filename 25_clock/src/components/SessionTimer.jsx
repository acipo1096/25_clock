import React, {useState, useEffect, isValidElement} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'

const SessionTimer = () => {
    const [defaultSession, setDefaultSession] = useState(2)
    const [sessionMinutes, setSessionMinutes] = useState(2);
    const [sessionSeconds, setSessionSeconds] = useState(60);
    const [timerLabel, setTimerLabel] = useState("Session");
    const [isBreak, setIsBreak] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [playPause, setPlayPause] = useState(<FontAwesomeIcon icon={faPlay} />);
    const [defaultBreak, setDefaultBreak] = useState(1)
    const [breakMinutes, setBreakMinutes] = useState(1);
    const [breakSeconds, setBreakSeconds] = useState(60);
    const nextBreakSecond = breakSeconds - 1;
    const nextBreakMinute = breakMinutes - 1;
    const nextSecond = sessionSeconds - 1;
    const nextMinute = sessionMinutes - 1;
    let timeLeft = document.getElementById('time-left');
    let sessionLength = document.getElementById('session-length');
    let breakLength = document.getElementById('break-length');


    function toggle() {
        setIsActive(!isActive);
    }

    function toggleBreak() {
        setIsBreak(!isBreak);
        console.log(isBreak)
    }


    function incrementSessionMinutes() {
        setSessionMinutes(sessionMinutes + 1);
        setDefaultSession(defaultSession + 1);
    }

    function decrementSessionMinutes() {
        if(sessionMinutes > 0){
            setSessionMinutes(sessionMinutes - 1);
            setDefaultSession(defaultSession - 1);
        }
    }

    function incrementBreakMinutes() {
        setBreakMinutes(breakMinutes + 1);
        setDefaultBreak(defaultBreak + 1);
    }

    function decrementBreakMinutes() {
        if(breakMinutes > 0){
            setBreakMinutes(breakMinutes - 1);
            setDefaultBreak(defaultBreak - 1);
        }
    }

    function setDefaults() {
        sessionLength.innerText = `${defaultSession}:00`;
        breakLength.innerText = `${defaultBreak}:00`;
    }


    useEffect(()=> {
        if(isActive === true) {
            setPlayPause(<FontAwesomeIcon icon={faPause} />)
        } else {
            setPlayPause(<FontAwesomeIcon icon={faPlay} />)
        }
        }, [isActive]
    )

    // SESSION EFFECT
    useEffect(()=>{
        let interval = null; 
        if(isActive && isBreak === false && nextSecond >= 10){
            setDefaults();
            interval = setInterval(()=>{
                setSessionSeconds(nextSecond);
                timeLeft.innerText = `${nextMinute}:${nextSecond}`;

            },100);
        } else if(isActive && nextSecond < 10 && nextSecond > -1){
            setDefaults();
            interval = setInterval(()=>{
                setSessionSeconds(nextSecond);
                timeLeft.innerText = `${nextMinute}:0${nextSecond}`;
            },100);
        } else if(isActive && nextSecond === -1) {
            setDefaults();
            console.log(nextSecond)
            if (nextMinute > 0 ) {
                setSessionMinutes(nextMinute)
                setSessionSeconds(nextSecond + 60);
            }
            else {
                console.log('Timer done!')
                setTimerLabel("Break")
                setIsBreak(true)
                setSessionSeconds(sessionSeconds + 60)
                setSessionMinutes(defaultSession)
                timeLeft.innerText = `${breakMinutes}:00`
            }
        } 
        return () => clearInterval(interval);
    }, [isActive, isBreak, sessionSeconds]);

    // BREAK EFFECT
    useEffect(()=>{
        let interval = null;
        if(isActive && isBreak === true && nextBreakSecond >= 10){
            interval = setInterval(()=>{
                setBreakSeconds(nextBreakSecond);
                timeLeft.innerText = `${nextBreakMinute}:${nextBreakSecond}`;
            },100);
        } else if(isActive && nextBreakSecond < 10 && nextBreakSecond > -1){
            interval = setInterval(()=>{
                setBreakSeconds(nextBreakSecond);
                timeLeft.innerText = `${nextBreakMinute}:0${nextBreakSecond}`;
            },100);
        } else if(isActive && nextBreakSecond === -1) {
            if (nextBreakMinute > 0 ) {
                setBreakMinutes(nextBreakMinute)
                setBreakSeconds(nextBreakSecond + 60);
            } else {
                console.log('Break timer done!');
                setTimerLabel("Session");
                setIsBreak(false);
                setBreakSeconds(breakMinutes + 60)
                setBreakMinutes(defaultBreak)
                timeLeft.innerText = `${sessionMinutes}:00`
            }
        } 
        return () => clearInterval(interval);
    }, [isActive, isBreak, breakSeconds]);


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
            <div id="break-block">        
                <p id="break-label">Break Length</p>
                    <div id="break-counter">
                    <div className="expand"><i id="break-increment" onClick={incrementBreakMinutes}>
                        <FontAwesomeIcon icon={faArrowUp} /></i></div>
                        <div id="break-length" className="expand">{breakMinutes}:00</div>
                        <div className="expand"><i id="break-decrement" onClick={decrementBreakMinutes}>
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
            }}>
                {playPause}</i></div>
            <div id="reset"><i className="fas fa-undo"><FontAwesomeIcon icon={faUndo} /></i></div>
        </div>
        </>
    )
}

export default SessionTimer;