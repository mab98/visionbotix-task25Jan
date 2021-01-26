'use strict'

const _ = require('lodash')

const validateNewPost = (req, res, next) => {
  const errorArray = []

  const { title, subtitle, content } = req.body

  // if (!_.isEmpty(title) && !_.isEmpty(subtitle) && !_.isEmpty(content)
  //   && title.length > 2 && title.length < 31 && subtitle.length > 2
  //   && subtitle.length < 41 && content.length > 49 && content.length < 1000) {
  //   errorArray.push('Valid Data')
  // }

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

  console.log('ERROR ARRAY: ', errorArray);

  if (errorArray.length == 0) {
    res.send('ARTICLE INSERTED')
    next()
  }
  else {
    res.send('CANNOT INSERT')
  }
}

module.exports = { validateNewPost };