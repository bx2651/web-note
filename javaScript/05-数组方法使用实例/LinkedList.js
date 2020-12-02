class LinkList{
  constructor(){
    this.head = null
    this.length = 0
  }

  node(data){
    let node = {}
    node.data = data
    node.next = null
    return node
  }

  append(data){
    let node = this.node(data)

    if(this.length == 0) {
      this.head = node
    } else{
      let current = this.head
      while(current.next){
        current = current.next
      }
      current.next = node
    }

    this.length += 1
  }

  toString(){
    let current = this.head
    let listString = ''

    while(current){
      listString += current.data + ','
      current = current.next
    }

    return listString
  }

  insert(position,data){
    if(position>this.length || position < 0){
      return new Error('越界了')
    }

    let node = this.node(data)
    if(position == 0){
      node.next = this.head
      this.head = node
    }else{
      let index = 0
      let current = this.get(position)
      let previous = this.get(position - 1)
      
      node.next = current
      previous.next = node
    }

    this.length += 1
  }

  get(position){
    if(position < 0 || position >= this.length) return null
    let index = 0
    let current = this.head
    while(index++ < position){
      current = current.next
    }
    return current
  }

  indexOf(data){
    if(!this.head) return null
    let current = this.head
    for(let i = 0 ; i < this.length ; i++){
      if(current.data == data ){
        return i
      }else{
        current = current.next
      }
    }
  }
  update(position,element){
    let node = this.get(position)
    node.data = element
  }

  removeAt(position){
    if(position == 0){
      this.head = this.head.next
      return
    }else if(position >= this.length || position < 0) return false
    let node = this.get(position - 1)
    node.next = node.next.next
  }

  remove(element){
    let node = this.removeAt(this.indexOf(element) )
  }

  isEmpty(){
    return this.length == 0
  }

  size(){
    return this.length
  }

}

let nodeList = new LinkList()
nodeList.append('111')
nodeList.append('222')
nodeList.append('333')
nodeList.remove('333')
console.log(nodeList.toString())
