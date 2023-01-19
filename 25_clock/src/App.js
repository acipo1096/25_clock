// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'
import SessionTimer from './components/SessionTimer';


const App = () =>  {
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [breakTime, setBreakTime] = useState(5);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [playPause, setPlayPause] = useState(<FontAwesomeIcon icon={faPlay} />);
  // let [sessionMinutes, setSessionMinutes] = useState(25);


  return (
    <>
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <h1 id="title">25 + 5 Clock</h1>
                <p id="definition">The Pomodoro Technique is a time management method. It is used to break work into intervals, typically 25 minutes long, separated by short breaks. It was created by Francesco Cirillo.</p>
                <div id="blocks">
                    <div id="session-block">
                    
                    <p id="session-label">Session Length</p>
                        <div id="session-counter">
                            <div className="expand"><i id="session-increment" onClick={function handleSessionTimer() {
                                                                                        return setSessionMinutes(prevState => prevState + 1)
                                                                                      }
                                                                                      }>
  <FontAwesomeIcon icon={faArrowUp} />{sessionMinutes}:0{sessionSeconds}</i></div>
                            <div id="session-length" className="expand"></div>
                            <div className="expand"><i id="session-decrement" onClick={function handleSessionTimer() {
                                                                                        if (sessionMinutes > 0 ) {
                                                                                          return setSessionMinutes(prevState => prevState - 1)
                                                                                        }
                                                                                        else {
                                                                                          return setSessionMinutes
                                                                                        }
                                                                                      }
                                                                                      }>
  <FontAwesomeIcon icon={faArrowDown} /></i></div>
                        </div>
                    </div>
                    <div id="break-block">
                        <p id="break-label">Break Length</p>
                    <p><i id="break-increment" onClick={function handleBreakTimer() {
                                                                                        return setBreakTime(prevState => prevState + 1)
                                                                                      }
                                                                                      }><FontAwesomeIcon icon={faArrowUp} />{breakTime}:00</i><span id="break-length"></span><i div id="break-decrement" onClick={function handleBreakTimer() {
                                                                                        if (breakTime > 0 ) {
                                                                                          return setBreakTime(prevState => prevState - 1)
                                                                                        }
                                                                                        else {
                                                                                          return setBreakTime
                                                                                        }
                                                                                      }
                                                                                      }>
                                                                                        <FontAwesomeIcon icon={faArrowDown} /></i></p>
                    </div>
                </div>
                <div id="timer-border">
                    <div id="timer-label">{timerLabel}</div>
                    <div id="time-left">
                        {sessionMinutes}:{sessionSeconds}
                        <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
                    </div>
                </div>
                <div id="timer-options">
                    <div id="start_stop"><i className="fa-solid fa-play" onClick={function decrementSession(){
                            setSessionMinutes(prevState => prevState - 1)
                            setSessionSeconds(59);
                            decrementSeconds();
                              function decrementSeconds(){
                                setTimeout(function() {
                                  setSessionSeconds(setSessionSeconds => setSessionSeconds - 1)
                                  decrementSeconds();
                                  if(setSessionSeconds > 10) {
                                    return sessionSeconds;
                                  }
                              }, 1000)
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
