module.exports = function(config) {
  var js_b_dir = process.env["JS_B_DIR"];
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    reporters: ['progress', 'junit', 'coverage'],
    browsers: ['Chrome'],
    autoWatch: true,
    singleRun: true,
    colors: true,

    files: [
      'lib/angular/angular.js',
      'lib/angular/angular-route.js',
      'lib/angular/angular-animate.js',
      'lib/jquery-1.11.0.min.js',
      'js/script.js',
      //Test-Specific Code
      'lib/angular/angular-mocks.js',
      'test/unit/**/*.js'
    ],
    preprocessors: {
      'js/script.js': 'coverage'
    },
    // the default configuration
    coverageReporter: {
      type: 'json',
      dir: js_b_dir + '/uni/'
    },
    junitReporter: {
      outputFile: js_b_dir + '/junit-test-results.xml',
      suite: ''
    }
  });
};