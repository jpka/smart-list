window.expect = chai.expect;
window.should = chai.should();

before(function(done) {
  fixtures.load("../../../base/test/index.html");
  fixtures.window().addEventListener("WebComponentsReady", function() {
    done();
  });
});
