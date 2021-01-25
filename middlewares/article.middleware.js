'use strict'

const _ = require('lodash')

const validateNewPost = (req, res, next) => {
  const { title, subtitle, content } = req.body
  const errorArray = []
  if (_.isEmpty(title) && title.length < 3 && title.length > 30) {
    errorArray.push('title unvalidated')
  }
  else if (_.isEmpty(subtitle) && subtitlesubtitle.length < 3 && title.length > 40) {
    errorArray.push('subtitle unvalidated')
  }
  else if (_.isEmpty(content) && title.length < 50 && title.length > 1000) {
    errorArray.push('content unvalidated')
  }
  else {
    errorArray.push('Validated')
  }
}

module.exports = { validateNewPost };