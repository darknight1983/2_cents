const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

// Require the Article model.
const Article = require('../models/articleModel.js');



// This route is for scraping the "theverge.com" and for saving the data from
// the site into mlab.
router.get("/", (req, res) => {
  const stuff = [];
  // Use Request to make a backend request to "The Verge.com"
  request('https://www.theverge.com', (err, response, body) => {
    // If error, handle the error
    if(err) {
      console.log(err)
    }
    // Load body into cheerio
    const $ = cheerio.load(body);

    $('.c-entry-box--compact__body').each((i, article) => {
      // TODO: Check to see if the articles that are stored in the database are
      // identical to the articles that are being scarped each time a user visits
      // the site.


      // Find a way to traverse to get the information you need to
      // save in mlab.
      let articleTitle = $(article).children('h2').text();
      let articleLink = $(article).find("a").attr("href");
      let articleImg = $(article).parent().children('a').children('div').children('img').attr('src');
      console.log(articleImg)

      // Construct objects using the data from scraped from "theverge.com" and
      // push that data to the stuff array.
      stuff.push({
        title: articleTitle,
        link: articleLink,
        img: articleImg
      });
    })
    // Here is where you should save the articles to Mongodb/mLab
    res.render('home', { articles: stuff });
  })
});

// This route is for saving comments and will have to be refactored to meet the
// requirements.
router.post('/save', (req, res) => {
  Article.create({
    headline: req.body.headline,
    url: req.body.url
  }).then((article) => {
    res.json(article)
  }).catch((err) => {
    res.json(err)
  })
});

router.post('/comment', (req, res) => {
  console.log(req.body.comment)
})



module.exports = router;
