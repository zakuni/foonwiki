gulp   = require 'gulp'
coffee = require 'gulp-coffee'

gulp.task 'coffee', ->
  gulp.src('./public/js/foonwiki/*.coffee')
    .pipe coffee()
    .pipe gulp.dest('./public/js/foonwiki/')

gulp.task 'default', ['coffee']
