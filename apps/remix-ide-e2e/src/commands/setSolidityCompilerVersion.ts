import { NightwatchBrowser } from 'nightwatch'
import EventEmitter from 'events'

class SetSolidityCompilerVersion extends EventEmitter {
  command(this: NightwatchBrowser, version: string): NightwatchBrowser {
    this.api
      .waitForElementVisible({
        selector: "//*[@id='versionSelector']",
        locateStrategy: 'xpath'
      })
      .waitForElementPresent({
        selector: `//option[@value='${version}']`,
        locateStrategy: 'xpath'
      })
      .click(`#compileTabView #versionSelector [value="${version}"]`)
      .waitForElementPresent({
        selector: `//span[@data-version='${version}']`,
        locateStrategy: 'xpath',
        timeout: 60000
      })
      .perform(() => {
        this.emit('complete')
      })
    return this
  }
}

module.exports = SetSolidityCompilerVersion
