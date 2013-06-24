## v2.34.0-dev

* Added the `selenium-webdriver/testing/asserts` module. This module
    simplifies writing assertions against promised values (see
    example in module documentation).
* Added the `webdriver.Capabilities` class.
* Removed the deprecated `webdriver.Deferred#resolve` and
    `webdriver.promise.resolved` functions.
* Added native support for the ChromeDriver. Use `selenium-webdriver/chrome`.
    When using the `Builder`, requesting chrome without specifying a remote
    server URL will default to the native ChromeDriver implementation.
* Changed signature of `SeleniumServer` to `SeleniumServer(jar, options)`.
* Removed the ability to connect to an existing session from the Builder. This
    feature is intended for use with the browser-based client.

## v2.33.0

* Added support for WebDriver's logging API
* FIXED: 5511: Added webdriver.manage().timeouts().pageLoadTimeout(ms)

## v2.32.1

* FIXED: 5541: Added missing return statement for windows in
    `portprober.findFreePort()`

## v2.32.0

* Added the `selenium-webdriver/testing` package, which provides a basic
    framework for writing tests using Mocha. See
    `selenium-webdriver/example/google_search_test.js` for usage.
* For Promises/A+ compatibility, backing out the change in 2.30.0 that ensured
    rejections were always Error objects. Rejection reasons are now left as is.
* Removed deprecated functions originally scheduled for removal in 2.31.0
    * promise.Application.getInstance()
    * promise.ControlFlow#schedule()
    * promise.ControlFlow#scheduleTimeout()
    * promise.ControlFlow#scheduleWait()
* Renamed some functions for consistency with Promises/A+ terminology. The
    original functions have been deprecated and will be removed in 2.34.0:
    * promise.resolved() -> promise.fulfilled()
    * promise.Deferred#resolve() -> promise.Deferred#fulfill()
* FIXED: remote.SeleniumServer#stop now shuts down within the active control
    flow, allowing scripts to finish. Use #kill to shutdown immediately.
* FIXED: 5321: cookie deletion commands

## v2.31.0

* Added an example script.
* Added a class for controlling the standalone Selenium server (server
available separately)
* Added a portprober for finding free ports
* FIXED: WebElements now belong to the same flow as their parent driver.

## v2.30.0

* Ensures promise rejections are always Error values.
* Version bump to keep in sync with the Selenium project.

## v2.29.1

* Fixed a bug that could lead to an infinite loop.
* Added a README.md

## v2.29.0

* Initial release for npm:

        npm install selenium-webdriver
