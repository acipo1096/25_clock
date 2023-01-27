import React, {useState, useEffect} from 'react';
import SessionTimer from './SessionTimer';
import sessionMinutes from  './SessionTimer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'


const SessionBlock = (props) => {

  const [timerLabel, setTimerLabel] = useState("Session");
  const [playPause, setPlayPause] = useState(<FontAwesomeIcon icon={faPlay} />);


  return(
    <>
      <div id="timer-border">
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">
          <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
       </div>
        <div id="timer-options">
            <div id="start_stop"><i className="fa-solid fa-play">{playPause}</i></div>
            <div id="reset"><i className="fas fa-undo"><FontAwesomeIcon icon={faUndo} /></i></div>
        </div>
    </>
  )
}


export default SessionBlock;