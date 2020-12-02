class DoublyLinkedList{
  constructor(){
    this.head = null
    this.tail = null
    this.length = 0
  }

  node(data){
    let node = {
      data:data,
      next:null,
      previous:null
    }
    return node
  }

  append(data){
    let node = this.node(data)
    if(this.length == 0){
      this.head = node
      this.tail = node
      node.previous = null
    }else{
      // let current = this.head
      // while(current.next){
      //   current = current.next
      // }
      // current.next = node
      // node.previous = current
      this.tail.next = node
      node.previous = this.tail
      this.tail = node
    }
    this.length += 1
  }

  forwardString(){
    let current = this.head
    let res = ''
    while(current){
      res += current.data + ','
      current = current.next
    }
    return res
  }

  backwardString(){
    let current = this.tail
    let res = ''
    while(current){
      res += current.data + ','
      current = current.previous
    }
    return res
  }

  get(position){
    if(position < 0 || position >= this.length) return null
    if(position < this.length/2){
      let current = this.head
      let index = 0
      while(index++ < position){
        current = current.next
      }
      return current
    }else{
      let current = this.tail
      let index = this.length - 1
      while(index-- > position){
        current = current.previous
      }
      return current
    }
    
  }

  insert(position,data){
    if(position> this.length || position < 0) return false
    let node = this.node(data)
    if(position == 0) {
      node.next = this.head
      this.head = node
    }else if(position == this.length){
      this.tail.next = node
      this.tail = node
    }else{
      let current = this.get(position)
      node.next = current
      node.previous = current.previous
      current.previous.next = node
      current.previous = node
    }
    this.length += 1
  }

  indexOf(data){
    if(this.length == 0) return false
    let current = this.head

    for(let i = 0 ; i < this.length; i++){
      if(current.data == data) return i
      current = current.next
    }
  }

  update(position,data){
    if(position> this.length || position < 0) return false
    let node = this.node(data)
    if(position == 0){
      node.next = this.head.next
      this.head = node
    }else if(position == this.length){
      node.previous = this.tail.previous
      this.tail = node
    }else{
      let current = this.get(position)
      let node = this.node(data)
      node.next = current
      node.previous = current.previous
      current.previous.next = node
    } 
  }

  removeAt(position){
    if(position> this.length || position < 0) return null
    if(this.length == 0){
      this.head = null
      this.tail = null
    }{
      if(position == 0){
        this.head = this.head.next
        this.head.previous = null
      }else if(position == this.length){
        this.tail = this.tail.previous
        this.tail.next = null
      }else{
        let current = this.get(position)
        current.next.previous = current.previous
        current.previous.next = current.next
      } 
      this.length -= 1
    } 
  }
  remove(data){
    if(this.length == 0) return null
    this.removeAt(this.indexOf(data))
  }

  isEmpty(){
    return this.length == 0
  }

  size(){
    return this.length
  }

}

let nodeList = new DoublyLinkedList()
nodeList.append('111')
nodeList.append('222')
nodeList.append('333')
nodeList.append('444')
nodeList.remove('111')
console.log(nodeList.get(0).data)
