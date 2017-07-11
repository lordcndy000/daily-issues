import { DailyIssuesPage } from './app.po';

describe('daily-issues App', () => {
  let page: DailyIssuesPage;

  beforeEach(() => {
    page = new DailyIssuesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
