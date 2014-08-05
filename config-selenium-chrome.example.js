var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

//this will show errors as they happen
chai.config.includeStack = true;

chai.use(chaiAsPromised);

//since we are using mocha/chai, we need to change the global expect to chai's expect
expect = chai.expect;

exports.config = {
  framework: 'mocha',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./tests/**/*.spec.js'],
  params: {},
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 5
  },
  onPrepare: function() {
    var width = 1024;
    var height = 768;
    browser.driver.manage().window().setSize(width, height);
  },
  mochaOpts: {
    slow: 5000,
    reporter: 'spec'
  }
};
