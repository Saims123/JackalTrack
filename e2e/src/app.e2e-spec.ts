import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App-Dashboard', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display dashboard', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Dashboard');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      })
    );
  });
});
