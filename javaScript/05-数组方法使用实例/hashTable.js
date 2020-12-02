class HashTable{
  constructor(){
    this.storage = []
    this.count = 0
    this.limit = 7
  }

  //将字符串转换为hashCode,将hashCode压缩到数组范围之内
  hashFunc(str,size){
    let hashCode = 0
    //利用霍纳算法计算hashCode值
    for(let i = 0 ; i < str.length ; i++){
      hashCode = 37 * hashCode + str.charCodeAt(i)
    }
    //取余
    let index = hashCode % size
    return index
  }

  //插入修改操作
  put(key,value){
    //根据key获取对应的Index
    let index = this.hashFunc(key,this.limit)

    //根据index取出对应位置的数组
    let bucket = this.storage[index]

    //判断数组是否为空
    if(!bucket){
      bucket = []
      this.storage[index] = bucket
    }

    //是否是修改数据
    for(let i = 0 ; i < bucket.index ; i++){
      let tuple = bucket[i]
      if(tuple[key]){
        tuple[key] = value
        return
      }
    }
    let obj = {}
    obj[key] = value
    bucket.push(obj)
    this.count += 1

    if(this.count > this.limit * 0.75){
      this.resize(this.getPrime(this.limit * 2))
    }
  }

  get(key){
    let index = this.hashFunc(key,this.limit)
    let bucket = this.storage[index]
    if(!bucket) return null
    for(let i = 0 ; i < bucket.length ; i++){
     if( bucket[i][key]){
       return bucket[i][key]
     } 
    }
    return null
  }

  remove(key){
    let index = this.hashFunc(key,this.limit)
    let bucket = this.storage[index]
    if(!bucket) return null
    for(let i = 0 ; i < bucket.length ; i++){
     if( bucket[i][key]){
       bucket.splice(i,1)
       this.count --

       if(this.limit > 7 && this.count < this.limit * 0.25){
         this.resize(Math.floor(this.limit / 2))
       }
       return bucket[key]
     } 
    }
    return null
  }

  isEmpty(){
    return this.count == 0
  }

  size(){
    return this.count
  }

  //扩容
  resize(newLimit){
    let oldStorage = this.storage
    //重置数据
    this.count = 0
    this.storage = []
    this.limit = newLimit

    //遍历所有内容
    for(let i = 0 ; i < oldStorage.length ; i ++){
      let bucket = oldStorage[i]

      if(!bucket){
        continue
      }else{
        for(let item in bucket){
          let key = Object.keys(item)[0]
          let value = item[key]
          this.put(key,value)
        }
      }
    }
  }

  //判断质数：只能被1和自己整除
  isPrime(num){
    let length = parseInt(Math.sqrt(num))
    for(let i = 2; i <= length ; i++){
      if(num%i == 0) return false
    }
    return true
  }

  getPrime(num){
    while(!this.isPrime(num)){
      num += 1
    }
    return num
  }
}
let hashTable = new HashTable()
hashTable.put('age',18)
hashTable.put('name','Jack')
hashTable.put('gender','man')
hashTable.put('test',110)
// console.log(hashTable)
hashTable.resize(9)
console.log(hashTable.getPrime(14))
