describe("smart-collection", function() {  
  var element;

  beforeEach(function() {
    element = fixtures.window().document.createElement("smart-collection");
  });

  describe("push()", function() {
    it("adds an element of the type specified", function() {
      element.push("div");
      expect(element.items.length).to.equal(1);
      expect(element.items[0].nodeName).to.equal("DIV");
    });

    it("attaches properties to the element if they are declared as a second argument", function() {
      element.push("div", {name: "Dave"}); //Dave the div
      expect(element.items[0].name).to.equal("Dave");
    });
  });

  describe("unshift()", function() {
    it("works", function() {
      element.$.container.appendChild(document.createElement("div"));
      element.unshift("span");
      expect(element.items.length).to.equal(2);
      expect(element.items[0].nodeName).to.equal("SPAN");
    });
  });

  describe("get() and remove()", function() {
    var div;

    beforeEach(function() {
      div = document.createElement("div");
      div.id = "a";
      element.$.container.appendChild(div);
    });

    it("get() retrieves the item by id", function() {
      expect(element.get("a")).to.deep.equal(div);
    });

    it("remove() removes the item matching an id", function() {
      element.remove("a");
      expect(element.items.length).to.equal(0);
    });
  });

  it("removeByIndex() works", function() {
    element.push("div", {id: "a"});
    element.push("div", {id: "b"});
    element.push("div", {id: "c"});
    element.removeByIndex(1);
    expect(element.items.length).to.equal(2);
    expect(element.items[0].id).to.equal("a");
    expect(element.items[1].id).to.equal("c");
  });
});
