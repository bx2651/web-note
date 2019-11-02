// var a = 123;
// function fn1 () {
//     console.log(a);
// }
// function fn2 () {
//     var a = 456;
//     fn1();
// }
// fn2();   // 123

// function fun(n, o) {        //function fun(1,o)     function fun(1,0)   func fun(2,1)
//     console.log(o)          //console.log(o)        console.log(0)      cons.log(1)
//     return {                //return{
//         fun: function (m) { //fun:function(m){      fun:function(1)     fun:func(2)
//             return fun(m, n);//return fun(m,0)      return fun(1,0)     return(2,1)
//         }                       
//     };                      //1.___undefined        2.___0              3.____1
// }
// var a = fun(0);
// a.fun(1);
// a.fun(2);
// a.fun(3);


//   var b = fun(0).fun(1).fun(2).fun(3);
//   var c = fun(0).fun(1);  c.fun(2);  c.fun(3);

// var name = "windowsName";
// function a() {
//     name = "Cherry";
//     console.log(this.name);  // windowsName
//     console.log("inner:" + this);// inner: Window
// }
// a();
// console.log("outer:" + this) // outer: Window




// for (var i = 100; i < 400; i+=100) {
//   setTimeout(function () {
//       console.log(i);
//   }, 1000);
// }

// confirm(0)

// function confirm(num) {
//   setTimeout(function () {
//     alert(num)
//     num++
//     confirm(num)
//     if(num>5){
//       clearTimeout(confirm);
//     }
//   }, 1000)
// }

// for (var i = 0; i < 3; i++) {
//   setTimeout(function () {
//       console.log(i);
//   }, 1000);
// }
// console.log(i);

// var value =1;
//  function foo() {
//    console.log(value);
//  }
//  function bar() {
//    var value = 2;
//    foo(value);
//  }
//  bar();
//  // 结果是 

// function myModule() {
//     //私有数据
//     var msg = 'Smyhvae Haha'

//     //操作私有数据的函数
//     function doSomething() {
//         console.log('doSomething() ' + msg.toUpperCase()); //字符串大写
//     }

//     function doOtherthing() {
//         console.log('doOtherthing() ' + msg.toLowerCase()) //字符串小写
//     }

//     //通过【对象字面量】的形式进行包裹，向外暴露多个函数
//     return {
//         doSomething1: doSomething(),
//         doOtherthing2: doOtherthing()
//     }
// }
// myModule()

// function Aclass(){}
//     Aclass.staticMethod=function(){
//         console.log("静态方法")
//     } 
//     Aclass.staticMethod()


// Aclass.prototype.instanceMethod=function(){
//     console.log("实例方法")
// }
// var b = new Aclass();
// b.instanceMethod();
function sumAll(arr) {
    var a=arr[0];
    var b=arr[1];
    if(a > b){
      var temp=a;
      a=b;
      b=temp;
      console.log(b)
    }
    // var sum = 0; //a=1
    // for(i=0;i<b-a+1;i++){
    //     var num = a+i; //num=1+0
    //   sum += num; //sum = 
    // }
//     console.log (sum);
  }
  sumAll([4,1])