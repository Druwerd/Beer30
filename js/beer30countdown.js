
const beer30dayOfWeek = 5;
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
dateNow = new Date();
thisDay = dateNow.getDay();
thisDate = dateNow.getDate();
thisMonth = dateNow.getMonth();
thisYear = dateNow.getFullYear();

dateFuture = new Date();
if (thisDay == beer30dayOfWeek){
  dateFuture = new Date(thisYear,thisMonth,thisDate,beer30Hour,beer30Min,0);
}
else if (thisDay < beer30dayOfWeek) {
  daysTillBeer30 = beer30dayOfWeek - thisDay;
  dateNow.setDate(dateNow.getDate() + daysTillBeer30);
  thisDate = dateNow.getDate();
  thisMonth = dateNow.getMonth();
  thisYear = dateNow.getFullYear();
  dateFuture = new Date(thisYear,thisMonth,thisDate,beer30Hour,beer30Min,0);
}
else if (thisDay > beer30dayOfWeek) {
  daysTillBeer30 = 7 + beer30dayOfWeek - thisDay;
  dateNow.setDate(dateNow.getDate() + daysTillBeer30);
  thisDate = dateNow.getDate();
  thisMonth = dateNow.getMonth();
  thisYear = dateNow.getFullYear();
  dateFuture = new Date(thisYear,thisMonth,thisDate,beer30Hour,beer30Min,0);
}

function GetCount() {
  dateNow = new Date();
  thisDay = dateNow.getDay();
  amount = dateFuture.getTime() - dateNow.getTime(); //calc milliseconds between dates
  delete dateNow;

  if (amount < 0) {
    document.getElementById('countbox').innerHTML="Now!";
    document.getElementById('beer_pic').innerHTML=beer30asciiart;
  }
  else {
    var days=0;
    var hours=0;
    var mins=0;
    var secs=0;
    var out="";

    amount = Math.floor(amount/1000); //kill the "milliseconds" so just secs

    days=Math.floor(amount/86400); //days
    amount=amount%86400;

    hours=Math.floor(amount/3600); //hours
    amount=amount%3600;

    mins=Math.floor(amount/60); //minutes
    amount=amount%60;

    secs=Math.floor(amount); //seconds

    if(days != 0)                            {out += days +" day"+((days!=1)?"s":"")+", ";}
    if(days != 0 || hours != 0)              {out += hours +" hour"+((hours!=1)?"s":"")+", ";}
    if(days != 0 || hours != 0 || mins != 0) {out += mins +" minute"+((mins!=1)?"s":"")+", ";}
    out += secs +" secs";

    document.getElementById('countbox').innerHTML=out;
    if (thisDay == beer30dayOfWeek){
     document.getElementById('beer_pic').innerHTML=beerasciiart;
    }
    else {
     document.getElementById('beer_pic').innerHTML="<img src='images/chickenthursday2.jpg'/>";
    }
    setTimeout("GetCount()", 1000);
  }
}
