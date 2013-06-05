describe("element-collection", function() {  
  var element;

  before(function() {
    element = fixtures.window().document.createElement("jpka-elements-collection");
  });

  it("has a list", function() {
    expect(element.$.list).to.exist;
  });

  describe("addBatch()", function() {
    var models;

    before(function() {
      models = ["a", "b", "c"].map(function(text) {
        return {
          model: {
            body: text
          }
        };
      });
      element.addBatch("single-element", models);
    });

    it("adds a batch of elements, attaching properties to them", function() {
      expect(element.elements.length).to.equal(3);
      element.elements.forEach(function(ele) {
        expect(ele.tagName).to.equal("SINGLE-ELEMENT");
        expect(ele.model).to.have.property("body");
      });
    });

    it("also aggregates them to the list as list items", function() {
      expect(element.$.list.childNodes.length).to.equal(element.elements.length);
      element.$.list.childNodes.forEach(function(ele) {
        expect(ele.tagName).to.equal("LI");
        expect(ele.childNodes[0].tagName).to.equal("SINGLE-ELEMENT");
      });
    });
  });
});
