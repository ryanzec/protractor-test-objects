# Protractor Test Objects

A library to help with the use of page/component objects when testing with [Protractor](https://github.com/angular/protractor).  It also adds additonal functionality on top of protractor that is useful for testing.

It is intended that tests written with this library will move of Protractor specific code into page/component objects in order to make the test files themselves simplier, cleaner, and easier to understand.  This should allow for better reuse of code as each action and assertions should have it own method.

You will also noticed one liner methods and those are there to again make the test simple to read/write.  I find it much easier to remember and read this:

```javascript
page.sendKeysToPage('s');
```

compared to this:

```javascript
browser.actions().sendKeys('s').perform();
```

The goals is that the test files should be easy to read, have a consistent API, and have not Protractor or webdriver specific code in them.

# Installation

```npm install protractor-test-objects```

# Usage

*NOTE: Code examples assume Mocha/Chai setup.*

## Creating Component Object

```javascript
var protractorTestObjects = require('protractor-test-objects');
var helpComponent = protractorTestObjects.baseComponent.create();

//all selectors are defined here and are accessed through the getSelector() method
//that way if you do make a change to DOM, all selectors are located in one place,
//at the top of the file
helpComponent.selectors = {
  handle: '.handle',
  chat: '.chat'
};

helpComponent.clickChat = function() {
  $(this.getSelector('chat')).click();
};

helpComponent.isVisible = function() {
  expect($(this.getSelector('handle')).isDisplayed()).to.eventually.be.true;
};

module.exports = {
  create: function(baseSelector) {
    var newComponent = Object.create(helpComponent);
    newComponent.baseSelector = baseSelector;
    return newComponent;
  }
};
```

## Creating Page Objects

```javascript
var protractorTestObjects = require('protractor-test-objects');
var helpComponentFactory = require('../components/help');
var desktopPage = protractorTestObjects.basePage.create();

desktopPage.baseSelector = '.desktop-page';
desktopPage.baseUrl = '/desktop?uiTestingMode=true';

desktopPage.isVisible = function() {
  expect($(this.getSelector()).isDisplayed()).to.eventually.be.true;
};

desktopPage.getHelpComponent = function() {
  return helpComponentFactory.create(desktopPage.baseSelector + ' > .help');
};

module.exports = {
  create: function(appendUrl, autoOpen) {
    autoOpen = autoOpen === false ? false : true;
    var newDesktopPage = Object.create(desktopPage);

    if(autoOpen === true) {
      newDesktopPage.open(appendUrl);
    }

    return newDesktopPage;
  }
};
```

# API

## baseComponent

### baseSelector (string)

Base selector that can be prepended with the result of a call to `getSelector()`.

### selectors (object)

An object of selectors with the key being the name of the selector (used in method like `getSelector()`) and the value being the css selector.

### flackyTiming(number timeToWait)

Sometimes you will have tests the pass/fail randomly caused by timing issue, use this method to resolve those issues.  Use this method only for cases where you need the extra time for the test to pass consistently so that you can just search for this method to find all tests that have that problem.

### getSelector(string name, boolean withBase)

Returns a css selector string.

### promise getNumberOfVisibleElements(string selector)

Returns the number of visible elements there are for the passed selector.

### promise getNumberOfElements(string selector)

Returns the number of visible elements there are for the passed selector.

### waitForElement(string selector, number timeToWait)

Wait up to a specified time for the selector to return an element.

### sendKeysToPage(string keys)

Sends key to the browser but not specific to any element, useful for testing things like general keyboard shortcuts (that are not specifc to any element).

### takeScreenshot(string fileName, string path)

Takes a screenshot which is store in screenshots/* relative to the directory in which you started protractor (unless `path` is specificed).

### resizeBrowser(number width, number height)

Resize the browser.

### setImplicitWait(number timeToWait)

Sets the implicit wait timeout for web driver calls.

### repeatKey

Repeat a certain keys (or group of keys).

## basePage

### baseUrl (string)

Base URL for the page object.

### open(string appendUrl, boolean waitForAngular)

Open the browser to a url.

# License

MIT
