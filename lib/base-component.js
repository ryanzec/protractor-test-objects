var _ = require('lodash');
var fs = require('fs');
var mkdirp = require('mkdirp');

var baseComponent = {
  /**
   * Base selector that can be prepended with the result of a call to getSelector().
   *
   * @property baseSelector
   * @type {string}
   */
  baseSelector: '',

  /**
   * An object of selectors with the key being the name of the selector (used in method like getSelector) and the value being the css selector.
   *
   * @property selectors
   * @type {object}
   */
  selectors: {},

  /**
   * Sends key to the browser but not specific to any element, useful for testing things like general keyboard shortcuts (that are not specifc to any element)
   *
   * @method sendKeys
   *
   * @param {string} keys Keys to send to browser
   */
  sendKeysToPage: function(keys) {
    $('body').sendKeys(keys);
  },

  /**
   * Takes a screenshot which is store in screenshots/* relative to the directory in which you started protractor (unless `path` is specificed)
   *
   * @method takeScreenshot
   *
   * @param {string} fileName Name of the file without extension with the screenshot (automatically saved as .png)
   * @param {string} path Path for the screenshot to be places
   */
  takeScreenshot: function(fileName, path) {
    path = path || 'screenshots/';

    if(!fs.exists(path)) {
      mkdirp(path);
    }

    browser.takeScreenshot().then(function(png) {
      var stream = fs.createWriteStream(path + fileName + '.png');
      stream.write(new Buffer(png, 'base64'));
      stream.end();
    });
  },

  /**
   * Resize the browser
   *
   * @method resizeBrowser
   *
   * @param {number} width Width of the browser
   * @param {number} height Height of the browser
   */
  resizeBrowser: function(width, height) {
    browser.manage().window().setSize(width, height);
  },

  /**
   * Returns a css selector string.
   *
   * @method getSelector
   *
   * @param {string} name, Name of the selector (the key of the selectors object)
   * @param {boolean} [withBase=true] Whether or not to include the base selector in the resulting css selector
   *
   * @return {string} The css selector
   */
  getSelector: function(name, withBase) {
    withBase = _.isBoolean(withBase) ? withBase : true;
    var selector = '';

    if(name && this.selectors[name]) {
        selector = this.selectors[name];
    }

    if(withBase && this.baseSelector) {
        selector = this.baseSelector + ' ' + selector;
    }

    return selector;
  },

  /**
   * Wait up to a specified time for the selector to return an element.
   *
   * @method waitForElement
   *
   * @param {string} selector Css selector to search for
   * @param {number} [timeToWait=5000] Time to wait for the element to exist in milliseconds (1000 === 1 second)
   */
  waitForElement: function(selector, timeToWait) {
    this.setImplicitWait(timeToWait || 5000);
    browser.findElement(by.css(selector));
    this.setImplicitWait(0);
  },

  waitAndFindElement: function(selector, timeToWait) {
    this.setImplicitWait(timeToWait || 5000);
    var element = browser.findElement(by.css(selector));
    this.setImplicitWait(0);

    return element;
  },

  /**
   * Wait up to a specified time for the selector to return an element.
   *
   * @method waitForElements
   *
   * @param {string} selector Css selector to search for
   * @param {number} [timeToWait=5000] Time to wait for the element to exist in milliseconds (1000 === 1 second)
   */
  waitForElements: function(selector, timeToWait) {
    this.setImplicitWait(timeToWait || 5000);
    browser.findElements(by.css(selector));
    this.setImplicitWait(0);
  },

  waitAndFindElements: function(selector, timeToWait) {
    this.setImplicitWait(timeToWait || 5000);
    var elements = browser.findElements(by.css(selector));
    this.setImplicitWait(0);

    return elements;
  },

  /**
   * Sets the implicit wait timeout for web driver calls.
   *
   * @method setImplicitWait
   *
   * @param {number} timeToWait Time to wait (in milliseconds)
   */
  setImplicitWait: function(timeToWait) {
    browser.manage().timeouts().implicitlyWait(timeToWait);
  },

  /**
   * Repeat a certain key (or group of keys).
   *
   * @method repeatKeys
   *
   * @param {string} keys Key or group of keys to repeat
   * @param {number} repeatCount The number of times to repeat the key(s).
   *
   * @return {string} The string of repeated keys
   */
  repeatKeys: function(keys, repeatCount) {
    return (new Array(repeatCount + 1)).join(keys);
  }
};

module.exports = {
  /**
   * Create a new base component objet.
   *
   * @method create
   *
   * @return {object} New base component object
   */
  create: function() {
    return Object.create(baseComponent);
  }
};
