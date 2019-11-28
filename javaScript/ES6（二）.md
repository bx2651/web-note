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

如果我们还需要第三个请求，我们就需要把第三个请求放到第二个请求中。但是这样的嵌套多了，可能会让我们陷入回调地狱，由于嵌套的函数过多，代码不仅可读性差，而且很难维护。


于是，promise就应运而生了。

Promise是异步编程的解决方案，比较常见的使用场景就是进行网络请求:下面的示例中，我们使用了网络请求的库axios,这个方法返回的值就是一个promise。

```
const usersPromise = axios.get('https://api.github.com/users')//这行代码会给我们返回一个promise请求

usersPromise.then(res => {//当上面的请求成功了，我们就会获取到返回值,并进入到then函数
    userName = res.data[0].login;
    return axios.get(`https://api.github.com/users/${userName}/repos`)//开始第二个请求
}).then(res => {//第二个请求成功后，进入自己的then函数，打印返回值
    console.log(res.data)
})
.catch(err=>{
    console.error(err);如果发生错误，则打印错误信息
})

```

## Promise的基本使用

我们有时候可能并不想使用上面的axios，而是想简单的自己使用一下promise，那么我们可以这么做:

```

const p = new Promise((res,rej)=>{
    res('bx is ok')
})

p.then(data=>{
    console.log(data)
})

```

如上所示，promise接受两个参数，resolve和reject,分别代表成功和失败的状态。上面代码的意思时，我准备先去做一些别的事情，p，你先自己执行，如果成功了或者失败了，告诉我一下结果。

比如我们可以在promise查询数据库，进行网络请求，我们不可能一直卡在这里等他完成，否则可能会没办法执行下面的所有的内容，那我们现在就是让promise自己做自己的事情，我们去做一些别的事情。

```
const p = new Promise((res,rej)=>{
    setTimeout(()=>{
        res('now is ok');
        rej(Error('not ok'))
    },2000)
})

p.then(data=>{
    console.log(data)
})
.catch(err=>{
    console.error(err)
})

```

下面的代码，是根据id在数据库中匹配数据，匹配成功后将第二个数组中的owner赋值给第一个的owner,然后输出最后的结果。

```
const repos = [
    {name:'grit',owner:'mom',description:'beautiful',id:1},
    {name:'core',owner:'cat',description:'cute',id:2}
]

const owners = [
    {name:'mom',location:'Beijing',followers:123},
    {name:'cats',location:'Xian',followers:456}
]

function getRepoById(id){
    return new Promise((res,rej)=>{
        const repo = repos.find(repo=>repo.id===id)
        if(repo){
            res(repo)
        }else{
            rej(Error('no repo found'))
        }
    })
}

function comboundOwner(repo){
    return new Promise((res,rej)=>{
        const owner = owners.find(owner=>owner.name === repo.owner)
        if(owner){
            repo.owner = owner
            res(repo)
        }else{
            rej(Error('can not found the owner'))
        }
    })
}

getRepoById(1)
    .then(repo=>{
        return comboundOwner(repo)//第一个函数执行成功后，执行第二个函数，所以此处应该return一个promise出去。
    })
    .then(repo=>{
        console.log(repo)
    })
    .catch(err=>{
        console.error(err)
    })
```

# Symbol数据类型

symbol是用来创建一个唯一的标识符，用来解决对象属性命名冲突的问题。我们来看一下以下示例：

```
const peter = Symbol();
const lily = Symbol();
console.log(peter==lily);//false

```

可以看到，虽然peter和lily都是Symbol,但是他们并不一样。

```
const classroom = {
    [Symbol('nina')]: { grade: 77, gender: female },
    [Symbol('nina')]: { grade: 80, gender: female }
}

```