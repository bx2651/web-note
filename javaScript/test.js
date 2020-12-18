function Person(name,age){
  this.name = name
  this.age = age
  this.satHi = sayHi
}

function sayHi(){
  console.log('hello')
}

let person = new Person('Jack',18)
let person2 = new Person('Nick',19)
console.log(person.satHi == person2.satHi)


