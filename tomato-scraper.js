const scrapeIt = require("scrape-it");

scrapeIt("https://www.rottentomatoes.com/celebrity/robert_de_niro/", {
  actor: "#main_container > div.col.col-left-center.col-full-xs > div.content_box > div > div.col-full-xs.col-sm-17.celeb_name",
  movies: {
    listItem: "tr[itemtype='https://schema.org/Movie']",
    
    data: {
      title: "td:nth-child(2) > a > span",
      year: "td:nth-child(5)",
      score: "td:nth-child(1) > span > span.tMeterScore",
      role: "td:nth-child(3) > ul > li > span"
    }
  }
}).then(page => {
  console.log(page);
});