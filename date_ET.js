exports.dateNowET = function(){
	
	const monthNamesET = ["Jaanuar", "Veebruar", "Märts", "April", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"];
	let timeNow = new Date();
	return timeNow.getDate() + ". " + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear();
}
	

//console.log("Täna on: " + dateNow + "." + monthNow + "." + yearNow);