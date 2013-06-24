// Copyright 2011 Software Freedom Conservancy. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var base = require('./_base'),
    executors = require('./executors');

var goog = base.require('goog'),
    AbstractBuilder = base.require('webdriver.AbstractBuilder'),
    Capability = base.require('webdriver.Capability'),
    WebDriver = base.require('webdriver.WebDriver'),
    promise = base.require('webdriver.promise');


/**
 * @param {!webdriver.Capabilities} capabilities The desired capabilities.
 * @return {webdriver.WebDriver} A new WebDriver instance or {@code null}
 *     if the requested browser is not natively supported in Node.
 */
function createNativeDriver(capabilities) {
  switch (capabilities.get(Capability.BROWSER_NAME)) {
    case 'chrome':
      // Requiring 'chrome' above would create a cycle:
      // index -> builder -> chrome/index -> index
      var chrome = require('./chrome');
      return new chrome.Builder().withCapabilities(capabilities).build();

    default:
      return null;
  }
}



/**
 * @constructor
 * @extends {webdriver.AbstractBuilder}
 */
var Builder = function() {
  goog.base(this);
};
goog.inherits(Builder, AbstractBuilder);


/**
 * @override
 */
Builder.prototype.build = function() {
  var url = this.getServerUrl();

  // If a remote server wasn't specified, check for browsers we support
  // natively in node before falling back to using the java Selenium server.
  if (!url) {
    var driver = createNativeDriver(this.getCapabilities());
    if (driver) {
      return driver;
    }

    // Nope, fall-back to using the default java server.
    url = AbstractBuilder.DEFAULT_SERVER_URL;
  }

  var executor = executors.createExecutor(url);
  return WebDriver.createSession(executor, this.getCapabilities());
};


// PUBLIC API


exports.Builder = Builder;
