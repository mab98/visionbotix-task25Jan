const express = require('express')
const articleMiddleware = require('../middlewares/article.middleware')

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });

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
router.get('/article/:title', articleMiddleware.validateNewPost, (req, res) => {
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
router.post('/article/add', upload.single('image'), (req, res) => {
  // console.log('FILE INFO: ',req.file);
  const { title, subtitle, content, image } = req.body;
  Article.create({
    title: title,
    subtitle: subtitle,
    content: content,
    imageUrl: req.file.originalname
  }).catch((error) => {
    console.log(error);
    res.json({ message: error });
  })
  res.send('INSERTED')
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