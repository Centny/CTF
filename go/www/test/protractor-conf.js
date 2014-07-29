// Tests for the calculator.
exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  specs: [
    'e2e/scriptSpec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },
};
