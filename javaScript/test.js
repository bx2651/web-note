var Person = (function() {
  let _gender = Symbol('gender')
  function P(name,gender) {
    this.name = name
    this[_gender] = gender
  }

  return P
})()
var p1 = new Person("Jack","男")

p1.gender = "女"
console.log(p1)//{ name: 'Jack', [Symbol(gender)]: '男' }