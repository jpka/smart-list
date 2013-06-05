describe("sl", function() {  
  var element;

  beforeEach(function() {
    element = fixtures.window().document.createElement("jpka-sl");
  });

  describe("items property", function() {
    it("gets", function() {
      element.$.list.appendChild(document.createElement("div"));
      expect(element.items).to.deep.equal(element.$.list.childNodes);
    });
  });

  it("addBatch() adds a batch of elements, attaching properties to them", function() {
    var models = ["a", "b", "c"].map(function(text) {
      return {
        model: {
          body: text
        }
      };
    }),
    childs;
    element.addBatch("single-element", models);
    childs = element.$.list.childNodes;

    expect(childs.length).to.equal(3);
    childs.forEach(function(ele) {
      expect(ele.nodeName).to.equal("LI");
      expect(ele.childNodes[0].nodeName).to.equal("SINGLE-ELEMENT");
      expect(ele.childNodes[0].model).to.exist.and.to.have.property("body");
    });
  });
});
