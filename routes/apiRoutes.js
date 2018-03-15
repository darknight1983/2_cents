const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

// Require the Article model.
const Article = require('../models/articleModel.js');




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
      // Find a way to traverse to get the information you need to
      // save in mlab.
      let articleTitle = $(article).children('h2').text();
      let articleLink = $(article).find("a").attr("href");

      stuff.push({
        title: articleTitle,
        link: articleLink
      })
    })
    res.render('home', { articles: stuff });
  })
});

router.post('/save', (req, res) => {
  Article.create({
    headline: req.body.headline,
    url: req.body.url
  }).then((article) => {
    res.json(article)
  }).catch((err) => {
    res.json(err)
  })
})



module.exports = router;
