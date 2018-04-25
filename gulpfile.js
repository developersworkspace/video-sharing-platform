const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('copy-package.json', function () {
    return gulp.src('./package.json').pipe(gulp.dest('./dist'));
});

gulp.task('copy-web.config', function () {
    return gulp.src('./web.config').pipe(gulp.dest('./dist'));
});

gulp.task('build', function () {
    runSequence(
        'copy-package.json',
        'copy-web.config',
    );
});