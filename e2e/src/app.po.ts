import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.waitForAngularEnabled().then(() => {
      return browser.get(browser.baseUrl + '/dashboard');
    }) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
}
