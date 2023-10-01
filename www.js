const http = require("http");
const time = require("./datetime_ET");
const date = require("./datetime_ET");

http.createServer(function(req, res){
	//määrame tagastatavate andmete päise, et on veebileht
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Ander Aava, veebiprogrammeerimine 2023</title></head><body>');
	res.write('<h1>Ander Aava</h1><p>See leht on loodud <a href="https://www.tlu.ee/" target="_blank">TLÜ</a> Digitehnoloogiate instituudis õppetöö raames o_O</p><p>Mulle meeldib kokkamine ja kassid.</p>');
	res.write('<p>Kohalik kellaaeg on ' + time.timeNowET() + " ja hetkel on " + time.timeOfDayET() + "</p>");
	res.write('<p>Kuupäev on ' + date.dateNowET() + "</p><hr></body></html>");
	
	//et see kõik valmiks ja ära saadetaks
	return res.end();
}).listen(5210);


//5200 rinde port, unikaalne port 5210 arvutikohast M543-10, sisene greeny.cs.tlu.ee:5210 kui puttys www.js avatud