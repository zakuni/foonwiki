var gulp   = require('gulp');
var coffee = require('gulp-coffee');

gulp.task('coffee', function() {
  gulp.src('./public/js/foonwiki/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('./public/js/foonwiki/'))
});

gulp.task('default', ['coffee']);
