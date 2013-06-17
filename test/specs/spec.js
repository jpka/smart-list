describe("smart-list", function() {  
  var element;

  beforeEach(function() {
    element = fixtures.window().document.createElement("smart-list");
  });

  describe("insert()", function() {
    it("adds an element of the type specified", function() {
      element.insert(0, "div");
      element.insert(0, "span");
      element.insert(1, "ul");
      element.insert(3, "input");
      expect(element.items[0].nodeName).to.equal("SPAN");
      expect(element.items[1].nodeName).to.equal("UL");
      expect(element.items[2].nodeName).to.equal("DIV");
      expect(element.items[3].nodeName).to.equal("INPUT");
    });

    it("attaches properties to the element if they are declared as a third argument", function() {
      element.insert(0, "div", {name: "Dave"}); //Dave the div
      expect(element.items[0].name).to.equal("Dave");
    });
  });

  describe("get() and remove()", function() {
    var div;

    beforeEach(function() {
      div = fixtures.window().document.createElement("div");
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
