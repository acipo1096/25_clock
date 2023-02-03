// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
// import './App.css';
import SessionTimer from './components/SessionTimer';
import BreakTimer from './components/BreakTimer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'


const App = () =>  {

  const session = <SessionTimer />;

  // const [sessionMinutes, setSessionMinutes] = useState(1);
  // const [sessionSeconds, setSessionSeconds] = useState(11);
  // const [timerLabel, setTimerLabel] = useState("Session");
  // const [isActive, setIsActive] = useState(false);
  // const [playPause, setPlayPause] = useState(<FontAwesomeIcon icon={faPlay} />);
  // const nextSecond = sessionSeconds - 1;
  // const nextMinute = sessionMinutes - 1;
  // let timeLeft = document.getElementById('time-left')

  // function swapTimers() {
  
  // }


  return (
    <> 
      <div className="row">
        <div className="col-md-3"></div>
          <div className="col-md-6">
             <h1 id="title">25 + 5 Clock</h1>
             <p id="definition">The Pomodoro Technique is a time management method. It is used to break work into intervals, typically 25 minutes long, separated by short breaks. It was created by Francesco Cirillo.</p>
             <div id="blocks">
              <SessionTimer />
              </div>
            <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
}

export default App;

