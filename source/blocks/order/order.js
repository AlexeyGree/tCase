var getRemainingTime = function(finalDate) {
  let total = Date.parse(finalDate) - Date.parse(new Date());
  let seconds = Math.floor((total / 1000) % 60);
  let minutes = Math.floor((total / 1000 / 60) % 60);
  let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  let days = Math.floor(total / (1000 * 60 * 60 * 24));
  return {
    'total': total,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

var initClock = function(finalDate) {
  let days = document.querySelector('.days-js');
  let hours = document.querySelector('.hours-js');
  let min = document.querySelector('.minutes-js');
  let sec = document.querySelector('.seconds-js');

  let updateClock = function() {
    let total = getRemainingTime(finalDate);

    days.innerHTML = total.days;
    hours.innerHTML = ('0' + total.hours).slice(-2);
    min.innerHTML = ('0' + total.minutes).slice(-2);
    sec.innerHTML = ('0' + total.seconds).slice(-2);

    if(total <= 0) {
      clearInterval(timeInterval);
    }
  }

  updateClock();
  let timeInterval = setInterval(updateClock, 1000);
}

var finalDate = new Date(Date.parse(new Date()) + 5 * 24 * 60 * 60 * 1000);
initClock(finalDate);