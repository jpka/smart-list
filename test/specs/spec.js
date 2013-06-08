describe("smart-collection", function() {  
  var element;

  beforeEach(function() {
    element = fixtures.window().document.createElement("smart-collection");
  });

  describe("add()", function() {
    it("adds an element of the type specified", function() {
      element.add("div");
      expect(element.childNodes.length).to.equal(1);
      expect(element.childNodes[0].nodeName).to.equal("DIV");
    });

    it("attaches properties to the element if they are declared as a second argument", function() {
      element.add("div", {name: "Dave"}); //Dave the div
      expect(element.childNodes[0].name).to.equal("Dave");
    });

    it("adds a batch of elements if a number is passed as second argument", function() {
      element.add("div", 3);
      expect(element.childNodes.length).to.equal(3);
    });

    it("adds a batch of elements, attaching properties to them if an array of properties is passed as second argument", function() {
      var models = ["a", "b", "c"].map(function(text) {
        return {
          model: {
            body: text
          }
        };
      }),
      childs;
      element.add("div", models);
      childs = element.childNodes;

      expect(childs.length).to.equal(3);
      childs.forEach(function(ele) {
        expect(ele.nodeName).to.equal("DIV");
        expect(ele.model).to.exist.and.to.have.property("body");
      });
    });
  });
});
