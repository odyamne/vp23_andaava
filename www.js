const http = require("http");
const timedate = require("./datetime_ET");
const path=require("path");
const url=require("url");
const fs=require("fs");
const semester = require("./semesterprogress");
const pageHead='<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n\t<title>Ander Aava, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBanner='\n\t<img src="vp_banner.png" alt="lehe banner">\n';
const tluPicture='\n\t<img src="tlu_19.jpg" alt="SCP_19 asukoht..">';
const pageBody='\n\t<h1>Ander Aava</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudis õppetöö raames o_O</p><p>Mulle meeldib kokkamine ja kassid.</p><hr>';
const pageFoot='\n</body>\n</html>'

http.createServer(function(req, res)
{
	console.log(url.parse(req.url, true));
	let currentURL=url.parse(req.url, true);
	if(currentURL.pathname==="/")
	{
		
		//määrame tagastavate andmete päise. et on veebileht
		res.writeHead(200, {"Content-Type":"text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write("<p>Lehe avamise hetkel oli kell "  + timedate.timeNowET() + " ja aeg oli " + timedate.timeOfDayET() + "</p><p>Kuupäev on " + timedate.dateNowET() + "</p>");
		res.write('<p><a href="semesterprogress">Semestri kulg</a></p>');
		res.write('<p><a href="picture">Huvitav pildike..</a></p>');
		res.write(pageFoot);
		//et see valmis ja saadetaks
		return res.end();
	}
	else if (currentURL.pathname==="/semesterprogress")
	{
		res.writeHead(200, {"Content-Type":"text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write("<p>" + semester.result + "</p>");
		res.write("<meter min='0' value='" + semester.semesterLastedFor + "' max='" + semester.semesterDuration + "'></meter>")
		res.write(pageFoot);
		//et see valmis ja saadetaks
		return res.end();
	}
	else if (currentURL.pathname==="/picture")
	{
		res.writeHead(200, {"Content-Type":"text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write(tluPicture);
		res.write(pageFoot);
		//et see valmis ja saadetaks
		return res.end();
	}
	else if (currentURL.pathname==="/tlu_19.jpg")
	{
		console.log("tahan pilti");
		let filePath=path.join(__dirname, "public", "tluphotos/tlu_19.jpg");
		fs.readFile(filePath, (err, data)=>
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
	else if (currentURL.pathname==="/vp_banner.png")
	{
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
	
	//res.write('<script type="module" src="/src/main.js"></script>');
	//res.write('dateInfo')
}).listen(5210);
	//,dateInfo.midagimidagi(function(req,res)
		//{
		//	res.write('dateInfo')
		//})

//http://greeny.cs.tlu.ee:5210/
//5200 rinde port, unikaalne port 5210 arvutikohast M543-10, sisene greeny.cs.tlu.ee:5210 kui puttys www.js avatud
//Puhasta veidi süntaksi...millalgi.