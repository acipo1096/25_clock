import React, {useState, useEffect, isValidElement} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause, faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons'
const SessionTimer = () => {
    const [defaultSession, setDefaultSession] = useState(25)
    const [sessionMinutes, setSessionMinutes] = useState(25);
    const [sessionSeconds, setSessionSeconds] = useState(60);
    const [timerLabel, setTimerLabel] = useState("Session");
    const [isBreak, setIsBreak] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [playPause, setPlayPause] = useState(<FontAwesomeIcon icon={faPlay} />);
    const [defaultBreak, setDefaultBreak] = useState(5)
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [breakSeconds, setBreakSeconds] = useState(60);
    const [playAudio, setPlayAudio] = useState(false);
    const nextBreakSecond = breakSeconds - 1;
    const nextBreakMinute = breakMinutes - 1;
    const nextSecond = sessionSeconds - 1;
    const nextMinute = sessionMinutes - 1;
    let timeLeft = document.getElementById('time-left');
    let sessionLength = document.getElementById('session-length');
    let breakLength = document.getElementById('break-length');
    let sessionInterval = null;
    let breakInterval = null;
    let audio = new Audio('https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav');

    function toggle() {
        setIsActive(!isActive);
    }

    function toggleBreak() {
        setIsBreak(!isBreak);
        console.log(isBreak)
    }

    function incrementSessionMinutes() {
        setSessionMinutes(sessionMinutes + 1);
        timeLeft.innerText = sessionMinutes > 8 ? `${sessionMinutes + 1}:00` : `0${sessionMinutes + 1}:00`
        setDefaultSession(defaultSession + 1);
    }

    function decrementSessionMinutes() {
        if(sessionMinutes > 0){
            setSessionMinutes(sessionMinutes - 1);
            timeLeft.innerText = sessionMinutes > 10 ? `${sessionMinutes - 1}:00` : `0${sessionMinutes - 1}:00`
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
        sessionLength.innerText = `${defaultSession}`;
        breakLength.innerText = `${defaultBreak}`;
    }

    function resetTimer() {
        setIsActive(false)
        setIsBreak(false)
        setTimerLabel("Session");
        setPlayPause(<FontAwesomeIcon icon={faPlay} />)
        setDefaultSession(25)
        setSessionMinutes(25)
        setSessionSeconds(60)
        setDefaultBreak(5)
        setBreakMinutes(5)
        setBreakSeconds(60)
        setPlayAudio(false)
        clearInterval(sessionInterval)
        clearInterval(breakInterval)
        timeLeft.innerText = `25:00`;
    }

    useEffect(()=>{
        playAudio === true ? audio.play() : audio.pause()
    })

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
        setPlayAudio(false);
        // let interval = null; 
        if(isActive && isBreak === false && nextSecond >= 10){
            setDefaults();
            sessionInterval = setInterval(()=>{
                setSessionSeconds(nextSecond);
                timeLeft.innerText = sessionMinutes > 9 ? `${nextMinute}:${nextSecond}` : `0${nextMinute}:${nextSecond}`;
                console.log(timeLeft.innerText);
            },1000);
            console.log(nextSecond)
        } else if(isActive && nextSecond < 10 && nextSecond > -1){
            setDefaults();
            sessionInterval = setInterval(()=>{
                setSessionSeconds(nextSecond);
                timeLeft.innerText = sessionMinutes > 9 ? `${nextMinute}:0${nextSecond}` : `0${nextMinute}:0${nextSecond}`;
                console.log(timeLeft.innerText);
            },1000);
            console.log(nextSecond)
        } else if(isActive && nextSecond === -1) {
            setDefaults();
            console.log(nextSecond)
            if (nextMinute > 0) {
                setSessionMinutes(nextMinute)
                setSessionSeconds(nextSecond + 61);
                console.log(timeLeft.innerText);
            }
            else {
                console.log('Timer done!')
                setTimerLabel("Break")
                setIsBreak(true)
                setPlayAudio(true)
                setSessionSeconds(sessionSeconds + 59)
                setSessionMinutes(defaultSession)
                timeLeft.innerText = `${breakMinutes}:00`
                console.log(timeLeft.innerText);
            }
        } 
        return () => clearInterval(sessionInterval);
    }, [isActive, isBreak, sessionSeconds]);

    // BREAK EFFECT
    useEffect(()=>{
        // let interval = null;
        setPlayAudio(false);
        if(isActive && isBreak === true && nextBreakSecond >= 10){
            setDefaults();
            breakInterval = setInterval(()=>{
                setBreakSeconds(nextBreakSecond);
                timeLeft.innerText = `${nextBreakMinute}:${nextBreakSecond}`;
                console.log(timeLeft.innerText);
            },1000);
            console.log(nextBreakSecond)
        } else if(isActive && nextBreakSecond < 10 && nextBreakSecond > -1){
            setDefaults();
            breakInterval = setInterval(()=>{
                setBreakSeconds(nextBreakSecond);
                timeLeft.innerText = `${nextBreakMinute}:0${nextBreakSecond}`;
                console.log(timeLeft.innerText);
            },1000);
        } else if(isActive && nextBreakSecond === -1) {
            setDefaults();
            if (nextBreakMinute > 0) {
                setBreakMinutes(nextBreakMinute)
                setBreakSeconds(nextBreakSecond + 61);
                console.log(timeLeft.innerText);
                console.log(nextBreakSecond)
            } else {
                console.log('Break timer done!');
                setTimerLabel("Session");
                setIsBreak(false);
                setPlayAudio(true);
                setBreakSeconds(breakMinutes + 59)
                setBreakMinutes(defaultBreak)
                timeLeft.innerText = `${sessionMinutes}:00`
                console.log(timeLeft.innerText);
            }
        } 
        return () => clearInterval(breakInterval);
    }, [isActive, isBreak, breakSeconds]);


    return(
        <>
            <div id="blocks">
                <div id="session-block">        
                    <p id="session-label">Session Length</p>
                        <div id="session-counter">
                        <div className="expand"><i id="session-increment" onClick={incrementSessionMinutes}>
                            <FontAwesomeIcon icon={faArrowUp} /></i></div>
                            <div id="session-length" className="expand">{sessionMinutes}</div>
                            <div className="expand"><i id="session-decrement" onClick={decrementSessionMinutes}>
                            <FontAwesomeIcon icon={faArrowDown} /></i></div>
                        </div>
                </div>
                <div id="break-block">        
                    <p id="break-label">Break Length</p>
                        <div id="break-counter">
                        <div className="expand"><i id="break-increment" onClick={incrementBreakMinutes}>
                            <FontAwesomeIcon icon={faArrowUp} /></i></div>
                            <div id="break-length" className="expand">{breakMinutes}</div>
                            <div className="expand"><i id="break-decrement" onClick={decrementBreakMinutes}>
                            <FontAwesomeIcon icon={faArrowDown} /></i></div>
                        </div>
                </div>
            </div>
        <div id="timer-border">
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{sessionMinutes > 9 ? `${sessionMinutes}:00` : `0${sessionMinutes}:00`}
          {/* <audio id="beep" preload="auto" src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'>
          </audio> */}
        </div>
       </div>
        <div id="timer-options">
            <div id="start_stop"><i className="fa-solid fa-play" onClick={()=> {
                toggle();                
            }}>
                {playPause}</i></div>
            <div id="reset"><i className="fas fa-undo" onClick={()=>{
                resetTimer();
            }}><FontAwesomeIcon icon={faUndo}/></i></div>
        </div>
        </>
    )
}

export default SessionTimer;
