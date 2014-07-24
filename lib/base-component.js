var _ = require('lodash');
var bluebird = require('bluebird');

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
   * Sometimes you will have tests the pass/fail randomly caused by timing issue, use this method to resolve those issues.  Use this method only for cases where
   * you need the extra time for the test to pass consistently so that you can just search for this method to find all tests that have that problem.
   *
   * @method flackyTiming
   *
   * @param {number} [timeToSleep=500] Time to sleep test in milliseconds (1000 === 1 second)
   */
  flackyTiming: function(timeToSleep) {
    timeToSleep = timeToSleep || 500;
    browser.sleep(timeToSleep);
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
   * Returns the number of visible elements there are for the passed selector.
   *
   * @method numberOfVisibleElements
   *
   * @param {string} CSS selector
   *
   * @return {promise} A promise that will resolve to the number of visible element the selector matches
   */
  numberOfVisibleElements: function(selector) {
    var defer = bluebird.defer();

    element.all(by.css(selector)).then(function(elements) {
      var elementsLeft = elements.length;
      var count = 0;
      elements.forEach(function(e) {
        e.isDisplayed().then(function(isDisplayed) {
          if(isDisplayed === true) {
            count += 1;
          }
          elementsLeft -= 1;

          if(elementsLeft < 1) {
            defer.resolve(count);
          }
        });
      }, function(error) {
        refer.reject(error);
      });
    }, function(error) {
      refer.reject(error);
    });

    return defer.promise;
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
    timeToWait = timeToWait || 5000;
    browser.driver.manage().timeouts().implicitlyWait(timeToWait);
    browser.driver.findElement(by.css(selector));
    browser.driver.manage().timeouts().implicitlyWait(0);
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
