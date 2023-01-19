let incSession = document.getElementById('session-increment');
let decSession = document.getElementById('session-decrement');
let incBreak = document.getElementById('break-increment');
let decBreak = document.getElementById('break-decrement');
let startStop = document.getElementById('start_stop');

let seconds = 0;
let sessionMinutes = 25;
let breakMinutes = 5;
let sessionTime = '';
let breakTime = '';
let tempSession;
let tempBreak;

let timerStatus = 'pause';
let beep = document.getElementById('beep');
let sessionOrBreak = 'session';

let sessionDefault = document.getElementById("session-length").innerText = sessionMinutes;
let breakDefault = document.getElementById("break-length").innerText = breakMinutes;
let timeLeft = document.getElementById('time-left').innerText = sessionMinutes + ':0' + seconds;

incSession.addEventListener('click', function incrementLength(){
    if (sessionMinutes < 60) {
        sessionMinutes += 1;
        sessionDefault = document.getElementById("session-length").innerText = sessionMinutes;
        timeLeft = document.getElementById('time-left').innerText = sessionMinutes + ':0' + seconds;
        // if (sessionOrBreak == 'session') {
        //     document.getElementById("time-left").innerText = sessionMinutes + ':0' + 0;
        // }
    }
});

decSession.addEventListener('click', function decrementLength(){
    if (sessionMinutes > 0){
        sessionMinutes -= 1;
        sessionDefault = document.getElementById("session-length").innerText = sessionMinutes;
        timeLeft = document.getElementById('time-left').innerText = sessionMinutes + ':0' + seconds;
    }    
});

incBreak.addEventListener('click', function incrementBreak(){
    if (breakDefault < 60) {
        breakMinutes += 1;
        breakDefault = document.getElementById("break-length").innerText = breakMinutes;
        if (sessionOrBreak == 'break') {
            timeLeft = document.getElementById("time-left").innerText = breakMinutes + ':0' + 0;
    }
    }
});

decBreak.addEventListener('click', function decrementBreak(){
    if (breakDefault >= 1 && breakMinutes > 0){
        breakMinutes -= 1;
        breakDefault = document.getElementById("break-length").innerText = breakMinutes;
        if (sessionOrBreak == 'break') {
            document.getElementById("time-left").innerText = breakMinutes + ':0' + 0;
        }
    }    
});

startStop.addEventListener('click', function(){
    if (timerStatus == "pause") {
        startStop.innerHTML = "<i class=\"fa-solid fa-pause\"></i>"
        timerStatus = "play"
        console.log('Timer started!') 

        if (seconds <= -1) {
            timeLeft = sessionMinutes + ':00';
        } 

        timerCount();
        
        if (seconds == 0 && sessionOrBreak == 'session') {
            breakTimer();
        } else if (seconds == 0 && sessionOrBreak == 'break') {
            timerCount();
        }
    
    } else if (startStop.innerHTML = "<i class=\"fa-solid fa-pause\">"){
        startStop.innerHTML = "<i class=\"fa-solid fa-play\">";
        timerStatus = 'pause';
        console.log('Timer paused!');

        timerPause();
    }
});

function timerCount() {
    if (sessionOrBreak = 'session') {
        sessionTime = setTimeout(function() {
            document.getElementById('timer-label').innerText = 'Session';
            timeLeft = sessionMinutes + ':0' + 0;
            if (seconds > -1 && seconds < 10) {
                document.getElementById('time-left').innerText = sessionMinutes + ':0' + seconds;
                seconds--;
            } else if (seconds <= -1) {
                document.getElementById('time-left').innerText = '0:00';
            }
            else {
                document.getElementById('time-left').innerText = sessionMinutes + ':' + seconds;
                seconds--;
            }

            if (seconds > -1 && sessionMinutes > -1) {
                timerCount();
            } else if (seconds == -1 && sessionMinutes != 0){
                sessionMinutes -= 1;
                seconds += 60;
                timerCount();
            } else if (sessionMinutes == 0){
                playAudio();
                sessionOrBreak = 'break';
                seconds = 0;
                breakTimer();
                breakMinutes = breakDefault;
            } 
        }, 1000);
    }
}   

function breakTimer() {
    if (sessionOrBreak == 'break') {
        breakTime = setTimeout(function() {
            tempBreak = breakMinutes;
            console.log(tempBreak);
            document.getElementById('timer-label').innerText = 'Break';
            if (seconds > -1 && seconds < 10) {
                document.getElementById('time-left').innerText = breakMinutes + ':0' + seconds;
                seconds--;
            } else if (seconds <= -1) {
                document.getElementById('time-left').innerText = '0:00';
            }
            else {
                document.getElementById('time-left').innerText = breakMinutes + ':' + seconds;
                seconds--;
            }

            if (seconds > -1 && breakMinutes > -1) {
                breakTimer();
            } else if (seconds == -1 && breakMinutes != 0){
                breakMinutes -= 1;
                seconds += 60;
                breakTimer();
            } else if (breakMinutes == 0){
                playAudio();
                sessionOrBreak = 'session';
                seconds = 0;
                timerCount();
                sessionMinutes = sessionDefault;
            } 
        }, 1000);
    }
}

function timerPause() {
    if (sessionOrBreak == 'session' || sessionOrBreak == 'break') {
        clearInterval(sessionTime);
        clearInterval(breakTime);
    }
}

function playAudio() {
    console.log('BEEP BEEP BEEP BEEP! BEEP BEEP BEEP BEEP!')
    beep.play();
}


document.getElementById('reset').addEventListener("click", function(){
    document.getElementById('timer-label').innerText = 'Session';
    startStop.innerHTML = "<i class=\"fa-solid fa-play\">";
    beep.pause();
    sessionMinutes = 25;
    breakMinutes = 5;
    seconds = 0;
    timeLeft = document.getElementById('time-left').innerText = sessionMinutes + ':0' + seconds;
    let sessionDefault = document.getElementById("session-length").innerText = sessionMinutes;
    let breakDefault = document.getElementById("break-length").innerText = breakMinutes;
    sessionOrBreak = 'session';
    timerStatus = 'pause';
    clearInterval(sessionTime);
    clearInterval(breakTime);
});