const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

// Require the models.
const Article = require('../models/articleModel.js');
const Comment = require('../models/commentModel');



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
      let articleTitle = $(article).children('h2').text().trim();
      let articleLink = $(article).find("a").attr("href").trim();
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

router.get('/savedArticles', (req, res) => {
  // Query the database and return all the articles that have been saved.
  // Article.find({}).then(docs => {
  //   res.render('saved', {articles: docs});
  // })
     Article.find({})
     // Find any comments that are associated with the retrieved articles
      .sort({_id: -1})
      .populate("comments")
      .exec((err, docs) => {
        if (err) {
          console.log(err)
        } else {
          res.render('saved', { articles: docs});
        }
      })
})

// This route is
router.post('/save', (req, res) => {
  Article.create({
    headline: req.body.headline,
    url: req.body.url
  }).then((article) => {
    // re-direct the user back to the home page.
    console.log(article)
  }).catch((err) => {
    res.json(err)
  })
});

// This route is for saving a comment
router.post('/comment/:id', (req, res) => {
  Comment.create({
    post: req.body.comment
  }).then((dbComment) => {
    return Article.findOneAndUpdate({_id: req.params.id}, { $push: { comments: dbComment._id}}, {new: true})
  }).then((article) => {
    res.redirect('/savedArticles')
  }).catch((err) => {
    console.log(err)
  })
})



module.exports = router;
