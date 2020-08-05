最近工作上遇到一个问题：我要把某些后端返回的数据直接塞进echarts里，但是后端给我的数据中的key值和我需要用到的Key值不一样，我需要给key值改一下名字，所以就写了一个方法：



```

let array = data.map(item=>{
              let newArr = item.map(itemValue=>{
                  let name = itemValue.name;
                  let value = itemValue.count;
                  return {name, value}
              })
              return newArr
          })

```

简化：

```

let array = data.map(item =>
    item.map(itemValue => {
        return {
            name: itemValue.name,
            value: itemValue.count
        }
    })
)

```