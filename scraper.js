var request = require('request');
var cheerio = require('cheerio');
var url = 'https://www.rottentomatoes.com/celebrity/robert_de_niro'

request(url, function( error, response, body) {
  if(!error) {
    var $ = cheerio.load(body);
    // var name = $('#main_container > div.col.col-left-center.col-full-xs > div.content_box > div > div.col-full-xs.col-sm-17.celeb_name').text();
    var movies = $("tr[itemtype='https://schema.org/Movie']");
    var json = [];

    for (var i = 0; i < movies.length; i++) {
      var jsonMember = {rating: "", title: "", year: ""};
      var rawRating = $("#filmographyTbl:nth-child(1) > tbody > tr:nth-child(" + i + ") > td:nth-child(1)").text();
      var rating = rawRating.trim();
      if (rating !== "") {
        jsonMember.rating = rating;
        var title = $("#filmographyTbl:nth-child(1) > tbody > tr:nth-child(" + i + ") > td:nth-child(2) > a > span").text();
        jsonMember.title = title;
        var year = $("#filmographyTbl:nth-child(1) > tbody > tr:nth-child(" + i + ") > td:nth-child(5)").text();
        jsonMember.year = year;
        json.push(jsonMember);
      }
    }
    console.log(json);

  } else {
    console.log(error);
  }
})