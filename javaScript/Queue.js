//基于数组的队列
class Queue {
  constructor(array) {
    this.array = array
  }
  enterQueue(item) {
    this.array.push(item)
  }
  deleteQueue() {
    return this.array.shift()
  }
  front() {
    return this.array[0]
  }
  isEmpty() {
    return this.array.length == 0
  }
  size() {
    return this.array.length
  }
  toString() {
    return this.array.join(",")
  }
}

//击鼓传花游戏
function passing_Game(nameList, num) {
  var queue = new Queue(nameList)
  let length = num % nameList.length
  while (queue.size() > 1) {
    for (let i = 0; i < length - 1; i++) {
      queue.enterQueue(queue.deleteQueue())
    }
    queue.deleteQueue()
  }

  console.log(queue.front())
}

passing_Game(["tom", "jerry", "jack"], 2)