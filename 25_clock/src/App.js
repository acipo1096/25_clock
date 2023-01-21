// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import SessionTimer from './components/SessionTimer';
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
                    <SessionTimer />
                    <div id="break-block">
                        <p id="break-label">Break Length</p>
                    <p><i id="break-increment">
                    <FontAwesomeIcon icon={faArrowDown} /></i></p>
                    </div>
                </div>
                <div id="timer-border">
                    <div id="timer-label">{timerLabel}</div>
                    <div id="time-left">

                        <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
                    </div>
                </div>
                <div id="timer-options">
                    <div id="start_stop"><i className="fa-solid fa-play" onClick={function decrementSession(){
                          setSessionMinutes(prevState => prevState - 1)
                          console.log(sessionMinutes)
                          setSessionSeconds(59);
                          console.log(sessionSeconds)
                          while(sessionSeconds > 0) {
                            console.log(sessionSeconds)
                          }
                          }
                    }>{playPause}</i></div>
                    <div id="reset"><i className="fas fa-undo"><FontAwesomeIcon icon={faUndo} /></i></div>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
    </>
  );
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
