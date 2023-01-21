import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'


const SessionTimer = () => {
    const [sessionMinutes, setSessionMinutes] = useState(25);
    const [sessionSeconds, setSessionSeconds] = useState(0);


    return(
        <>
            <div id="session-block">        
                <p id="session-label">Session Length</p>
                    <div id="session-counter">
                    <div className="expand"><i id="session-increment" onClick={
                        ()=>{
                            setSessionMinutes(sessionMinutes + 1);
                        }
                    }><FontAwesomeIcon icon={faArrowUp} /></i></div>
                        <div id="session-length" className="expand">{sessionMinutes}:0{sessionSeconds}</div>
                        <div className="expand"><i id="session-decrement"><FontAwesomeIcon icon={faArrowDown} /></i></div>
                    </div>
            </div>
        </>
    )
}

export default SessionTimer;