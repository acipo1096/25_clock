import React, {useState, useEffect, isValidElement} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'


const BreakTimer = () => {
    const [breakMinutes, setBreakMinutes] = useState(1);
    const [breakSeconds, setBreakSeconds] = useState(11);
    const [timerLabel, setTimerLabel] = useState("Break");
    const [isActive, setIsActive] = useState(false);
    const [playPause, setPlayPause] = useState(<FontAwesomeIcon icon={faPlay} />);
    const nextSecond = breakSeconds - 1;
    const nextMinute = breakMinutes - 1;
    let timeLeft = document.getElementById('time-left')

    function toggle() {
        setIsActive(!isActive);
    }

    function incrementBreakMinutes() {
        setBreakMinutes(breakMinutes + 1);
    }

    function decrementBreakMinutes() {
        if(breakMinutes > 0){
            setBreakMinutes(breakMinutes - 1);
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
                setBreakSeconds(nextSecond);
                timeLeft.innerText = `${nextMinute}:${nextSecond}`;
            },1000);
        } else if(isActive && nextSecond < 10 && nextSecond > -1){
            interval = setInterval(()=>{
                console.log(nextMinute)
                setBreakSeconds(nextSecond);
                timeLeft.innerText = `${nextMinute}:0${nextSecond}`;
            },1000);
        } else if(isActive && nextSecond === -1) {
            console.log(nextSecond)
            if (nextMinute > 0 ) {
                setBreakMinutes(nextMinute)
                setBreakSeconds(nextSecond + 61);
            } else {
                console.log('Timer done!')
            }
        } 
        return () => clearInterval(interval);
    }, [isActive, breakSeconds]);


    return(
        <>
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
        <div id="time-left">{breakMinutes}:00
          <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
       </div>
        <div id="timer-options">
            <div id="start_stop"><i className="fa-solid fa-play" onClick={()=> {
                toggle();
                // setTimeout(()=>{
                //     setBreakMinutes(nextMinute);
                // },770);
                
            }}>
                {playPause}</i></div>
            <div id="reset"><i className="fas fa-undo"><FontAwesomeIcon icon={faUndo} /></i></div>
        </div>
        </>
    )
}

export default BreakTimer;