var baseComponentFactory = require('./base-component');
var basePage = baseComponentFactory.create();

/**
 * Base URL for the page object.
 *
 * @property baseUrl
 * @type {string}
 */
basePage.baseUrl = '';

/**
 * Open the browser to a url.
 *
 * @method open
 *
 * @param {string} [appendUrl] A string to append to the base url
 * @param {boolean} [waitForAngular=true] Whethor or not to wait for Angular to finish
 */
basePage.open = function(appendUrl, waitForAngular) {
  waitForAngular = waitForAngular === false ? false : false;
  appendUrl = appendUrl || '';
  browser.get(this.baseUrl + appendUrl);

  if(waitForAngular !== false) {
    browser.waitForAngular();
  }
};

module.exports = {
  /**
   * Create a new base page object.
   *
   * @method create
   *
   * @param {string} url Base url for the page
   *
   * @return {object} New base component object
   */
  create: function(url) {
    var newComponent = Object.create(basePage);
    newComponent.baseUrl = url;
    return newComponent;
  }
};
