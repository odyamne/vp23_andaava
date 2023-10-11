//const monthNameEN = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
//We want numerical month value, not words this time
const dateOfTodayEn = function(){
	let timeNow = new Date();
	let dateEN = timeNow.getMonth() + "/" + timeNow.getDate() + "/" + timeNow.getFullYear();
	return dateEN;
}

const dayOfTodayEn = function(){
	const dayNameEN = ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	let timeNow = new Date();
	return (dayNameEN[timeNow.getDay()]);
	}

const timeOfTodayEn = function(){
	let timeNow = new Date();
	const hours = String(timeNow.getHours()).padStart(2, '0');
	const minutes = String(timeNow.getMinutes()).padStart(2, '0');
	const seconds = String(timeNow.getSeconds()).padStart(2, '0');
	return `${hours}:${minutes}:${seconds}`;
}

const timeOfDayEn = function(){
	let dayPart = "sometime";
	const hourNow = new Date().getHours();
	
	if (hourNow >= 6 && hourNow < 12){
		dayPart = "morning";
	}
	else if (hourNow >= 12 && hourNow < 14){
		dayPart = "midday";
	}	
	else if (hourNow >= 14 && hourNow < 18){
		dayPart = "afternoon";
	}		
	else if (hourNow >= 18 && hourNow < 24){
		dayPart = "evening";
	}
	else if (hourNow >= 24 && hourNow < 3){
		dayPart = "night";
	}
	else if (hourNow >= 3 && hourNow < 6){
		dayPart = "dawn";
	}
	return dayPart;
	
}

//moodul ekspordib
module.exports = {dateOfTodayEn: dateOfTodayEn, timeOfTodayEn: timeOfTodayEn, timeOfDayEn: timeOfDayEn, dayOfTodayEn: dayOfTodayEn}