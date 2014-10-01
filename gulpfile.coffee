gulp   = require 'gulp'
order  = require 'gulp-order'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'

path = './public/**/*.coffee'

gulp.task 'coffee', ->
  gulp.src(path)
    .pipe order([
      "**/models/*.coffee",
      "**/foonwiki.coffee"
    ])
    .pipe concat('foonwiki.coffee')
    .pipe coffee()
    .pipe gulp.dest('./public/js/foonwiki/')

gulp.task 'watch', ->
  gulp.watch path, ['coffee']

gulp.task 'default', ['watch', 'coffee']
