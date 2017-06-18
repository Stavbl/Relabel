import { RelabelAppPage } from './app.po';

describe('relabel-app App', () => {
  let page: RelabelAppPage;

  beforeEach(() => {
    page = new RelabelAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
