// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import SessionTimer from './components/SessionTimer';
import SessionBlock from './components/SessionBlock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'


const App = () =>  {

  const [breakTime, setBreakTime] = useState(5);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [playPause, setPlayPause] = useState(<FontAwesomeIcon icon={faPlay} />);


  return (
    <> 
      <div className="row">
        <div className="col-md-3"></div>
          <div className="col-md-6">
             <h1 id="title">25 + 5 Clock</h1>
             <p id="definition">The Pomodoro Technique is a time management method. It is used to break work into intervals, typically 25 minutes long, separated by short breaks. It was created by Francesco Cirillo.</p>
             <div id="blocks">
                 <div id="break-block">
                    <p id="break-label">Break Length</p>
                    <p><i id="break-increment">
                    <FontAwesomeIcon icon={faArrowDown} /></i></p>
                  </div>
              </div>
              <SessionTimer />
            <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
}

export default App;

