gulp   = require 'gulp'
order  = require 'gulp-order'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'

gulp.task 'coffee', ->
  gulp.src('./public/**/*.coffee')
    .pipe order([
      "**/models/*.coffee",
      "**/foonwiki.coffee"
    ])
    .pipe concat('foonwiki.coffee')
    .pipe coffee()
    .pipe gulp.dest('./public/js/foonwiki/')

gulp.task 'default', ['coffee']
