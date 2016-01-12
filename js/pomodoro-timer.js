var gHours = 0;
var gMinutes = 0;
var gSeconds = 0;

var remainingTime;

var countdownHandle;

$(document).ready(function() {
    onPomodoroTimer();
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

    animateTime(hoursValue, minutesValue, secondsValue);
};

function displayTime(hoursValue, minutesValue, secondsValue){
    $('#hoursValue').text(formatTime(hoursValue));
    $('#minutesValue').text(formatTime(minutesValue));
    $('#secondsValue').text(formatTime(secondsValue));
}

function animateTime(hoursValue, minutesValue, secondsValue) {

    // position
    $('#hoursValue').css('top', '0em');
    $('#minutesValue').css('top', '0em');
    $('#secondsValue').css('top', '0em');

    $('#hoursNext').css('top', '0em');
    $('#minutesNext').css('top', '0em');
    $('#secondsNext').css('top', '0em');

    var oldHoursString = $('#hoursValue').text();
    var oldMinutesString = $('#minutesValue').text();
    var oldSecondsString = $('#secondsValue').text();

    var hoursString = formatTime(hoursValue);
    var minutesString = formatTime(minutesValue);
    var secondsString = formatTime(secondsValue);


    // set and animate
    if(oldHoursString !== hoursString) {

      $('#hoursNext').text(hoursString);

      $('#hoursValue').animate({top: '-=1em'});
      $('#hoursNext').animate({top: '-=1em'}, function() {
        $('#hoursValue').text(hoursString);
      });
    }

  if(oldMinutesString !== minutesString) {

    $('#minutesNext').text(minutesString);

    $('#minutesValue').animate({top: '-=1em'});
    $('#minutesNext').animate({top: '-=1em'}, function() {
      $('#minutesValue').text(minutesString);
    });
  }


  if(oldSecondsString !== secondsString) {
    $('#secondsNext').text(secondsString);

    $('#secondsValue').animate({top: '-=1em'});
    $('#secondsNext').animate({top: '-=1em'}, function() {
      $('#secondsValue').text(secondsString);
    });
  }
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
