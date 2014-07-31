describe('slow calculator', function() {
  beforeEach(function() {
    browser.get('http://localhost:7899/ctf');
  });

  it('Show book...', function() {
    element(by.id('item_0')).click();
    browser.getCurrentUrl().then(function(url) {
      console.log(url);
      expect(url).toContain('#/Book/0?name=bk-0');
    });
  });
  it('All end...', function() {
    console.log("All end");
  });
});