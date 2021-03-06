express = require 'express'
path = require 'path'
favicon = require 'serve-favicon'
logger = require 'morgan'
cookieParser = require 'cookie-parser'
bodyParser = require 'body-parser'

knex = require('knex')(
  client: 'pg'
  connection: process.env.DATABASE_URL || 'postgres://localhost:5432/foonwiki?sslmode=disable'
)
bookshelf = require('bookshelf')(knex)

app = express()

app.set('bookshelf', bookshelf)

routes = require('./routes/index')(app)
pages = require('./routes/pages')(app)

# view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

# uncomment after placing your favicon in /public
#app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('node-compass')({mode: 'expanded'}))


app.use('/', routes)
app.use('/pages', pages)

# catch 404 and forward to error handler
app.use((req, res, next) ->
  err = new Error('Not Found')
  err.status = 404
  next(err)
)

# error handlers

# development error handler
# will print stacktrace
if app.get('env') is 'development'
  app.use((err, req, res, next) ->
    res.status(err.status or 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  )

# production error handler
# no stacktraces leaked to user
app.use((err, req, res, next) ->
  res.status(err.status or 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
)


module.exports = app
