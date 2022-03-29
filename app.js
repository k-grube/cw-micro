/**
 * Created by kgrube on 5/2/2017.
 */
/**
 * Module dependencies.
 * @private
 */
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
require('dotenv').config({ path: '.env' })

const auth = require('./auth')
const bodyParser = require('body-parser')
const express = require('express')
const expressValidator = require('express-validator')
const logger = require('morgan')
const app = express()

// app setup
app.set('x-powered-by', false)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*
 * Required if express is behind a proxy, e.g. Heroku, nginx
 * https://github.com/expressjs/session/blob/master/README.md
 */
app.set('trust proxy', process.env.TRUST_PROXY === 1 ? 1 : 0)

// check every request for auth
app.use(auth.checkMemberCredentials)

// routes
const routes = require('./routes')

// mount
app.use('/', routes, (req, res) => res.sendStatus(401))

// Catch all route, return 404 if none of the above routes matched
app.all('*', (req, res) => {
  res.status(404).send('NOT FOUND')
})

const port = process.env.PORT ? process.env.PORT : 3000
const host = process.env.HOST ? process.env.HOST : 'localhost'

// start http server
app.listen(port, (err) => {
  if (err) {
    console.error('HTTP Startup Error', err)
  }

  console.log('\t==> 🚀 Listening on https://%s:%s/', host, port)
})

module.exports = app
