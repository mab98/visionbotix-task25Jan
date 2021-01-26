'use strict'
const fs = require('fs')
const { Article } = require('../models');

const addArticle = (req,res) => {
  try {
    var oldPath = req.files.image.path
    var newPath = './uploads/' + req.files.image.name
    var rawData = fs.readFileSync(oldPath)
    fs.writeFile(newPath, rawData, function (err) {
      if (err) console.log(err)
    })
  
    const { title, subtitle, content } = req.body;
    Article.create({ title: title, subtitle: subtitle, content: content, imageUrl: req.files.image.name })
    res.send('ARTICLE INSERTED')
  } catch (error) {
    console.log('ERROR: ', error);
    res.json({ message: error });
  }
}

module.exports = {addArticle}