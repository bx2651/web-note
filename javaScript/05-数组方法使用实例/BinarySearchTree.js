class BinarySearchTree {
  constructor() {
    this.root = null
  }
  node(value) {
    let node = {}
    node.key = value
    node.left = null
    node.right = null
    return node
  }
  insert(value) {
    let node = this.node(value)
    if (!this.root) {
      this.root = node
      return
    } else {
      this.insertNode(this.root, node)
    }
  }

  insertNode(node, newNode) {
    if (newNode.key < node.key) {//向左查找
      if (!node.left) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (!node.right) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  //先序遍历
  preOrderTraversal(handler) {
    this.preOrderTraversalNode(this.root, handler)
  }
  preOrderTraversalNode(node, handler) {
    if (node) {
      handler(node.key)
      this.preOrderTraversalNode(node.left, handler)
      this.preOrderTraversalNode(node.right, handler)
    }
  }

  //中序遍历
  midOrderTraversal(handler) {
    this.midOrderTraversalNode(this.root, handler)
  }
  midOrderTraversalNode(node, handler) {
    if (node) {
      this.midOrderTraversalNode(node.left, handler)
      handler(node.key)
      this.midOrderTraversalNode(node.right, handler)
    }
  }
  //后序遍历
  postOrderTraversal(handler) {
    this.postOrderTraversalNode(this.root, handler)
  }
  postOrderTraversalNode(node, handler) {
    if (node) {
      this.postOrderTraversalNode(node.left, handler)
      this.postOrderTraversalNode(node.right, handler)
      handler(node.key)
    }
  }
  //寻找最值
  max(){
    let node = this.root
    let key = null
    while(node){
      key = node.key
      node = node.right
    }
    return key
  }

  min(){
    let node = this.root
    let key = null
    while(node){
      key = node.key
      node = node.left

    }
    return key
  }

  search(key) { 
    let node = this.root
    while(key !== node.key){
      if(key > node.key){
        node = node.right
      }else{
        node = node.left
      }
      if(!node) return false
    }
    return true
  }

  delete(key){
    //找到节点
    let node = this.root
    let parentNode = this.root
    let isLeft = true
    while(key !== node.key){
      if(key > node.key){
        parentNode = node
        node = node.right
        isLeft = false
      }else{
        parentNode = node
        node = node.left
        isLeft = true
      }
      if(!node) return false
    }

    //1. 删除的节点是叶子节点
    if(!node.left && !node.right){
      if(node == this.root){
        this.root = null
      }else if(isLeft){
        parentNode.left = null
      }else{
        parentNode.right = null
      }
    }
    //2. 删除的节点有一个子节点
    else if(!node.left){
      if(node == this.root){
        this.root = node.left
      }else if(isLeft){
        parentNode.left = node.left 
      }else{
        parentNode.right = node.right
      }
    }else if(!node.right){
      if(node == this.root){
        this.root = node.right
      }else if(isLeft){
        parentNode.left = node.left 
      }else{
        parentNode.right = node.right
      }
    }
    //3. 删除的节点有两个子节点
    else{
      //1.获取后继节点
      let successor = this.getSuccessor(current)

      //2.判断是否根节点
      if (current == this.root) {
        this.root = successor
      }else if (isLeftChild){
        parent.left = successor
      }else{
        parent.right = successor
      }

      //3.将后继的左子节点改为被删除节点的左子节点
      successor.left = current.left
    }

  }

  getSuccessor (delNode){
    //1.定义变量,保存找到的后继
    let successor = delNode
    let current = delNode.right
    let successorParent = delNode

    //2.循环查找current的右子树节点
    while(current != null){
      successorParent = successor
      successor = current
      current = current.left
    }

    //3.判断寻找到的后继节点是否直接就是删除节点的right节点
    if(successor != delNode.right){
      successorParent.left = successor.right
      successor.right = delNode.right 
    }
    return successor
  }
}
//1.创建BinarySearchTree
let bst = new BinarySearchTree()

//2.插入数据
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);
// console.log(bst)
//3.测试遍历
let resultString = ""
//掺入处理节点值的处理函数
// bst.preOrderTraversal(function(key){
//   resultString += key + "->"
// })
bst.postOrderTraversal(function (key) {
  resultString += key + "->"
})
// bst.delete(18)
console.log(resultString)