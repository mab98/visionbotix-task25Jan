'use strict'

const _ = require('lodash')

const validatePostArticle = (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  const errorArray = []

  const { title, subtitle, content } = req.body

  if (_.isEmpty(title)) {
    errorArray.push('Title Empty')
  }
  if (title.length < 2) {
    errorArray.push('Title less than 3')
  }
  if (title.length > 31) {
    errorArray.push('Title more than 30')
  }
  if (_.isEmpty(subtitle)) {
    errorArray.push('Subitle Empty')
  }
  if (subtitle.length < 2) {
    errorArray.push('Subtitle less than 3')
  }
  if (subtitle.length > 41) {
    errorArray.push('Subtitle more than 40')
  }
  if (_.isEmpty(content)) {
    errorArray.push('Content Empty')
  }
  if (content.length < 49) {
    errorArray.push('Content less than 50')
  }
  if (content.length > 1000) {
    errorArray.push('Content more than 1000')
  }
  if (!req.params.file) {
    console.log('NO FILE');
    errorArray.push('No Image File')
  }
  if (req.params.file) {
    console.log(' FILE', req.params.file);
    errorArray.push('File')
  }

  console.log('ERROR ARRAY: ', errorArray);

  if (errorArray.length == 0) {
    res.send('ARTICLE INSERTED')
    next()
  }
  else {
    res.send('CANNOT INSERT')
  }
}

module.exports = { validatePostArticle };