var gHours = 0;
var gMinutes = 0;
var gSeconds = 0;

var remainingTime;

var countdownHandle;

$(document).ready(function() {
    resetTimer();
});

function onPomodoroTimer(){
    
    stopTimer();
    
    gHours = 0;
    gMinutes = 50;
    gSeconds = 0;
    
    resetTimer();
    
    $('#shortButton').removeClass('btn-success');
    $('#longButton').removeClass('btn-success');
    $('#pomodoroButton').addClass('btn-success');
}

function onShortTimer(){
    
    stopTimer();
    
    gHours = 0;
    gMinutes = 5;
    gSeconds = 0;
    
    resetTimer();
    
    $('#pomodoroButton').removeClass('btn-success');
    $('#longButton').removeClass('btn-success');
    $('#shortButton').addClass('btn-success');
}

function onLongTimer(){
    
    stopTimer();
    
    gHours = 0;
    gMinutes = 15;
    gSeconds = 0;
    
    resetTimer();
    
    $('#pomodoroButton').removeClass('btn-success');
    $('#shortButton').removeClass('btn-success');
    $('#longButton').addClass('btn-success');
}

function onStartTimer(){
    stopTimer();
    startTimer();
};

function onStopTimer(){
    stopTimer();
};

function onResetTimer(){
    stopTimer();
    resetTimer();
}

function startTimer() {
    countdownHandle=setInterval(function() {
        decrementTimer();
    },1000);    
}

function stopTimer() {
    clearInterval(countdownHandle);    
}

function resetTimer(){
    
    remainingTime = (gHours*60*60*1000)+
                    (gMinutes*60*1000)+
                    (gSeconds*1000);
    renderTimer();
}

function renderTimer(){
    
    var deltaTime=remainingTime;
    
    var hoursValue=Math.floor(deltaTime/(1000*60*60));
    deltaTime=deltaTime%(1000*60*60);
    
    var minutesValue=Math.floor(deltaTime/(1000*60));
    deltaTime=deltaTime%(1000*60);
    
    var secondsValue=Math.floor(deltaTime/(1000));
    
    displayTime(hoursValue, minutesValue, secondsValue);
};
    
function displayTime(hoursValue, minutesValue, secondsValue){
    $('#hoursValue').text(formatTime(hoursValue));
    $('#minutesValue').text(formatTime(minutesValue));
    $('#secondsValue').text(formatTime(secondsValue));
    
}


function formatTime(intergerValue){
    
    return intergerValue > 9 ? intergerValue.toString():'0'+intergerValue.toString();
    
}

function decrementTimer(){
    
    remainingTime-=(1*1000);
    renderTimer();
    
    if(remainingTime<1000){
        onStopTimer();
    }
}

