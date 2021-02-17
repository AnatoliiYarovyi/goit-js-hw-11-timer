const refs = {
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]'),
};
const CountdownTimer = function (selector, targetDate) {
  this.selector = selector;
  this.targetDate = targetDate;
};

const finalDate = new CountdownTimer('#timer-1', new Date('Feb 15, 2021'));
const finalDateUnix = finalDate.targetDate.getTime();

function updateTimer(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}
function pad(value) {
  return String(value).padStart(2, '0');
}

function startTimer() {
  let intervalId = null;
  if (finalDateUnix < Date.now()) {
    clearInterval(intervalId);
    console.log('Time is over')
    return 
  }
  intervalId = setInterval(() => {
    const currentTime = Date.now();    
    const deltaTime = finalDateUnix - currentTime;
    
    updateTimer(deltaTime);    
    }, 1000);
}

startTimer();