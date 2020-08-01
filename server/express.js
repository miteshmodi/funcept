const express = require('express')
const path = require('path')
import bodyParser from 'body-parser'

import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
// import postRoutes from './routes/post.routes'
import { StaticRouter } from 'react-router-dom'

// modules for server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'

//comment out before building for production
import devBundle from './devBundle'
import App from '../client/App'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

//comment out before building for production
devBundle.compile(app)

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)

app.get('*', (req, res) => {
  const context = {}

  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  )

  res.status(200).send(Template({
    markup: markup
  }))
})

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message })
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message })
    console.log(err)
  }
})

export default app