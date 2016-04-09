// Beer:30 is every Friday at 4:30 PM
// This will count the days, hours, minutes, seconds until the next Beer:30

const beer30dayOfWeek = 5; // Friday
const beer30Hour = 16;
const beer30Min = 30;

const beerasciiart = "<pre>\
  _.._..,_,_\n\
 (          )\n\
  ]~,\"-.-~~[\n\
.=])' (;  ([\n\
| ]:: '    [\n\
'=]): .)  ([\n\
  |:: '    |\n\
   ~~----~~\n\
</pre>";

const beer30asciiart = "<pre>\
'==================================================================='\n\
||                            ___                                  ||\n\
||                          .'   '.                                ||\n\
||                         /       \\           oOoOo               ||\n\
||                        |         |       ,==|||||               ||\n\
||                         \\       /       _|| |||||               ||\n\
||                          '.___.'    _.-'^|| |||||               ||\n\
||                        __/_______.-'     '==HHHHH               ||\n\
||                   _.-'` /                   \"\"\"\"\"               ||\n\
||                .-'     /   oOoOo                                ||\n\
||                `-._   / ,==|||||                                ||\n\
||                    '-/._|| |||||                                ||\n\
||                     /  ^|| |||||                                ||\n\
||                    /    '==HHHHH                                ||\n\
||                   /________\"\"\"\"\"                                ||\n\
||                   `\\       `\\                                   ||\n\
||                     \\        `\\   /                             ||\n\
||                      \\         `\\/                              ||\n\
||                      /                                          ||\n\
||                     /                                           ||\n\
||                    /_____                                       ||\n\
||                                                                 ||\n\
'==================================================================='\n\
</pre>";

// caculate the next beer friday
function timeUntilBeer30() {
  var dateNow = new Date();
  var dateFuture = new Date();
  dateFuture.setHours(beer30Hour, beer30Min, 0, 0);

  var currentTime = {
    day: dateNow.getDay(),
    date: dateNow.getDate(),
    month: dateNow.getMonth(),
    year: dateNow.getFullYear(),
    milliseconds: dateNow.getTime()
  };

  if (currentTime.day != beer30dayOfWeek) {
    var daysTillBeer30 = beer30dayOfWeek - currentTime.day;
    if (currentTime.day > beer30dayOfWeek) { daysTillBeer30 += 7 } // Beer:30 is next week

    dateFuture.setDate(currentTime.date + daysTillBeer30);
  }
  return dateFuture.getTime() - (new Date()).getTime(); // milliseconds between dates
}


function buildTimeObject(milliseconds) {
  var days = 0;
  var hours = 0;
  var minutes = 0;
  var seconds = 0;
  const secondsInDay = 60 * 60 * 24;
  const secondsInHour = 60 * 60;
  const secondsInMinute = 60;

  t = Math.floor(milliseconds/1000); // convert milliseconds to seconds

  days = Math.floor(t/secondsInDay);
  t = t % secondsInDay;

  hours = Math.floor(t/secondsInHour);
  t = t % secondsInHour;

  minutes = Math.floor(t/secondsInMinute);
  t = t % secondsInMinute;

  seconds = Math.floor(t);

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function pluralize(word, count) {
  if (count === 1) {
    return word;
  }
  else { 
    return word + "s";
  }
}

function formatTimeUnit(word, count) {
  return count + " " + pluralize(word, count);
}

function buildOutputString(days, hours, minutes, seconds) {
  var out = [];

  if (days != 0) {
    out.push(formatTimeUnit("day", days));
  }
  if (hours != 0) {
    out.push(formatTimeUnit("hour", hours));
  }
  if (minutes != 0) {
    out.push(formatTimeUnit("minute", minutes));
  }
  out.push(formatTimeUnit("second", seconds));

  return out.join(", ");
}

function LoadCounter() {
  var countboxContent = "";
  var beerPicContent = beerasciiart;
  var timeDiff = timeUntilBeer30();

  if (timeDiff < 0) {
    countboxContent = "Now!"
    beerPicContent = beer30asciiart;
  }
  else {
    var timeObj = buildTimeObject(timeDiff);
    countboxContent = buildOutputString(timeObj.days,
                                        timeObj.hours,
                                        timeObj.minutes,
                                        timeObj.seconds);

    setTimeout("LoadCounter()", 1000);
  }

  document.getElementById('countbox').innerHTML = countboxContent;
  document.getElementById('beer_pic').innerHTML = beerPicContent;
}
