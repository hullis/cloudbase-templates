# js for，for...in，for...fo， forEach

```js
var arr = [0,1,2,3,4]
```

## for

```js
for(var i=0;i<arr.length;i++) {
  console.log(arr[i]) // 获取下标
}
```

## forEach优点：简单，可以同时访问数组的下标与元素值，缺：不能中断循环

```js
 arr.forEach(function(val,index){
      console.log(val+'下标：',arr[index])
       // 0下标： 0  1下标： 1，2下标： 2， 3下标： 3， 4下标： 4 
 })
 ```

## for-in循环：为循环‘enumerable’对象而设置的

```js
var obj = {a:1, b:2, c:3}; 
for(var i in obj) {
   console.log(i + ':'+ obj[i]) // a:1, b:2, c:3    
}
```

### 也可以循环一个数组，但是不推荐，for in主要是循环带有key的对象方法

```js
 for(var i in arr) {   // 可以返回下标和值        
     console.log(i + ':'+ arr[i])  // 0:0 1:1 2:2 3:3 4:4
 }
 ```

## for-of循环：可以遍历字符串，Maps(映射)，Sets(集合)

### 遍历字符串

```js
let string = 'string';
for(let index of string) {
   console.log(index); // "s" "t" "r" "i" "n" "g"
}
```

### 遍历数组：`for... of`使用`entries()`可以返回数组的下标

```js
const iterable = ['苹果','土豆','番茄']
for(let [val,index] of iterable.entries()) { //返回对应的值和对应的下标
   console.log(val,index);
}
```

### `Maps`对象就是存储`key-value`(健值)对

```js
const remap = new Map([['one',1],['two',2]]);
for(const [key,val] of remap) {
    console.log(key + '值：', val); // one值:1;two值:2
}
```

### Set(集合)允许存储任意类型的唯一值

```js
const iter = new Set([1,2,3,4,1])
for (const val of iter) {    
    console.log(val);  // 1,2,3,4
}
```

### 遍历DOM collectiion

```js
let Ul = document.querySelectorAll('ul');
for (let i of UL) {
    i.classList.add('red');
}
```

## `for...in`和`for..of`对比

> for in :不光可以打印出枚举出的数组，还可以从构造函数的原型中查找继承的非枚举属性，for..of不行

```js
 Array.prototype.newArr = () =>{}; 
 Array.prototype.anotherNewArr = () => {}; 
 const array = ['foo','bar','baz']; 
 for (const val in array) {
    console.log(val);   // foo bar baz newArr anotherNewArr 
 }
 ```

 数组的空元素：

 ```js
 const outerarr = ['a',,'b']outerarr.length // 3
 ```

## `for`， `for...in`, `for...of`,`forEach`遍历`['a', ,'b']`和`['a', undefined, 'b']`

```js
// for 打印"a, undefined, b" 
for (let i = 0; i < outerarr.length; ++i) {
   console.log(outerarr[i]);  
}

// for...of 打印"a, undefined, c"  
for (const i of outerarr) {
    console.log(i);  
}

// for...in 打印"a,b"   
for(let i in outerarr) {
   console.log(i)   
} 

// forEach打印"a,b"    
outerarr.forEach((val,index) =>{
    console.log(val)    
})
```

**总结**：简单地说，`for/of`是遍历数组最可靠的方式，它比`for`循环简洁，并且没有`for/in`和`forEach()`那么多奇怪的特例。`for/of`的缺点是我们取索引值不方便，而且不能这样链式调用`forEach()`. `forEach()`。
