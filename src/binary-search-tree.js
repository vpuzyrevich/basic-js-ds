const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
      this.base = null;
  }
  root() {
    if(!this.base) {
      return null;
    } else {
      return this.base;
    }
  }

  add(data) {
    this.base = addWithin(this.base, data);
    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }
      return node;
    }
  }
  iteration(callback) {
      const queue = [this.base];
      while(queue.length) {
          const node = queue.shift();
          callback(node);
          if(node.left) {
              queue.push(node.left);
          }
          if(node.right) {
              queue.push(node.right);
          }
      }
  }

  has(data) {
    return search(this.base, data);
    function search(node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }
      if(data < node.data) {
        return search(node.left, data);
      } else {
        return search(node.right, data);
      }
    }
  }

  find(data) {
    return search(this.base, data);
    function search(node, data) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;  
      }
      if(data < node.data) {
        return search(node.left, data);
      } else {
        return search(node.right, data);
      }
      
    }
  }

  remove(data) {
      this.base = removeNode(this.base, data);
      function removeNode(node, data) {
          if (!node) {
              return null;
          }
          if (data < node.data) {
              node.left = removeNode(node.left, data);
              return node;
          } else if (node.data < data) {
              node.right = removeNode(node.right, data);
              return node;
          } else {
              if (!node.left && !node.right) {
                  return null;
              }
              if (!node.left) {
                  node = node.right;
                  return node;
              }
              if (!node.right) {
                  node = node.left;
                  return node;
              }
              let minRight = node.right;
              while (minRight.left) {
                  minRight= minRight.left;
              }
              node.data = minRight.data;
              node.right = removeNode(node.right, minRight.data);

              return node;
          }
      }
  }

  min() {
    if (!this.base) {
        return;
    }
    let node = this.base;
    while (node.left) {
        node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.base) {
        return;
    }
    let node = this.base;
    while (node.right) {
        node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};