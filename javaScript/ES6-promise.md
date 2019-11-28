我们在进行Ajax请求时，有时候可能会需要第一个请求执行成功再执行第二个请求.

```
let user;
$.get('https://api.github.com/users', data => {
    console.log('fetch all users')
    user = data[0].login;
})
$.get(`https://api.github.com/users/${user}/repos`, data => {
    console.log('fetch user repos')
    console.log(data)
})

```
! [avator](../img/promise1.jpeg)

我们可以看到，这个返回结果跟我们想的并不一样，返回数据的顺序是不确定的。为了确保第二个请求是在第一个请求之后发生的，我们会把第二个请求写到第一个请求的回调当中。像这样：

```
let user;
$.get('https://api.github.com/users', data => {
    console.log('fetch all users')
    user = data[0].login;

    $.get(`https://api.github.com/users/${user}/repos`, data => {
        console.log('fetch user repos')
        console.log(data)
    })
})

```

但是这样的嵌套多了，可能会让我们陷入回调地狱，由于嵌套的函数过多，代码不仅可读性差，而且很难维护。


于是，promise就应运而生了。

Promise是异步编程的解决方案，比较常见的使用场景就是进行网络请求。

## Promise的基本使用

