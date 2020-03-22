const fs = require('fs')

var obj = require('/Users/peterrandol/MC/MC-Wiki-React/src/data/db.json');
var writeSteam = fs.createWriteStream('db2.json');

writeSteam.write('{ \n "activities" : [\n')
for(var i = 0; i < obj.activities.length; i++){
writeSteam.write('{"activityName" : "' +obj.activities[i].name +'",\n');
writeSteam.write('"purpose" : "' +obj.activities[i].description +'",\n');
writeSteam.write('"space" : "' + '",\n');
writeSteam.write('"goal" : "' +obj.activities[i].description +'",\n');
writeSteam.write('"challenge" : "' + obj.activities[i]['Age/Experience']+ ' ' + obj.activities[i].Intensity +'",\n');
writeSteam.write('"movementsActions" : "' + '",\n');
writeSteam.write('"tools" : "' +obj.activities[i].materials +'",\n');
writeSteam.write('"rules" : "' +obj.activities[i].howtoplay['Activity Description']+'    ' + obj.activities[i].howtoplay['Coach Notes'] +'"\n},\n\n');


console.log(obj.activities[i].name);}

writeSteam.write(']\n}')

// const readfile = fs.readFile('./data/db.json', utf8, function(err, data){
//         if(err) throw err;
//         console.log(data);
// })



