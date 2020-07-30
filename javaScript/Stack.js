
//基于数组实现的栈
class Stack{
  constructor(array){
    this.array = array
  }
  push(item){
    this.array.push(item)
  }
  pop(item){
    this.array.pop(item)
  }
  isEmpty(){
    return this.array.length == 0
  }
  peek(){
    return this.array[this.array.length - 1 ]
  }
  size(){
    return this.array.length
  }
  toString(){
    return this.array.join(",")
  }
}

let stack = new Stack([1,2,3])
stack.push(4)
console.log(stack.toString())