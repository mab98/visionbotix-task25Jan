const express = require('express')

const app = express()

const db = require('./models')
const router = require('./routes/article.routes')

app.use(express.json())
app.use(router)

db.sequelize.sync().then((req) => {
  app.listen(5001, () => {
    console.log('server running')
  })
})