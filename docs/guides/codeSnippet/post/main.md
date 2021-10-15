# JavaScript 代码片段

---

## 1、下载一个 excel 文档

同时适用于 word,ppt 等浏览器不会默认执行预览的文档,也可以用于下载后端接口返回的流数据，见 `3`

```JavaScript
//下载一个链接
function download(link, name) {
    if(!name){
            name=link.slice(link.lastIndexOf('/') + 1)
    }
    let eleLink = document.createElement('a')
    eleLink.download = name
    eleLink.style.display = 'none'
    eleLink.href = link
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}
//下载excel
download('http://111.229.14.189/file/1.xlsx')
```

## 2、在浏览器中自定义下载一些内容

场景：我想下载一些 DOM 内容，我想下载一个 JSON 文件

```js
/**
 * 浏览器下载静态文件
 * @param {String} name 文件名
 * @param {String} content 文件内容
 */
function downloadFile(name, content) {
  if (typeof name == "undefined") {
    throw new Error("The first parameter name is a must");
  }
  if (typeof content == "undefined") {
    throw new Error("The second parameter content is a must");
  }
  if (!(content instanceof Blob)) {
    content = new Blob([content]);
  }
  const link = URL.createObjectURL(content);
  download(link, name);
}
//下载一个链接
function download(link, name) {
  if (!name) {
    //如果没有提供名字，从给的Link中截取最后一坨
    name = link.slice(link.lastIndexOf("/") + 1);
  }
  let eleLink = document.createElement("a");
  eleLink.download = name;
  eleLink.style.display = "none";
  eleLink.href = link;
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}
```

使用方式：

```js
downloadFile("1.txt", "lalalallalalla");
downloadFile("1.json", JSON.stringify({ name: "hahahha" }));
```

## 3、下载后端返回的流

数据是后端以接口的形式返回的,调用`1`中的 download 方法进行下载

```js
download("http://111.229.14.189/gk-api/util/download?file=1.jpg");
download("http://111.229.14.189/gk-api/util/download?file=1.mp4");
```

## 4、提供一个图片链接，点击下载

图片、pdf 等文件，浏览器会默认执行预览，不能调用 download 方法进行下载，需要先把图片、pdf 等文件转成 blob，再调用 download 方法进行下载，转换的方式是使用 axios 请求对应的链接

```js
//可以用来下载浏览器会默认预览的文件类型，例如mp4,jpg等
import axios from "axios";
//提供一个link，完成文件下载，link可以是  http://xxx.com/xxx.xls
function downloadByLink(link, fileName) {
  axios
    .request({
      url: link,
      responseType: "blob", //关键代码，让axios把响应改成blob
    })
    .then((res) => {
      const link = URL.createObjectURL(res.data);
      download(link, fileName);
    });
}
```

**注意：会有同源策略的限制，需要配置转发**

## 6、防抖

在一定时间间隔内，多次调用一个方法，只会执行一次.

这个方法的实现是从 Lodash 库中 copy 的
```js
/**
 *
 * @param {*} func 要进行debouce的函数
 * @param {*} wait 等待时间,默认500ms
 * @param {*} immediate 是否立即执行
 */
export function debounce(func, wait=500, immediate=false) {
		var timeout
		return function() {
				var context = this
				var args = arguments

				if (timeout) clearTimeout(timeout)
				if (immediate) {
						// 如果已经执行过，不再执行
						var callNow = !timeout
						timeout = setTimeout(function() {
								timeout = null
						}, wait)
						if (callNow) func.apply(context, args)
				} else {
						timeout = setTimeout(function() {
								func.apply(context, args)
						}, wait)
				}
		}
}
```
使用方式：
```html
<!DOCTYPE html>
<html lang="en">
		<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Document</title>
		</head>
		<body>
				<input id="input" />
				<script>
						function onInput() {
								console.log('1111')
						}
						const debounceOnInput = debounce(onInput)
						document
								.getElementById('input')
								.addEventListener('input', debounceOnInput) //在Input中输入，多次调用只会在调用结束之后，等待500ms触发一次
				</script>
		</body>
</html>
```
如果第三个参数`immediate`传 true，则会立即执行一次调用，后续的调用不会在执行，可以自己在代码中试一下

## 7、节流

多次调用方法，按照一定的时间间隔执行

这个方法的实现也是从 Lodash 库中 copy 的
```js
	/**
	 * 节流，多次触发，间隔时间段执行
	 * @param {Function} func
	 * @param {Int} wait
	 * @param {Object} options
	 */
	export function throttle(func, wait=500, options) {
			//container.onmousemove = throttle(getUserAction, 1000);
			var timeout, context, args
			var previous = 0
			if (!options) options = {leading:false,trailing:true}

			var later = function() {
					previous = options.leading === false ? 0 : new Date().getTime()
					timeout = null
					func.apply(context, args)
					if (!timeout) context = args = null
			}

			var throttled = function() {
					var now = new Date().getTime()
					if (!previous && options.leading === false) previous = now
					var remaining = wait - (now - previous)
					context = this
					args = arguments
					if (remaining <= 0 || remaining > wait) {
							if (timeout) {
									clearTimeout(timeout)
									timeout = null
							}
							previous = now
							func.apply(context, args)
							if (!timeout) context = args = null
					} else if (!timeout && options.trailing !== false) {
							timeout = setTimeout(later, remaining)
					}
			}
			return throttled
	}
```
第三个参数还有点复杂，`options`

- leading，函数在每个等待时延的开始被调用，默认值为 false
- trailing，函数在每个等待时延的结束被调用，默认值是 true

可以根据不同的值来设置不同的效果：

- leading-false，trailing-true：默认情况，即在延时结束后才会调用函数
- leading-true，trailing-true：在延时开始时就调用，延时结束后也会调用
- leading-true, trailing-false：只在延时开始时调用

例子：
```html
<!DOCTYPE html>
<html lang="en">
		<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Document</title>
		</head>
		<body>
				<input id="input" />
				<script>
						function onInput() {
								console.log('1111')
						}
						const throttleOnInput = throttle(onInput)
						document
								.getElementById('input')
								.addEventListener('input', throttleOnInput) //在Input中输入，每隔500ms执行一次代码
				</script>
		</body>
</html>
```
## 8、`cleanObject`

去除对象中 value 为空(null,undefined,'')的属性,举个栗子：
```js
let res=cleanObject({
		name:'',
		pageSize:10,
		page:1
})
console.log("res", res) //输入{page:1,pageSize:10}   name为空字符串，属性删掉
```
使用场景是：后端列表查询接口，某个字段前端不传，后端就不根据那个字段筛选，例如`name`不传的话，就只根据`page`和`pageSize`筛选，但是前端查询参数的时候（vue 或者 react）中，往往会这样定义
```js
export default{
		data(){
				return {
						query:{
								name:'',
								pageSize:10,
								page:1
						}
				}
		}
}

const [query,setQuery]=useState({name:'',page:1,pageSize:10})
```

给后端发送数据的时候，要判断某个属性是不是空字符串，然后给后端拼参数，这块逻辑抽离出来就是`cleanObject`，代码实现如下
```js
export const isFalsy = (value) => (value === 0 ? false : !value);

export const isVoid = (value) =>
	value === undefined || value === null || value === "";

export const cleanObject = (object) => {
	// Object.assign({}, object)
	if (!object) {
		return {};
	}
	const result = { ...object };
	Object.keys(result).forEach((key) => {
		const value = result[key];
		if (isVoid(value)) {
			delete result[key];
		}
	});
	return result;
};



let res=cleanObject({
		name:'',
		pageSize:10,
		page:1
})
console.log("res", res) //输入{page:1,pageSize:10}
```

## 9、全排列

```js
function permutate(str) {
		var array = str.split('');
		function loop(array, pre = []) {
				if (array.length == 1) {
						return [pre.concat(array).join('')];
				}
				let res = [];
				for (let index = 0; index < array.length; index++) {
						var first = array.pop();
						res = res.concat(loop(array, [...pre, first]));
						array.unshift(first);
				}
				return res;
		}
		return Array.from(new Set(loop(array)))
}
```
## 10、二分搜索

```js
function BinarySearch1 (arr, target) {
		return search(arr, target, 0, arr.length - 1)
		function search (arr, target, from, to) {
				if (from > to) {
						return -1
				}
				const mid = Math.floor((from + to)/2)
				if (arr[mid] > target) {
						return search(arr, target, from, mid - 1)
				} else if (arr[mid] < target) {
						return search(arr, target, mid + 1, to)
				} else {
						return mid
				}
		}
}

function BinarySearch2 (arr, target) {
		let from = 0
		let to = arr.length - 1
		let mid = Math.floor((from + to)/2)
		while (from <= to) {
				mid = Math.floor((from + to)/2)
				if (arr[mid] > target) {
						to = mid - 1
				} else if (arr[mid] < target) {
						from = mid + 1
				} else {
						return mid
				}
		}

		return -1
}
```

## 11、排序

### (1).冒泡排序

```js
/*
第1次循环确定最大的
第n次循环确定第n大的
 */
function BubbleSort (arr) {
		const length = arr.length

		for (let i = 0; i < length; i++) {
				for (let j = 1; j < length-i; j++) {
						if (arr[j] < arr[j - 1]) {
								const temp = arr[j]
								arr[j] = arr[j - 1]
								arr[j - 1] = temp
						}
				}
		}

		return arr
}
```

### (2).快速排序

```js
/*
在左边找大数，在右边找小数
交换
 */
function QuickSort(arr, low, high) {
		let left = low
		let right = high
		let basic = arr[low]
		while (left < right) {
				while (left < right && arr[right] > basic) {
						right--
				}
				while (left < right && arr[left] <= basic) {
						left++
				}

				if (left < right) {
						const temp = arr[left]
						arr[left] = arr[right]
						arr[right] = temp
				} else {
						const temp = arr[low]
						arr[low] = arr[left]
						arr[left] = temp

						QuickSort(arr, low, left - 1)
						QuickSort(arr, right + 1, high)
				}
		}

		return arr
}
```

### (3).选择排序

```js
/*
 寻找第i小的数的位置，放到i位置上
 */
function SelectionSort (arr) {
		const length = arr.length
		for (let i = 0; i < length; i++ ) {
				let minIndex= i
				for (let j = i + 1; j < length; j++) {
						minIndex = arr[minIndex] <= arr[j] ? minIndex : j
				}
				if (minIndex !== i) {
						const temp = arr[i]
						arr[i] = arr[minIndex]
						arr[minIndex] = temp

				}
		}
		return arr
}
```

### (4).插入排序

```js
function InsertionSort (arr) {
		const length = arr.length
		for (let i = 1; i < length; i++) {
				const temp = arr[i]
				let j
				for (j = i - 1; j >= 0 && temp < arr[j]; j--) {
						arr[j+1] = arr[j]
				}
				arr[j+1] = temp
		}
		return arr
}
```

### (5).希尔排序

插入排序的改进版。对间隔 gap 为一组的数进行插入排序


```js
function ShellSort (arr) {
		const length = arr.length
		let gap = Math.floor(length)
		while (gap) {
				for (let i = gap; i < length; i++) {
						const temp = arr[i]
						let j
						for (j = i - gap; j >= 0 && temp < arr[j]; j = j - gap) {
								arr[j + gap] = arr[j]
						}
						arr[j + gap] = temp
				}
				gap = Math.floor(gap / 2)
		}
		return arr
}
```

### (6).归并排序

```js
function MergeSort (arr, low, high) {
		const length = arr.length
		if (low === high) {
				return arr[low]
		}
		const mid = Math.floor((low + high)/2)
		MergeSort(arr, low, mid)
		MergeSort(arr, mid + 1, high)
		merge(arr, low, high)
		return arr

}

function merge (arr, low, high) {
		const mid = Math.floor((low + high)/2)
		let left = low
		let right = mid + 1
		const result = []
		while (left <= mid && right <= high) {
				if (arr[left] <= arr[right]) {
						result.push(arr[left++])
				} else {
						result.push(arr[right++])
				}
		}
		while (left <= mid) {
				result.push(arr[left++])
		}
		while (right <= high) {
				result.push(arr[right++])
		}

		arr.splice(low, high-low+1, ...result)
}

const test = [2, 34, 452,3,5, 785, 32, 345, 567, 322,5]

console.log(MergeSort(test, 0, test.length - 1))
```

### (7).堆排序

```js
function HeapSort (arr) {
		const length = arr.length

		// 调整初始堆，调整完其实也确定了最大值
		// 但此时最大值是在 arr[0] 中
		for (let i = Math.floor(length/2) - 1; i >= 0; i--) {
				adjustHeap(arr, i, length)
		}

		// 把 arr[0](最大值)换到后面
		for (let i = length - 1; i >=0; i--) {
				const temp = arr[0]
				arr[0] = arr[i]
				arr[i] = temp
				adjustHeap(arr, 0, i)
		}

		return arr
}

// size 是还需要调整的堆的大小
// 随着一个个最大值的确定，size 会越来越小
function adjustHeap (arr, position, size) {
		const left = position * 2 + 1
		const right = left + 1
		let maxIndex = position
		if (left < size && arr[left] > arr[maxIndex]) {
				maxIndex = left
		}
		if (right < size && arr[right] > arr[maxIndex]) {
				maxIndex = right
		}
		if (maxIndex !== position) {
				const temp = arr[position]
				arr[position] = arr[maxIndex]
				arr[maxIndex] = temp
				adjustHeap(arr, maxIndex, size)
		}
		return arr
}
```

## 12、all

如果数组所有元素满足函数条件，则返回true。调用时，如果省略第二个参数，则默认传递布尔值。

```js
const all = (arr, fn = Boolean) => arr.every(fn);

all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
```

## 13、allEqual

判断数组中的元素是否都相等

```js
const allEqual = arr => arr.every(val => val === arr[0]);

allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```

## 14、approximatelyEqual
此代码示例检查两个数字是否近似相等，差异值可以通过传参的形式进行设置
```js
const approximatelyEqual = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon;

approximatelyEqual(Math.PI / 2.0, 1.5708); // true
```

## 15、Phaser

> Phaser

* 1.说明：

#### phaser在处理成失去焦点后动画停止，是从浏览器的性能上去考虑。

```JS
// 防止浏览器失去焦点后动画暂停
game.stage.disableVisibilityChange = true;
```

* 2.说明：

#### 首先图片是支持跨域请求，可以在图片服务器上添加Access-Control-Allow-Origin，这样后面的设置才能生效，
#### 可以在设置动画使用Phaser.CANVAS渲染，图片资源请求就可以了；
#### 如果你想使用webgl，这时可以设置game.load.crossOrigin="anonymous"。

```JS
// 解决图片资源跨域问题
game.load.crossOrigin = 'anonymous';
```

## 16、获取当前日期的三个月前的日期

[日期Api](https://www.runoob.com/jsref/jsref-setmonth.html)

### 1、思路

- 先获取当前时间戳
- 修改月份
- 返回修改后的时间戳

### 2、使用到的方法

setMonth() 方法用于设置月份。

**注意：** 一月为 0， 十二月为 11

这个方法可用于设置月份中的某一天。

该值介于 0（一月） ~ 11（十二月） 之间：

##### 参数值
- -1 为去年的最后一个月
- 12 为明年的第一个月
- 13 为明年的第二个月

### 3、编码

```javascript
    // 当前日期
    let now = new Date();
    // 获取当前日期的前三个月的月份
    let pastMonth = now.getMonth() - 3;
    // 修改月份，如果前三个月对应没有该日期，则向后延顺
    now.setMonth(pastMonth);
    return now;
```

> 假设：
> 当前时间是`2020/03/31`，`setMonth(1)`，也就是修改为2月，那最终返回的是`2020/03/02`，
因为2020年2月没有31号，从29号往后顺延两天，也就是`2020/03/02`

## 17、获取URL的查询参数

```js
// 获取URL的查询参数
q={};location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);q;
```

## 18、正确返回字符串长度的函数

```javascript
// ES6
function length(str) {
  return [...str].length;
}
```

## 19、数组去重

```js
  var array = [1, 2, 1, 1, '1'];
  function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array){
      return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
  }

```

## 20、Wepy采坑

使用微信小程序框架wepy.js是报错 `'wx' is not defined  no-undef`

 在.eslintrc.js文件中加入以下内容

```js
  globals: { wx: true },

```

## 21、页面强制以最新的IE浏览器模式渲染

```html

<meta http-equiv="x-ua-compatible" content="ie=edge">

```
 ~~IE11文档模式已经被弃用~~


## 22、IOS 设备判断

```js
   if ((/\(i[^;]+;( U;)? CPU.+Mac OS X/).test(navigator.userAgent)) {
       ...
   }
```

## 23、webpack 配置css打包的浏览器

```js
  "browserslist": [
    "Android 2.3",
    "Android >= 4",
    "Chrome >= 20",
    "Firefox >= 19",
    "Explorer >= 8",
    "iOS >= 6",
    "Opera >= 12",
    "Safari >= 6"
  ]

```

## 24、camelize：横线转驼峰命名

```js
let camelizeRE = /-(\w)/g;
function camelize(str) {
    return str.replace(camelizeRE, function(_, c) {
        return c ? c.toUpperCase() : '';
    })
}
//ab-cd-ef ==> abCdEf
//使用记忆函数
let _camelize = cached(camelize)

```

## 25、hyphenate：驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小写

```js
let hyphenateRE = /\B([A-Z])/g;
function hyphenate(str){
    return str.replace(hyphenateRE, '-$1').toLowerCase()
}
//abCd ==> ab-cd
//使用记忆函数
let _hyphenate = cached(hyphenate);

```

## 26、unique：数组去重，返回一个新数组

```js
function unique(arr){
    if(!isArrayLink(arr)){ //不是类数组对象
        return arr
    }
    let result = []
    let objarr = []
    let obj = Object.create(null)

    arr.forEach(item => {
        if(isStatic(item)){//是除了symbol外的原始数据
            let key = item + '_' + getRawType(item);
            if(!obj[key]){
                obj[key] = true
                result.push(item)
            }
        }else{//引用类型及symbol
            if(!objarr.includes(item)){
                objarr.push(item)
                result.push(item)
            }
        }
    })

    return resulte
}

```

## 27、根据 图片Orientation旋转图片，得到base64

```js
/**
 * 根据 图片Orientation旋转图片，得到base64
 * @param  {Object} options:图片数据
 * @options {String} base64:图片角度
 * @options {Num} width:图片宽
 * @options {Num} height:图片高
 * @options {Num} quality:图片质量
 */

```

```js
export const fistImg = (options) => {
    if( !options) {
        throw 'missing arguments options';
    }
    let img = options.img;
    let orientation = options.orientation;
    let width = options.width;
    let height = options.height;
    let canvas = document.createElement('canvas');
    canvas.id = 'fistImg';
    let ctx = canvas.getContext('2d');

    switch (orientation) {
        case 3:
            canvas.width = width;
            canvas.height = height;
            ctx.translate(canvas.width, canvas.height);
            ctx.rotate(180 * Math.PI / 180);
            break;
        case 6:
            canvas.width = height;
            canvas.height = width;
            ctx.translate(canvas.width, 0);
            ctx.rotate(90 * Math.PI / 180);
            break;
        case 8:
            canvas.width = height;
            canvas.height = width;
            ctx.translate(0, canvas.height);
            ctx.rotate(270 * Math.PI / 180);
            break;
        default:
            canvas.width = width;
            canvas.height = height;
        // ctx.translate(canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/jpeg",options.quality||.8);
};

```

```js
  //禁止页面下拉
  var overscroll = function(el){
        el.addEventListener('touchstart', function(){
            var top = el.scrollTop;
            var totalScroll = el.scrollHeight;
            var currentScroll = top + el.offsetHeight;
            if(top === 0) {
                el.scrollTop = 1;
            }else if(currentScroll === totalScroll){
                el.scrollTop = top - 1;
            }
        });
        el.addEventListener('touchmove', function(evt){
            if(el.offsetHeight < el.scrollHeight){
                evt._isScroller = true;
            }
        });
    }

	overscroll(document.querySelector('.cover'));//哪里需要可以局部滚动，添加一个“scroll”的class
        document.body.addEventListener('touchmove', function(evt) {
            if(!evt._isScroller){
                evt.preventDefault();
            }
        });

	// 有表单时，页面位移
	$('body').height($(window).height());


	// 移动端禁止滑动
	document.addEventListener("touchmove", function (e) {
		e.preventDefault()
	}, { passive: false })


	// 随机数
	function random(min, max) {
		if(max == null) {
			max = min;
			min = 0;
		}
		return min + Math.floor(Math.random() * (max - min + 1));
	};


	// 移动设备判断

	//移动端左右边距
	if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
		document.getElementsByTagName("body")[0].style.minWidth = "1028px";
	}


	### 微信段

	// 微信下媒体播放
    if(WeixinJSBridge && /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		WeixinJSBridge.invoke('getNetworkType', {},
			function(e) {
				speak.pause();
			});
	} else {
		speak.pause();
	}



	//禁用分享
	function onBridgeReady() {
		WeixinJSBridge.call('hideOptionMenu');
	}

	if(typeof WeixinJSBridge == "undefined") {
		if(document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		} else if(document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		}
	} else {
		onBridgeReady();
	}
	/*end禁用微信分享功能?*/


	/* 仅限制微信打开start */

	// 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
	var useragent = navigator.userAgent;
	if(useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
		// 这里警告框会阻塞当前页面继续加载
		alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
		// 以下代码是用javascript强行关闭当前页面
		var opened = window.open('about:blank', '_self');
		opened.opener = null;
		opened.close();
	}

	/* 仅限制微信打开end */



	/* 关闭浏览器 s */

	setTimeout(function () {
		window.WeixinJSBridge && window.WeixinJSBridge.call('closeWindow');
	}, 800);
	/* 关闭浏览器 e */

```


## 28、禁止页面滑动与开启

```
    document.body.addEventListener('touchmove', this.bodyScroll, { passive: false });

    document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });


    bodyScroll (event) {
        event.preventDefault();
    }

```
