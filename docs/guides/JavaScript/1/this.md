## this的指向，call、apply、bind的区别

**this指向问题**

- 普通函数调用的时候，this指向window
- 构造函数调用的时候，this指向实例对象
- 对象方法调用的时候，this指向该方法所属的对象
- 通过事件绑定的方法，this指向绑定事件的对象
- 定时器函数，this指向window

**call、apply、bind相同点**

- 都可以改变this指向
- 第一个参数都是this要指向的对象
- 都可以利用后续参数传参

**call、apply、bind区别**

- call、bind的参数是依次传参，一一对应。apply只有两个参数，第二个参数是数组
- call、apply都是对函数直接进行调用，而bind方法返回的仍是一个函数

```js
// 例如：
var a = {
    name: '梦梦',
    age: '22',
    sex: '女',
    hobby: '写代码'
    say: function (sex, hobby) {
        console.log(this.name, this.age, sex, hobby)
    }
}
var b = {
    name: '臣臣',
    age: '23',
}
a.say.call(b, '男', '学习');
a.say.apply(b, ['男', '学习'])
// bind可以向cally一样传参：
// 例如:
a.say.bind(b, '男', '学习')();
// 但由于bind返回的仍然是一个函数，所以我们还可以在调用的时候再进行传参。
// 例如：
a.say.bind(b)('男', '学习');
//结果为："臣臣","23","男","学习"
```