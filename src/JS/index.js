 const displayTimer = document.getElementById("timer")
const btnStartPause = document.getElementById("startPause")
const btnSopNext = document.getElementById("stopNext")

let running = false;
const focusTime = 5
const restTime = 3
let startTime = focusTime
let remainingTime = startTime;
displayTimer.textContent = `${Math.floor(remainingTime / 60).toString().padStart(2, "0")}:${(remainingTime % 60).toString().padStart(2, "0")}`

btnStartPause.onclick = () => {
  btnSopNext.textContent = "Stop"
  if(!running) {
    running = true
    btnStartPause.textContent = 'Pause'
    timerInterval = setInterval(updateTimer, 1000);
    return console.log('Começou')         
  }
  if(btnStartPause.textContent == 'Confirm') {
    displayTimer.textContent = `${Math.floor(remainingTime / 60).toString().padStart(2, "0")}:${(remainingTime % 60).toString().padStart(2, "0")}`

  }
  running = false
  btnStartPause.textContent = 'Start'
  clearInterval(timerInterval);
  return console.log('Parou')   
}

btnSopNext.onclick = () => {
  if(running || remainingTime < startTime) {
    clearInterval(timerInterval);
    running = false    
    remainingTime = startTime
    btnStartPause.textContent = 'Start'
    btnSopNext.textContent = 'Next'
    displayTimer.textContent = `${Math.floor(startTime / 60).toString().padStart(2, "0")}:${(startTime % 60).toString().padStart(2, "0")}`
    return console.log('Parou')     
  } else {
    switchTimer().then(() => {
      displayTimer.textContent = `${Math.floor(remainingTime / 60).toString().padStart(2, "0")}:${(remainingTime % 60).toString().padStart(2, "0")}`
    });
    
  }   
}


async function switchTimer() {
  if(startTime == focusTime){
    startTime = await restTime
    remainingTime = await restTime
  } else {
    startTime = await focusTime
    remainingTime = await focusTime
    console.log(focusTime)
  }
}

function updateTimer() {
  remainingTime--;

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  displayTimer.textContent = formattedTime;

  if (remainingTime <= 0) {
    clearInterval(timerInterval);    
    displayTimer.textContent = "Time's up!"
    switchTimer()
    btnStartPause.textContent = 'Confirm'
  }
}