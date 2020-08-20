const reg = /[^0-9]/
const str = '1990'
const str2 = '199a0'
console.log(reg.test(str))//false
console.log(reg.test(str2))//true