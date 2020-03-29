let data = [[
    { name: "1", state: "已销号" },
    { name: "2", state: "未销号" },
    { name: "3", state: "已销号" }
], [
    { name: "4", state: "已销号" },
    { name: "5", state: "未销号" },
    { name: "6", state: "已销号" }
]]



let array = data.map(item =>
    item.map(itemValue => {
        return {
            name: itemValue.name,
            value: itemValue.state
        }
    })
)
console.log(array)