---
comment: false 
# comments: false 
---
# Vue的数据响应式原理

## 原理

### Object.defineProperty

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
关于`Object.defineProperty`的说法

> Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。


```javascript

/**
 * [target] 要在其上定义属性的对象。
 * [key]要定义或修改的属性的名称。
 * [descriptor]将被定义或修改的属性描述符。
 */

// ES5语法，不支持IE8及以下版本
Object.defineProperty(target, key, {
    writable: false, // 默认 是否可修改
    configurable: false, // 默认 是否可被del
    enumerable: false, // 默认 是否可遍历
    set() {
        // 默认：undefined
    },
    get() {
        // 默认：undefined        
    }
})

```

## Vue的应用


- 基础使用

```javascript
    let obj = {
        name: 'vue'
    };
    // 通过中间变量去get和set
    let value = obj.name;
    Object.defineProperty(obj, 'name', {
        enumerable: true, // 可遍历
        configurable: true, // 可删除
        get() {
            // 此处省略收集依赖
            // 收集对应的变量再哪些地方用到了
            // 响应式系统使用响应式数据的getter方法对观察者进行依赖收集（Collect as Dependency）
            return value;
        },
        set(newValue) {
            value = newValue;
            // 省略了触发依赖，
   
            // 读取视图模板，生产语法树
            // 使用响应式数据的setter方法通知（notify）所有观察者进行更新，此时观察者 Watcher 会触发组件的渲染函数（Trigger re-render），
            // 组件执行的 render 函数，生成一个新的 Virtual DOM Tree，此时 Vue 会对新老 Virtual DOM Tree 进行 Diff，查找出需要操作的真实 DOM 并对其进行更新。
            that.render(newValue);
        }
    });
```

不足：只能监听一个属性，并且要通过中间变量

- 遍历对象的属性

```javascript
    // observe观察数据
    Vue.prototype.observe = function (data) {
        if (!data || typeof data !== 'object') {
            return false;
        }

        // 遍历data，将原来所有属性改成set和get的形式
        // 先获取到数据的key和value
        Object.keys(data).forEach((key) => {
            if (typeof data[key] === 'object') {
                // 如果是对象，则继续去遍历他的属性
                // data[key]充当一个中间变量
                this.observe(data[key]);
            } else {
                this.defineReactive(data, key, data[key]);
            }
        });
    };

    // 添加数据监听
    // 由于Object.defineProperty只能作用于Object，
    // 所以数组的监听，使用了伪装者模式
    Vue.prototype.defineReactive = function (target, key, value) {
        let that = this;
        // ES5语法，不支持IE8及以下版本
        Object.defineProperty(target, key, {
            enumerable: true, // 可遍历
            configurable: true, // 可删除
            get() {
                // 此处省略收集依赖
                // 收集对应的变量再哪些地方用到了
                console.log('get', value);
                return value;
            },
            set(newValue) {
                console.log('set', newValue);
                value = newValue;
                // 数据改变，触发dom渲染
                // 触发收集依赖后的更新
                that.render(newValue);
            }
        });
    };

```

- 数组的监听实现

使用装饰者模式

```javascript

// 拿出数组原型链并拷贝

var arrayPro = Array.prototype;
var arrayOb = Object.create(arrayPro);

// 去重写以下的方法
var arrFun = ['push', 'pull', 'shift'];

    arrFun.forEach((methods, index) => {  
        arrayOb[methods] = function() {
            // 执行对应的数组操作，并执行视图的更新
            var ret = arrayPro[method].apply(this, arguments);
            // 触发视图更新
            dep.notify();
            return ret;
        }
    });

```

## Vue3的原理

> Proxy

- 基础使用

```javascript

let obj = {
    name: 'vue'
}

// 相对于vue2省去了一个for in循环
// 不用去污染源对象
// 写法更优雅了

obj = new Proxy(obj, {
    get: function(target, key, receiver) {
        // receiver：代理对象
        console.log(arguments);
        return target[key];     
    },
    set: function(target, key, value, receiver) {
        console.log(arguments);
        // 触发视图更新
        dep.notify();
        return Reflect.set(target, key, value);
    }
})
obj.name = 'proxy';
console.log(obj.name);
```

- Proxy的应用

1. 类型校验

2. 私有变量

3. ...

## MVVM
---

## MVVM 由以下三个内容组成

- `View`：界面
- `Model`：数据模型
- `ViewModel`：作为桥梁负责沟通 `View` 和 `Model`

> - 在 JQuery 时期，如果需要刷新 UI 时，需要先取到对应的 DOM 再更新 UI，这样数据和业务的逻辑就和页面有强耦合
> - 在 MVVM 中，UI 是通过数据驱动的，数据一旦改变就会相应的刷新对应的 UI，UI 如果改变，也会改变对应的数据。这种方式就可以在业务处理中只关心数据的流转，而无需直接和页面打交道。ViewModel 只关心数据和业务的处理，不关心 View 如何处理数据，在这种情况下，View 和 Model 都可以独立出来，任何一方改变了也不一定需要改变另一方，并且可以将一些可复用的逻辑放在一个 ViewModel 中，让多个 View 复用这个 ViewModel

- 在 MVVM 中，最核心的也就是数据双向绑定，例如 Angluar 的脏数据检测，Vue 中的数据劫持

## 脏数据检测

- 当触发了指定事件后会进入脏数据检测，这时会调用 $digest 循环遍历所有的数据观察者，判断当前值是否和先前的值有区别，如果检测到变化的话，会调用 $watch 函数，然后再次调用 $digest 循环直到发现没有变化。循环至少为二次 ，至多为十次
- 脏数据检测虽然存在低效的问题，但是不关心数据是通过什么方式改变的，都可以完成任务，但是这在 Vue 中的双向绑定是存在问题的。并且脏数据检测可以实现批量检测出更新的值，再去统一更新 UI，大大减少了操作 DOM 的次数

## 数据劫持

- `Vue` 内部使用了 `Obeject.defineProperty()` 来实现双向绑定，通过这个函数可以监听到 `set` 和 `get `的事件

```javascript
var data = { name: 'yck' }
observe(data)
let name = data.name // -> get value
data.name = 'yyy' // -> change value

function observe(obj) {
  // 判断类型
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
    }
  })
}
```

> 以上代码简单的实现了如何监听数据的 set 和 get 的事件，但是仅仅如此是不够的，还需要在适当的时候给属性添加发布订阅

```html
<div>
    {{name}}
</div>
```

> 在解析如上模板代码时，遇到 `{{name}}` 就会给属性 `name` 添加发布订阅


```javascript
// 通过 Dep 解耦
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    // sub 是 Watcher 实例
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
// 全局属性，通过该属性配置 Watcher
Dep.target = null

function update(value) {
  document.querySelector('div').innerText = value
}

class Watcher {
  constructor(obj, key, cb) {
    // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target = null
  }
  update() {
    // 获得新值
    this.value = this.obj[this.key]
    // 调用 update 方法更新 Dom
    this.cb(this.value)
  }
}
var data = { name: 'yck' }
observe(data)
// 模拟解析到 `{{name}}` 触发的操作
new Watcher(data, 'name', update)
// update Dom innerText
data.name = 'yyy' 
```

> 接下来,对 defineReactive 函数进行改造

```javascript
function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  let dp = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      // 将 Watcher 添加到订阅
      if (Dep.target) {
        dp.addSub(Dep.target)
      }
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
      // 执行 watcher 的 update 方法
      dp.notify()
    }
  })
}
```

> 以上实现了一个简易的双向绑定，核心思路就是手动触发一次属性的 getter 来实现发布订阅的添加

## Proxy 与 Obeject.defineProperty 对比

- `Obeject.defineProperty` 虽然已经能够实现双向绑定了，但是他还是有缺陷的。
  - 只能对属性进行数据劫持，所以需要深度遍历整个对象
  - 对于数组不能监听到数据的变化
  
> 虽然 `Vue` 中确实能检测到数组数据的变化，但是其实是使用了 `hack` 的办法，并且也是有缺陷的

