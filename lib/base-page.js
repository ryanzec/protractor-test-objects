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
 */
basePage.open = function(appendUrl) {
  appendUrl = appendUrl || '';

  if(appendUrl.length > 0) {
    appendUrl = (this.baseUrl.indexOf('?') !== -1) ? '&' + appendUrl : '?' + appendUrl;
  }

  browser.get(this.baseUrl + appendUrl);
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
