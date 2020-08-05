
最近有这样一个需求：后端返回的数据是一个对象数组，每一个对象的格式都有统一的key值，前端需要拿出每一个key值对应的所有value值，组成一个新的数组渲染到页面上，对于这个需求，我们可以这么做：

```
const data = [
    { adName: "北京", year: 2019},
    { adName: "南京", year: 2022}
]

collect = (data, key) => data.map(item => item[key])

//function collect(data,key){
//	return data.map(item=>item[key])
//}

console.log(collect(data, "adName"));//[ '北京', '南京' ]
console.log(collect(data, "year"));//[ 2019, 2022 ]
```