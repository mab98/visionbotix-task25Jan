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
router.post('/article/add', upload.single('image'), async (req, res) => {
  // console.log('FILE INFO: ',req.file);
  try {
    const { title, subtitle, content, image } = await req.body;
    await Article.create({ title: title, subtitle: subtitle, content: content, imageUrl: req.file.originalname })
    res.send('ARTICLE INSERTED')
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
})

// DELETE ARTICLE
router.delete('/article/delete/:title', async (req, res) => {
  try {
    await Article.destroy({ where: { title: req.params.title } });
    res.send('DELETE ARTICLES')
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
})

// UPDATE ARTICLE
router.patch('/article/update/:title', async (req, res) => {
  const { subtitle, content } = req.body;
  try {
    await Article.update({
      subtitle: subtitle,
      content: content
    },
      { where: { title: req.params.title } }
    )
    res.json("UPDATED ARTICLE")
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
})

module.exports = router;