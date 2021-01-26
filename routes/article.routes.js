const fs = require('fs')
const express = require('express')
const articleMiddleware = require('../middlewares/article.middleware')
const articleController = require('../controllers/article.controller')
const formidable = require('formidable');

const router = express.Router();

const { Article } = require('../models');

// GET ALL ARTICLES
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.send(articles)
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
})

// GET ARTICLE BY TITLE
router.get('/article/:title', async (req, res) => {
  try {
    const articles = await Article.findAll({ where: { title: req.params.title } })
    // const articles = await Article.findOne({where:{title:req.params.title}})
    res.send(articles)
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
})

// ADD ARTICLE
router.post('/article/add', articleMiddleware.attachBodyAndFiles, articleMiddleware.validatePostArticle, articleController.addArticle)

// DELETE ARTICLE
router.delete('/article/delete/:title', async (req, res) => {
  try {
    const article = await Article.findOne({ where: { title: req.params.title } })
    if (article) {
      const image = await article.imageUrl;
      // console.log(image);
      const path = `./uploads/${article.imageUrl}`
      // console.log(path);
      if (path) {
        fs.unlinkSync(path)
      }
      await Article.destroy({ where: { title: req.params.title } });
      return res.send('DELETED ARTICLES')
    }
    else {
      return res.send(`NO ARTICLE WITH TITLE: ${req.params.title}`)
    }
  }
  catch (error) {
    console.log(error);
    res.json({ message: error });
  }
})

// UPDATE ARTICLE
router.patch('/article/update/:title', async (req, res) => {
  try {
    const article = await Article.findOne({ where: { title: req.params.title } })
    if (article) {
      const { title, subtitle, content, image } = req.body;
      if (article.imageUrl !== req.params.originalname) {
        const path = `./uploads/${article.imageUrl}`
        if (path) {
          fs.unlinkSync(path)
        }
      }
      await Article.update({ title: title, subtitle: subtitle, content: content, imageUrl: req.file.originalname }, { where: { title: req.params.title } })
      res.json("UPDATED ARTICLE")
    }
    else {
      return res.send(`NO ARTICLE WITH TITLE: ${req.params.title}`)
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
})

module.exports = router;