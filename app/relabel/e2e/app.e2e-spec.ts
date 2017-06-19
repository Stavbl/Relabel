import { RelabelPage } from './app.po';

describe('relabel App', () => {
  let page: RelabelPage;

  beforeEach(() => {
    page = new RelabelPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
