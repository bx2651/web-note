function Person(name,age){
  this.name = name
  this.age = age
  if(typeof this.sayName != 'function'){
    Person.prototype.sayName=function(){
      console.log("say name",this.name)
    }
  }
}


const person = new Person()
console.log(person) //[ 'Jack', 'Lily', 'Helen' ]


