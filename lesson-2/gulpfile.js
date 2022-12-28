const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// exports.default = function (done) {
//   console.log('Hello from my first app');
//   done();
// }

// exports.copy = function () {
//   return src('src/main.scss').pipe(dest('output'))
// }

function build() {
  return src('src/main.scss').pipe(sass()).pipe(dest('output'));
}


exports.build = build
