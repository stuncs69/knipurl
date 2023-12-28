let seconds = 5;

const secondsSpan = document.querySelector("span#seconds");
const counter = setInterval(() => {
  if (seconds > 0) {
    seconds--;
    secondsSpan.textContent = seconds.toString();
  } else {
    clearInterval(counter);
    location.replace("../");
  }
}, 1000);