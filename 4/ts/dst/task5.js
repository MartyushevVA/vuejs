"use strict";
class TreeNode {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        this._insertNode(this.root, newNode);
    }
    _insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null)
                node.left = newNode;
            else
                this._insertNode(node.left, newNode);
        }
        else if (newNode.value > node.value) {
            if (node.right === null)
                node.right = newNode;
            else
                this._insertNode(node.right, newNode);
        }
    }
    search(value) {
        return this._searchNode(this.root, value);
    }
    _searchNode(node, value) {
        if (node === null)
            return false;
        if (value === node.value)
            return true;
        return this._searchNode(value < node.value ? node.left : node.right, value);
    }
    delete(value) {
        this.root = this._deleteNode(this.root, value);
    }
    _deleteNode(node, value) {
        if (node === null)
            return null;
        if (value < node.value) {
            node.left = this._deleteNode(node.left, value);
        }
        else if (value > node.value) {
            node.right = this._deleteNode(node.right, value);
        }
        else {
            // Найдена удаляемая нода
            if (node.left === null && node.right === null)
                return null;
            if (node.left === null)
                return node.right;
            if (node.right === null)
                return node.left;
            // У ноды два потомка: берём минимум из правого поддерева
            const minRightNode = node.right; // гарантированно не null благодаря проверке выше
            const minValue = this._findMin(minRightNode).value;
            node.value = minValue;
            node.right = this._deleteNode(node.right, minValue);
        }
        return node;
    }
    _findMin(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }
    update(oldValue, newValue) {
        if (!this.search(oldValue))
            return false;
        this.delete(oldValue);
        this.insert(newValue);
        return true;
    }
    getHeight() {
        return this._getHeight(this.root);
    }
    _getHeight(node) {
        if (node === null)
            return 0;
        const leftH = this._getHeight(node.left);
        const rightH = this._getHeight(node.right);
        return 1 + Math.max(leftH, rightH);
    }
}
// Пример использования
const bst = new BinarySearchTree();
[10, 5, 15, 3, 7].forEach(v => bst.insert(v));
console.log("Height:", bst.getHeight()); // 3
console.log("Search 7:", bst.search(7)); // true
bst.delete(5);
console.log("Search 5 after delete:", bst.search(5)); // false
bst.update(15, 20);
console.log("Search 20 after update:", bst.search(20)); // true
