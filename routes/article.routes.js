const express = require('express')
const formidable = require('formidable')

const router = express.Router();

const { Article } = require('../models')

// GET ALL ARTICLES
router.get('/articles', (req, res) => {
  Article.findAll()
  .then((articles) => {
      res.send(articles)
    })
    .catch(error => {
      console.log(error);
    })
})

// GET ARTICLE BY TITLE
router.get('/article/:title', (req, res) => {
  Article.findAll({ where: { title: req.params.title } })
    // Article.findOne({where:{title:req.params.title}})
    .then((articles) => {
      res.send(articles)
    })
    .catch(error => {
      console.log(error);
      res.json({ message: error });
    })
})

// ADD ARTICLE
router.post('/article/add', (req, res) => {
  const { title, subtitle, content } = req.body;
  Article.create({
    title: title,
    subtitle: subtitle,
    content: content
  }).catch((error) => {
    console.log(error);
    res.json({ message: error });
  })
  res.send('INSERT ARTICLES')
})

// DELETE ARTICLE
router.delete('/article/delete/:title', (req, res) => {
  Article.destroy({ where: { title: req.params.title } });
  res.send('DELETE ARTICLES')
})

// UPDATE ARTICLE
router.patch('/article/update/:title', (req, res) => {
  const { subtitle, content } = req.body;
  Article.update({
    subtitle: subtitle,
    content: content
  },
    { where: { title: req.params.title } }
  )
    .then(() => {
      res.json("UPDATED ARTICLE")
    })
    .catch(error => {
      console.log(error);
      res.json({ message: error });
    })
})

module.exports = router;