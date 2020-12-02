class Set{
  constructor(){
    //属性、方法
    this.items = {}
  }

  add(value){
    if(this.has(value)) return 
    this.items[value] = value
  }

  remove(value){
    if(!this.has(value)) return false
    delete this.items[value]
  }

  has(value){
    return this.items.hasOwnProperty(value)
  }

  clear(){
    this.items = {}
  }

  size(){
    return Object.keys(this.items).length
  }

  values(){
    return Object.keys(this.items)
  }

  union(otherSet){
    let union = new Set()
    let values = otherSet.values()
    for(let i = 0 ; i < values.length ; i++){
      union.add(values[i])
    }
    values = this.values()
    for(let i = 0 ; i < this.values().length ; i++){
      union.add(values[i])
    }
    return union
  }
  intersection(otherSet){
    let intersection = new Set()
    let values = otherSet.values()
    for(let i = 0 ; i < values.length ; i++){
      if(this.items[values[i]]){
        intersection.add(values[i])
      }
    }
    return intersection
  }

  difference(otherSet){
    let diff = new Set()
    let values = this.values()
    for(let i = 0 ; i < values.length ; i++){
      if(!otherSet.has(values[i])){
        diff.add(values[i])
      }
    }
    return diff
  }
  isSubsetOf(otherSet){
    let values = this.values()
    for(let i = 0 ; i < values.length ; i ++){
      if(!otherSet.has(values[i])) return false
    }
    return true
  }
}

let set = new Set()
set.add('aaa')
// set.add('bbb')
// set.add('ccc')
let set2 = new Set()
set2.add('aaa')
set2.add('ddd')
set2.add('eee')
