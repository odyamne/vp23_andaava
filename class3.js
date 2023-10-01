const firstName = "Ander"
const lastName = "Aava"
const dateInfo = require("./datetime_ET");
//Lisame failisüsteemi mooduli
const fs = require("fs");
let proverb = [];

fs.readFile("txt_files/vanasonad.txt", "utf8", (err, data)=>{
	
	if(err){
		console.log(err);
	}
	else{
		//console.log(data);
		proverb = data.split(";");
		
		//console.log(proverb);
		//console.log("Vanasõnu on " + proverb.length);
		onScreen();
		//Teeb alloleva funktsiooni onScreen tahtud järjekorras!
		
	}
});

const onScreen = function(){
	
	console.log(firstName + " " + lastName);
	console.log(dateInfo.dateNowET());
	console.log("Tänane tarkus: " + proverb[Math.floor(Math.random() * proverb.length)]);
	//Tava-tsükkel vanasõnade loendamiseks, üleval valib suvalise vanasõna jooksutamisel.
	//for (let i = 0; i < proverb.length; i ++){
	//		console.log((i + 1) + ") " + proverb[i])
	//}
	console.log("Kohalik kellaaeg on " + dateInfo.timeNowET());
	console.log("Hetkel on " + dateInfo.timeOfDayET());
}
	
//console.log(dateInfo.monthsET);
//console.log(Date());
