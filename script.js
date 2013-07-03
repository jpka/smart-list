Polymer.register(this, {
  entranceAnimationClass: "_smart-list-appear",
  get items() {
    return this.children;
  },
  push: function(node, props) {
    this.insert(this.items.length, node, props);
  },
  unshift: function(node, props) {
    this.insert(0, node, props);
  },
  insert: function(i, node, props) {
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

    this.animateEntrance(i);
  },
  animateEntrance: function(i) {
    var node = this.items[i],
    self = this,
    handler = function() {
      this.classList.remove(self.entranceAnimationClass);
      this.style.zIndex = 0;
    };

    node.addEventListener("webkitAnimationEnd", handler);
    node.addEventListener("animationend", handler);
    node.classList.add(this.entranceAnimationClass);
  },
  get: function(id) {
    return this.querySelector("#" + id);
  },
  rm: function(id) {
    var el = this.get(id);
    if (el) {
      this.removeChild(el);
    }
  },
  rmByIndex: function(index) {
    var el = this.items[index];
    if (el) {
      this.removeChild(el);
    }
  }
});