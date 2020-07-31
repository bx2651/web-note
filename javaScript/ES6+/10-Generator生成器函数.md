# Generator生成器函数
```
function* listColors(){
    yield 'red';
    yield 'blue';
    yield 'green';
}
```
![](../img/Generator.png)

我们可以看到，生成器函数是随时可以暂停的，我们需要不断通过next方法来使他继续推进，利用生成器函数的这个特性，我们可以完成上面我们用Promise实现的功能：

```
function ajax(url){
    axios.get(url).then(res=>userGen.next(res.data))
}

function* step(){
    console.log('fetching users')
    const users = yield ajax('https://api.github.com/users');//3.执行第一步：通过axios获取到相应的数据，并将返回结果传递给next方法，进行下一步操作。
    console.log(users)
    console.log('fetching firstUsers')
    const firstUser = yield ajax(`https://api.github.com/users/${users[0].login}`);//4.收到上一步的请求结果，进行下一步的网络请求，并将返回结果传递给next方法，进行下一步操作。
    console.log(firstUser)
    console.log('fetching followers')
    const followers = yield ajax(firstUser.followers_url);//5.收到上一步的请求结果，进行下一步的网络请求，并将返回数据传递给followers。
    console.log(followers)
}
const userGen = step();//1.将step生成器赋值给userGen，此时userGen的状态是suspended。
userGen.next()//2.调用userGen的next方法，此时开始第一步的执行。

```
![](../img/GeneratorExp.png)

这样的结构不仅更有可读性，并且会让我们的代码更加优雅。