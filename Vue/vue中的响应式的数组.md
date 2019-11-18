#vue中的响应式的数组
##响应式

**1.push方法：**在数组的最后添加元素

this.array.push('abc')

**2.pop方法:**删除数组中的最后一个元素

this.array.pop()

**3.shift方法：**删除数组中的第一个元素

this.array.shift()

**4.unshift方法：**在数组的最前面添加元素

this.array.unshift()

**5.splice方法：**可以删除元素/插入元素/替换元素

this.array.splice(开始的位置，删除几个元素)

this.array.splice(开始的位置，要替换几个元素，追加的元素1，追加的元素2，追加的元素3)

this.array.splice(开始的位置，0，插入的元素)

**6.sort方法：**用来排序

this.array.sort()

**7.reserve方法：**用来反转

this.array.reserve()

**8.vue.set()**

vue.set(要修改的对象,索引值,'修改后的值')


##非响应式
通过索引值修改数组中的元素(不能实时响应)

this.array[0] = 'abc'

如果要实现替换，并且让vue实时响应，可以使用splice方法