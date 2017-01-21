var request = require('request');
var cheerio = require('cheerio');
var url = 'https://www.rottentomatoes.com/celebrity/robert_de_niro'

request(url, function( error, response, body) {
  if(!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    var movies = $("#filmographyTbl:nth-child(1)").find('tr');
    // console.log("Movies: " + movies);
    var movieLength = movies.length - 1; // Originally counted the header row
    console.log("# movies: " + movieLength);
    var json = [];
    for (var i = 0; i < movieLength; i++) {
      var jsonMember = {rating: "", title: "", year: ""};
      var rawRating = $("#filmographyTbl:nth-child(1) > tbody > tr:nth-child(" + i + ") > td:nth-child(1)").text();
      var rating = rawRating.trim();
      if (rating !== "") {
        jsonMember.rating = rating;
        var title = $("#filmographyTbl:nth-child(1) > tbody > tr:nth-child(" + i + ") > td:nth-child(2) > a > span").text();
        jsonMember.title = title;
        var year = $("#filmographyTbl:nth-child(1) > tbody > tr:nth-child(" + i + ") > td:nth-child(5)").text();
        jsonMember.year = year;
        console.log("Movie " + i + "item: " + jsonMember);
        json.push(jsonMember);
      }
    }
    console.log(json);

  } else {
    console.log(error);
  }
})