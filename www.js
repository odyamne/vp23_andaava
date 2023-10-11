const http = require("http");
const path=require("path");
const url=require("url");
const fs=require("fs");
const querystring=require("querystring");
const timedate = require("./datetime_ET");
const dateTimeEn = require("./datetime_en");
const semester = require("./semesterprogress");
const pageHead='<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n\t<title>Ander Aava, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBanner='\n\t<img src="vp_banner.png" alt="lehe banner">\n';
//const tluPicture='\n\t<img src="tlu_19.jpg" alt="SCP_19 asukoht..">';
const pageBody='\n\t<h1>Ander Aava</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudis õppetöö raames o_O</p><p>Mulle meeldib kokkamine ja kassid.</p><hr>';
const pageFoot='\n</body>\n</html>'

http.createServer(function(req, res){
	if (req.method ==='POST'){
		collectRequestData(req, result => {
			console.log(result);
			//kirjutame andmeid tekstifaili
			fs.open('public/log.txt', 'a', (err, file)=>{
				if(err){
					throw err;
				}
				else {
					//kirjutame faili saadud eesnime ja semikooloni
					fs.appendFile('public/log.txt', result.firstNameInput + ', ' +  result.lastNameInput + ', ' + dateTimeEn.dateOfTodayEn() + ';', (err)=>{
						if(err){
							throw err;
						}
						else {
							console.log('faili kirjutati!');
						}
					});
				}
				/* fs.close(file, (err)=>{
					if(err){
						throw err;
					}
				}); */
			});
			//paneme ka brauseris nähtavale, mis nime saime
			res.writeHead(302, {
				'Location': '/addNameFormless'
			  });
			  res.end();
		});
	}
	/////Ülalolev probleemne(nüüd korras)!!!! Kui collect ära kustutada, on ok. Muidu appendis paneks nime andmed. NB! Süntaksile erilist tähelepanu pidada.
	else{
		console.log(url.parse(req.url, true));
		let currentURL=url.parse(req.url, true);
		if(currentURL.pathname==="/"){
			
			//määrame tagastavate andmete päise. et on veebileht
			res.writeHead(200, {"Content-Type":"text/html"});
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write("<p>Lehe avamise hetkel oli kell "  + timedate.timeNowET() + " ja aeg oli " + timedate.timeOfDayET() + "</p><p>Kuupäev on " + timedate.dateNowET() + "</p>");
			res.write('<p><a href="semesterprogress">Semestri kulg</a></p>');
			res.write('<p><a href="picture">Huvitav pildike..</a></p>');
			res.write('<p><a href="addName">Nime vorm</a></p>');
			res.write(pageFoot);
			//et see valmis ja saadetaks
			return res.end();
		}
		
		else if (currentURL.pathname==="/addName"){
			res.writeHead(200, {"Content-Type":"text/html"});
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write('<p><a href="addNameValues">Nimesisestus andmed log.txt-st></a></p>');
			res.write("<p>Palun lisa oma nimi</p>");
			res.write('<form method="post"><label for="firstNameInput">Eesnimi</label>\n\t<input type="text" id="firstNameInput" name="firstNameInput" placeholder="Sinu eesnimi ..."><br><label for="lastNameInput">Perekonnanimi</label>\n\t<input type="text" id="lastNameInput" name="lastNameInput" placeholder="Sinu perekonnanimi ..."><br><br><input type="submit" name="nameSubmit" value="Salvesta"></form>');
			res.write(pageFoot);
			//e see valmis ja saadetaks
			return res.end();
		
		}

		else if (currentURL.pathname==="/addNameFormless"){
			res.writeHead(200, {"Content-Type":"text/html"});
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write('<p><a href="addName">Tagasi nime sisestuse vormile..></a></p>');
			res.write('<p><a href="addNameValues">Nimesisestus andmed log.txt-st></a></p>');
			res.write(pageFoot);
			//e see valmis ja saadetaks
			return res.end();
		}

		else if (currentURL.pathname === "/addNameValues") {
			fs.readFile('public/log.txt', 'utf8', (err, data) => {
			   if (err) {
				 throw err;
			   }
				const allData = data.split(';');
				let extractedData = [];
			  
				for (let i = 0; i < allData.length; i++) {
					if (allData[i]) {
						extractedData.push(allData[i].split(","));
					}
				}
			  
			  console.log(extractedData);
			  });
		
			res.write(pageHead);
		 	res.write(pageBanner);
		 	res.write(pageBody);
			res.write('<p><a href="addName">Tagasi nime sisestuse vormile..></a></p>');
		 	res.write(pageFoot);
			return res.end();
		}
		//	Keerukam versioon üleval, tagastab konsoolile massiivid, allolev lehele listina
		//	else if (currentURL.pathname === "/addNameFormless") {
		//		fs.readFile('log.txt', 'utf8', (err, data) => {
		//			if (err) {
		// 		 		throw error;
		//			}
		//
		//			const values = data.split(';');	   
		//			res.writeHead(200, {"Content-Type":"text/html"});
		//			res.write(pageHead);
		//			res.write(pageBanner);
		//			res.write(pageBody);
		//			res.write('<ul>');
		// 	   // näita väärtuseid html-s, <ul> vahel prinditakse <li> elemendid
		//			values.forEach(value => {
		// 				res.write(`<li>${value}</li>`);
		//			});
		//			res.write('</ul>');
		//			res.write('<p><a href="addName">Tagasi nime sisestuse vormile..></a></p>');
		//			res.write(pageFoot);
		   
		// 	   //et see valmis ja saadetaks
		//			return res.end();
		//		});
		//	}
		else if (currentURL.pathname==="/semesterprogress"){
			res.writeHead(200, {"Content-Type":"text/html"});
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write("<p>" + semester.endOutput + "</p>");
			res.write("<meter min='0' value='" + semester.semesterLastedFor + "' max='" + semester.semesterDuration + "'></meter>")
			res.write(pageFoot);
			//et see valmis ja saadetaks
			return res.end();
		}
		else if (currentURL.pathname==="/picture"){
			let htmlOutput = '<p>Pilti ei saa näidata"</p>';
			//loen fotode nimekirja, võid ka tluPicture asemel panna otse pildi html koodiga muidu
			fs.readdir('public/tluphotos', (err, fileList)=>{
				if (err){
					tluPhotoPage(res, htmlOutput);	
					throw err;		
				}
				else {
					//console.log(fileList.length);
					let randPic = Math.floor(Math.random() * fileList.length);
					//console.log(randPic);
					htmlOutput = '\n\t <img src = "' + fileList[randPic] + '" alt = "TLÜ pilt">';
					tluPhotoPage(res, htmlOutput);
				}
			});
			
		}
		//Allpool teeb kindlaks, et valitud laiendiga .jpg fail
		else if (path.extname(currentURL.pathname)==='.jpg'){
			console.log(path.extname(currentURL.pathname));
			console.log("tahan pilti");
			let filePath=path.join(__dirname, 'public', 'tluphotos');
			fs.readFile(filePath + currentURL.pathname, (err, data)=>
			{
				if(err)
				{
					throw err;
				}
				else
				{
					res.writeHead(200, {"Content-Type":"image/jpeg"});
					res.end(data);
				}
			});
		}
		else if (currentURL.pathname==="/vp_banner.png"){
			console.log("tahan pilti");
			let filePath=path.join(__dirname, "public", "banner/vp_banner.png");
			fs.readFile(filePath, (err, data)=>
			{
				if(err)
				{
					throw err;
				}
				else
				{
					res.writeHead(200, {"Content-Type":"image/png"});
					res.end(data);
				}
			});
		}
		else {
			res.end("Error 404");
		}
	}
	
}).listen(5210);
	//,dateInfo.midagimidagi(function(req,res)
		//{
		//	res.write('dateInfo')
		//})

//http://greeny.cs.tlu.ee:5210/
//5200 rinde port, unikaalne port 5210 arvutikohast M543-10, sisene greeny.cs.tlu.ee:5210 kui puttys www.js avatud
//Puhasta veidi süntaksi...millalgi.
//Kirjuta funktsioonid välja ja impordi sisse

function tluPhotoPage(res, photoHTML){
	res.writeHead(200, {"Content-Type":"text/html"});
	res.write(pageHead);
	res.write(pageBanner);
	res.write(pageBody);
	res.write(photoHTML);
	res.write(pageFoot);
	return res.end();
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let receivedData = '';
        request.on('data', chunk => {
            receivedData += chunk.toString();
        });
        request.on('end', () => {
            callback(querystring.decode(receivedData));
        });
    }
    else {
        callback(null);
    }
}
