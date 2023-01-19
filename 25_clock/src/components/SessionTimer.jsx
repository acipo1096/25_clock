import React, {useState, useEffect} from 'react';
import App from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'


const SessionTimer = (props) => {
    const [sessionTime, setSessionTime] = useState(25);
    // const [breakTime, setBreakTime] = useState(5);
    // console.log(minutes);
//     let sessionMinutes = 25;
//     let sessionSeconds = 0;
//     setTimeout(function() {
//         sessionMinutes--;
//         SessionTimer();
// }, 1000);
return sessionTime;
}

export default SessionTimer;