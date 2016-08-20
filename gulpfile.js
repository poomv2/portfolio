var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');

var bower = require('gulp-bower');
var bowerFiles = require('main-bower-files');
var bowerNormalizer = require('gulp-bower-normalize');

var browserSync = require('browser-sync').create();

var OUTPUT_STYLE = 'expanded';
var SITE_PATH = './bower_components/foundation-sites/scss';

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('browser-sync', ['sass'], function() {
	browserSync.init({
		server: "./htdocs"
	});

	gulp.watch('./assets/scss/**/*.scss', ['sass'])
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

	gulp.watch('htdocs/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function() {
	return gulp.src('./assets/scss/main.scss')
	.pipe(
    sass(
      {
		      includePaths: SITE_PATH,
          outputStyle: OUTPUT_STYLE
	    }
    ).on('error', sass.logError)
  )
	.pipe(sourcemaps.write('.htdocs/css/maps'))
	.pipe(autoprefixer(autoprefixerOptions))
	.pipe(
    concat('main.css')
  )
	.pipe(
    gulp.dest('./htdocs/css')
  )
	.pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
	return gulp.watch(['./assets/scss/**/*.scss', './assets/scss/*.scss'], ['sass'])
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('bower', function() {
	return bower();
});

gulp.task('bower-normalize', ['bower'], function()
	{
		return gulp.src(bowerFiles(), {
							base: './bower_components'
						}
		).pipe(
			bowerNormalizer({
								bowerJson: './bower.json',
								flatten: true
							})
		).pipe(
			gulp.dest('./htdocs/vendor/')
		);
	}
);


gulp.task('default', ['sass']);
