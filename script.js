Polymer("smart-list", {
  applyAuthorStyles: true,

  newMessage: "There are new items, do you want to see them?",
  newItems: [],

  get items() {
    return this.children;
  },
  push: function(node, props, soft) {
    return this.insert(this.items.length, node, props, soft);
  },
  unshift: function(node, props, soft) {
    return this.insert(0, node, props, soft);
  },
  insert: function(i, node, props, soft) {
    if (typeof node === "string") node = document.createElement(node);
    if (props) {
      for (prop in props) {
        node[prop] = props[prop];
      }
    }

    if (i >= this.items.length) {
      this.appendChild(node);
    } else {
      this.insertBefore(node, this.items[i]);
    }

    if (soft) {
      node.style.display = "none";
      this.newItems.push(node);
      this.$.newPrompt.style.visibility = "visible";
    }

    return node;
  },
  get: function(id) {
    return this.querySelector("#" + id);
  },
  removeById: function(id, soft) {
    var el = this.get(id);
    if (el) {
      this.removeItem(el, soft);
    }
  },
  removeByIndex: function(index, soft) {
    var el = this.items[index];
    if (el) {
      this.removeItem(el, soft);
    }
  },
  removeItem: function(item, soft) {
    var curtain = document.createElement("div");
    curtain.className = "curtain";

    if (soft) {
      item.appendChild(curtain);
    } else {
      this.removeChild(item);
    }
  },
  showNew: function() {
    this.newItems.forEach(function(item) {
      item.style.display = "block";
    });
    this.$.newPrompt.style.visibility = "hidden";
    this.newItems = [];
  }
});