
# 正则表达式
----------

## 常用的正则字符

| 正则字符 | 描述 |
| ---- | ---- |
| \ | 将下一个字符标记为一个特殊字符、或一个原义字符、或一个 向后引用、或一个八进制转义符。例如，'n' 匹配字符 "n"。'n' 匹配一个换行符。序列 '\' 匹配 "" 而 "(" 则匹配 "("。 |
| ^ | 匹配输入字符串的开始位置。如果设置了 RegExp 对象的 Multiline 属性，^ 也匹配 'n' 或 'r' 之后的位置。 |
| $ | 匹配输入字符串的结束位置。如果设置了RegExp 对象的 Multiline 属性，$ 也匹配 'n' 或 'r' 之前的位置。 |
| * | 匹配前面的子表达式零次或多次。例如，zo 能匹配 "z" 以及 "zoo"。 等价于{0,}。 |
| + | 匹配前面的子表达式一次或多次。例如，'zo+' 能匹配 "zo" 以及 "zoo"，但不能匹配 "z"。+ 等价于 {1,}。 |
| ? | 匹配前面的子表达式零次或一次。例如，"do(es)?" 可以匹配 "do" 或 "does" 中的"do" 。? 等价于 {0,1}。 |
| {n} |	n 是一个非负整数。匹配确定的 n 次。例如，'o{2}' 不能匹配 "Bob" 中的 'o'，但是能匹配 "food" 中的两个 o。|
| {n,} | n 是一个非负整数。至少匹配n 次。例如，'o{2,}' 不能匹配 "Bob" 中的 'o'，但能匹配 "foooood" 中的所有 o。'o{1,}' 等价于 'o+'。'o{0,}' 则等价于 'o*'。|
| {n,m} |	m 和 n 均为非负整数，其中n <= m。最少匹配 n 次且最多匹配 m 次。例如，"o{1,3}" 将匹配 "fooooood" 中的前三个 o。'o{0,1}' 等价于 'o?'。请注意在逗号和两个数之间不能有空格。|
| ? |当该字符紧跟在任何一个其他限制符 (*, +, ?, {n}, {n,}, {n,m}) 后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。例如，对于字符串 "oooo"，'o+?' 将匹配单个 "o"，而 'o+' 将匹配所有 'o'。|
| · |	匹配除 "n" 之外的任何单个字符。要匹配包括 'n' 在内的任何字符，请使用象 '[.n]' 的模式。|
| (pattern) |	匹配 pattern 并获取这一匹配。所获取的匹配可以从产生的 Matches 集合得到，在VBScript 中使用 SubMatches 集合，在JScript 中则使用 $0…$9 属性。要匹配圆括号字符，请使用 '(' 或 ')'。|
| (?:pattern)	 |匹配 pattern 但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。这在使用 "或" 字符 (|) 来组合一个模式的各个部分是很有用。例如， 'industr(?:y|ies) 就是一个比 'industry|industries' 更简略的表达式。|
| (?=pattern)	 |正向预查，在任何匹配 pattern 的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如，'Windows (?=95|98|NT|2000)' 能匹配 "Windows 2000" 中的 "Windows" ，但不能匹配 "Windows 3.1" 中的 "Windows"。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。|
| (?!pattern) |	负向预查，在任何不匹配 pattern 的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如'Windows (?!95|98|NT|2000)' 能匹配 "Windows 3.1" 中的 "Windows"，但不能匹配 "Windows 2000" 中的 "Windows"。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始|
| x|y |	匹配 x 或 y。例如，'z|food' 能匹配 "z" 或 "food"。'(z|f)ood' 则匹配 "zood" 或 "food"。|
| [xyz] |	字符集合。匹配所包含的任意一个字符。例如， '[abc]' 可以匹配 "plain" 中的 'a'。|
| [^xyz] |	负值字符集合。匹配未包含的任意字符。例如， '[^abc]' 可以匹配 "plain" 中的'p'。|
| [a-z] |	字符范围。匹配指定范围内的任意字符。例如，'[a-z]' 可以匹配 'a' 到 'z' 范围内的任意小写字母字符。|
| [^a-z] |	负值字符范围。匹配任何不在指定范围内的任意字符。例如，'[^a-z]' 可以匹配任何不在 'a' 到 'z' 范围内的任意字符。|
| \b |	匹配一个单词边界，也就是指单词和空格间的位置。例如， 'erb' 可以匹配"never" 中的 'er'，但不能匹配 "verb" 中的 'er'。|
| \B |	匹配非单词边界。'erB' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。|
| \cx |	匹配由 x 指明的控制字符。例如， cM 匹配一个 Control-M 或回车符。x 的值必须为 A-Z 或 a-z 之一。否则，将 c 视为一个原义的 'c' 字符。|
| \d |	匹配一个数字字符。等价于 [0-9]。|
| \D |	匹配一个非数字字符。等价于 [^0-9]。|
| \f |	匹配一个换页符。等价于 \x0c 和 \cL。|
| \n |	匹配一个换行符。等价于 \x0a 和 \cJ。|
| \r |	匹配一个回车符。等价于 \x0d 和 \cM。|
| \s |	匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。|
| \S |	匹配任何非空白字符。等价于 [^ \f\n\r\t\v]。|
| \t |	匹配一个制表符。等价于 \x09 和 \cI。|
| \v |	匹配一个垂直制表符。等价于 \x0b 和 \cK。|
| \w |	匹配包括下划线的任何单词字符。等价于'[A-Za-z0-9_]'。|
| \W |	匹配任何非单词字符。等价于 '[^A-Za-z0-9_]'。|
| \xn |	匹配 n，其中 n 为十六进制转义值。十六进制转义值必须为确定的两个数字长。例如，'\x41' 匹配 "A"。'x041' 则等价于 '\x04' & "1"。正则表达式中可以使用 ASCII 编码。|
| \num |	匹配 num，其中 num 是一个正整数。对所获取的匹配的引用。例如，'(.)\1' 匹配两个连续的相同字符。|
| \n |	标识一个八进制转义值或一个向后引用。如果 n 之前至少 n 个获取的子表达式，则 n 为向后引用。否则，如果 n 为八进制数字 (0-7)，则 n 为一个八进制转义值。|
| \nm |	标识一个八进制转义值或一个向后引用。如果 \nm 之前至少有 nm 个获得子表达式，则 nm 为向后引用。如果 \nm 之前至少有 n 个获取，则 n 为一个后跟文字 m 的向后引用。如果前面的条件都不满足，若 n 和 m 均为八进制数字 (0-7)，则 \nm 将匹配八进制转义值 nm。|
| \nml |	如果 n 为八进制数字 (0-3)，且 m 和 l 均为八进制数字 (0-7)，则匹配八进制转义值 nml。|

## RegExp类型

`ECMAScript`通过`RegExp`类型支持正则表达式，如下：

```js
var expression = /pattern/flags;
```
其中的模式`（pattern）`部分可以是任何简单或者复杂的正则表达式，可以包含字符类、限定符、分组、向前查找以及反向引用。每个正则表达式可带有一个或者多个标注`（flags）`,用以标明正则表达式的行为。有三个一下标志：

- g：表示全局模式,即模式将被应用到所有字符串，而非在发现第一个匹配项时立即停止。
- i：表示不区分大小写模式。
- m：表示多行模式，即在到达一行文本末尾时还在继续查找下一行中是否存在于模式匹配的项。

## 正则表达式定义方式

### 以字面量的形式来定义正则表达式

例如：匹配第一个`bat`或者`cat`,不区分大小写

```js
var pattern = /[bc]at/i;
```

### 使用RegExp构造函数

它接收两个参数：一个是要匹配的字符串模式，另一个是可选的标志字符串。可以使用字面量定义的任何表达式，都可以使用构造函数来定义，还是以上面的例子为例：

```js
var pattern = new RegExp("[bc]at","i");
```

> 注意:`RegExp`构造函数模式参数时字符串，所以再某些情况下要对字符进项双重转义。所有元字符都必须双重转义，如字面量模式为`/\[bc\]`at/,那么等价的字符串为"`/\\[bc\\]at/`"

```js
var re = null,i;
for(i=0; i < 10; i++){
    re = /cat/g;
    console.log(re.test("catastrophe"));
}
for(i=0; i < 10; i++){
    re = new RegExp("cat","g");
    console.log(re.test("catastrophe"));
}
```

打印结果都为10个true

## 正则表达式方法

### RegExp对象的exec()方法

该方法是专门为捕获组而设计的，其接受一个参数，即要应用模式的字符串，然后返回包含第一个匹配项信息的数组；或者在没有匹配项的情况下返回`null`。返回的数组虽然是`Array`的实例，但是包含两个额外的属性：`index`和`input`。其中`index`表示匹配项在字符串中的位置，而`input`表示应用字符串表达式的字符串。  
例：

```js
var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;
var matches = pattern.exec(text);
console.log(matches.index); //0
console.log(matches.input); //mom and dad and baby
console.log(matches[0]);    //mom and dad and baby
console.log(matches[1]);    //and dad and baby
console.log(matches[2]);    //and baby
```

对于`exec()`方法而言，即使在模式中设置了全局标志`g`，它每次也只是返回一个匹配项。在不设置全局标志的情况下，在同一个字符串上多次调用`exec()`方法将始终返回第一个匹配项的信息。而在设置全局标志的情况下，每次调用`exec()`则都会在字符串中继续查找新匹配项，如下例子：

```js

var text = "cat, bat, sat, fat";
var pattern1 = /.at/;

var matches = pattern1.exec(text);
console.log(matches.index); //0
console.log(matches[0]);  //cat
console.log(pattern1.lastIndex); //0

matches = pattern1.exec(text);
console.log(matches.index); //0
console.log(matches[0]);  //cat
console.log(pattern1.lastIndex); //0

var pattern2 = /.at/g;

var matches = pattern2.exec(text);
console.log(matches.index); //0
console.log(matches[0]);  //cat
console.log(pattern2.lastIndex); //3

var matches = pattern2.exec(text);
console.log(matches.index); //5
console.log(matches[0]);  //bat
console.log(pattern2.lastIndex); //8
```

> **注意：**`IE`的`JavaScript`实现`lastIndex`属性上存在偏差，即使在非全局模式下，`lastIndex`属性每次也都在变化。

### test()方法

正则表达式常用方法test()，它接受一个字符串参数。在模式与该参数匹配的情况下返回`true`，否则返回`false`。

用法：正则.test(字符串)

例1：判断是否是数字

```js
var str = '374829348791';
var re = /\\D/;      //  \\D代表非数字
if( re.test(str) ){   // 返回true,代表在字符串中找到了非数字。
    alert('不全是数字');
}else{
    alert('全是数字');
}
```

例2：

```js
var text ="000-00-0000";
var pattern = /\\d{3}-\\d{2}-\\d{4}/;
if(pattern.test(text)){
    console.log('the pattern was matched.');
}
```

### search()方法

在字符串搜索符合正则的内容，搜索到就返回出现的位置（从0开始，如果匹配的不只是一个字母，那只会返回第一个字母的位置）， 如果搜索失败就返回 -1

用法：字符串.search(正则)

例子：在字符串中找字母b，且不区分大小写

```js
var str = 'abcdef';
var re = /B/i;
//var re = new RegExp('B','i'); 也可以这样写
alert( str.search(re) ); // 1
```

### match方法

获取正则匹配到的结果，以数组的形式返回

用法： 字符串.match(正则)

例如：

```js
"186a619b28".match(/\d+/g); // ["186","619","28"] 
```

### replace方法

replace 本身是JavaScript字符串对象的一个方法，它允许接收两个参数：

`replace([RegExp|String],[String|Function])`  
第1个参数可以是一个普通的字符串或是一个正则表达式.  
第2个参数可以是一个普通的字符串或是一个回调函数.

如果第2个参数是回调函数，每匹配到一个结果就回调一次，每次回调都会传递以下参数：

*   result: 本次匹配到的结果
*   $1,...$9: 正则表达式中有几个()，就会传递几个参数，$1~$9分别代表本次匹配中每个()提取的结果，最多9个
*   offset:记录本次匹配的开始位置
*   source:接受匹配的原始字符串

以下是replace和JS正则搭配使用的几个常见经典案例：

**（1）实现字符串的trim函数，去除字符串两边的空格**

```js
String.prototype.trim = function(){
 
  //方式一：将匹配到的每一个结果都用""替换
  return this.replace(/(^\s+)|(\s+$)/g,function(){
    return "";
  });
 
  //方式二：和方式一的原理相同
  return this.replace(/(^\s+)|(\s+$)/g,'');
};

```

^s+ 表示以空格开头的连续空白字符，s+$ 表示以空格结尾的连续空白字符，加上() 就是将匹配到的结果提取出来，由于是 | 的关系，因此这个表达式最多会match到两个结果集，然后执行两次替换：

```js
String.prototype.trim = function(){
  /**
   * @param rs：匹配结果
   * @param $1:第1个()提取结果
   * @param $2:第2个()提取结果
   * @param offset:匹配开始位置
   * @param source：原始字符串
   */
  this.replace(/(^\s+)|(\s+$)/g,function(rs,$1,$2,offset,source){
    //arguments中的每个元素对应一个参数
    console.log(arguments);
  });
};
 
" abcd ".trim();
```

输出结果：

```js
[" ", " ", undefined, 0, " abcd "] //第1次匹配结果
[" ", undefined, " ", 5, " abcd "] //第2次匹配结果
```

**（2）提取浏览器url中的参数名和参数值，生成一个key/value的对象**

```js
function getUrlParamObj(){
  var obj = {};
  //获取url的参数部分
  var params = window.location.search.substr(1);
  //[^&=]+ 表示不含&或=的连续字符，加上()就是提取对应字符串
  params.replace(/([^&=]+)=([^&=]*)/gi,function(rs,$1,$2){
    obj[$1] = $2;
  });
 
  return obj;
}

```

`/([^&=]+)=([^&=]*)/gi` 每次匹配到的都是一个完整`key/valu`e,形如 `xxxx=xxx`, 每当匹配到一个这样的结果时就执行回调，并传递匹配到的key和value，对应到$1和$2

**（3）在字符串指定位置插入新字符串**

```js
String.prototype.insetAt = function(str,offset){
 
  //使用RegExp()构造函数创建正则表达式
  var regx = new RegExp("(.{"+offset+"})");
 
  return this.replace(regx,"$1"+str);
};
 
"abcd".insetAt('xyz',2); //在b和c之间插入xyz
//结果 "abxyzcd"

```

当`offset=2`时，正则表达式为：`(^.{2})` .表示除`\n`之外的任意字符，后面加`{2}` 就是匹配以数字或字母组成的前两个连续字符，加`()`就会将匹配到的结果提取出来，然后通过`replace`将匹配到的结果替换为新的字符串，形如：结果=结果`+str`

**（4） 将手机号12988886666转化成129 8888 6666**

```js
function telFormat(tel){
 
  tel = String(tel);
 
  //方式一
  return tel.replace(/(\d{3})(\d{4})(\d{4})/,function (rs,$1,$2,$3){
    return $1+" "+$2+" "+$3
  });
 
  //方式二
  return tel.replace(/(\d{3})(\d{4})(\d{4})/,"$1 $2 $3");
}

```

`(\d{3}\d{4}\d{4})` 可以匹配完整的手机号，并分别提取前3位、4-7位和8-11位，`"$1 $2 $3"` 是在三个结果集中间加空格组成新的字符串，然后替换完整的手机号。

## 常用实例

匹配第一个bat或者cat,不区分大小写： `/[bc]at/i` 或者 `new RegExp("[bc]at","i")`;

匹配所有以"at"结尾的3个字符组合，不区分大小写：`/.at/gi`;

只能输入数字：`^[0-9]*$`;

只能输入n位的数字：`^\d{n}$`

只能输入至少n位的数字：`^\d{n,}$`

只能输入m~n位的数字：`^\d{m,n}$`

只能输入零和非零开头的数字：`^(0|[1-9][0-9]*)$`

只能输入有两位小数的正实数：`^[0-9]+(.[0-9]{2})?$`

只能输入有1~3位小数的正实数：`^[0-9]+(.[0-9]{1,3})?$`

只能输入非零的正整数：`^\+?[1-9][0-9]*$`

只能输入长度为3的字符：`^.{3}$`

只能输入由26个英文字母组成的字符串：`^[A-Za-z]+$`

只能输入由数字和26个英文字母组成的字符串：`^[A-Za-z0-9]+$`

只能输入由数字、26个英文字母或者下划线组成的字符串：`^\w+$`

验证用户密码：以字母开头，长度在6~18之间，只能包含字符、数字和下划线：`^[a-zA-Z]\w{5,17}$`

验证是否含有^%&',;=?$"等字符：`[^%&',;=?$\x22]+`

只能输入汉字：`^[\u4e00-\u9fa5]{0,}$`

验证Email地址：`^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$`

验证InternetURL：`^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$`

验证身份证号（15位或18位数字）：`^\d{15}|\d{18}$`

验证IP地址：`^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$`

匹配两个两个重叠出现的字符 例如，"aabbc11asd"， 返回结果为aa bb 11三组match：`(\w)\1`

匹配成对的HTML标签：`<(?<tag>[^\s>]+)[^>]*>.*</\k<tag>>`

匹配1-58之间的数字：`/^([1-9]|[1-5][0-8])$/`

匹配 -90至90之间的整数（包括-90和90）：`^(-?[1-8][0-9]|-?[1-9]|-?90|0)$`  
匹配收尾空白字符：`^\s+|\s+$`  
中文，全角，半角匹配：

```js
str="中文;；ａ"    
  alert(str.match(/[\u0000-\u00ff]/g))     //半角  
  alert(str.match(/[\u4e00-\u9fa5]/g))     //中文  
  alert(str.match(/[\uff00-\uffff]/g))     //全角

```

找重复项最多的字符个数：

```js
var str = 'assssjdssskssalsssdkjsssdss';

var arr = str.split(''); //把字符串转换为数组
str = arr.sort().join(''); //首先进行排序，这样结果会把相同的字符放在一起，然后再转换为字符串
//alert(str);  // aaddjjkklsssssssssssssssss

 var value = '';
 var index = 0; 
var re = /(\w)\1+/g;  //匹配字符，且重复这个字符，重复次数至少一次。
str.replace(re,function($0,$1){ 
   //alert($0);   代表每次匹配成功的结果 : aa dd jj kk l sssssssssssssssss
     //alert($1);  代表每次匹配成功的第一个子项，也就是\w:  a d j k l S 
　　
    if(index<$0.length){  //如果index保存的值小于$0的长度就进行下面的操作
          index = $0.length;  // 这样index一直保存的就在最大的长度
           value = $1;  //value保存的是出现最多的这个字符
    }

}); 

alert('最多的字符:'+value+',重复的次数:'+index);  // s   17

```

判断是不是QQ号：  
//^ : 放在正则的最开始位置，就代表起始的意思，注意 /[1](#fn-1) / 和 /^\[a\]/是不一样的，前者是排除的意思，后者是代表首位。

//$ : 正则的最后位置 , 就代表结束的意思

//首先想QQ号的规则 
      1 首位不能是0 
      2 必须是 5-12位的数字

 ```js
 
 //首先想QQ号的规则 
      1 首位不能是0 
      2 必须是 5-12位的数字
   
    var aInput = document.getElementsByTagName('input');
    var re = /^[1-9]\d{4,11}$/;
    //123456abc为了防止出现这样的情况，所以必须限制最后
    //首位是0-9，接着是4-11位的数字类型。
aInput[1].onclick = function(){
    if( re.test(aInput[0].value) ){
        alert('是QQ号');
    }else{
        alert('不是QQ号');
    }

};
```

去掉前后空格（面试题经常出现）：

```js
var str = '  hello  ';
alert( '('+trim(str)+')' );//为了看出区别所以加的括号。 (hello)
function trim(str){
   var re = /^\s+|\s+$/g; // |代表或者   \s代表空格  +至少一个    前面有至少一个空格 或者后面有至少一个空格 且全局匹配
  return str.replace(re,''); //把空格替换成空
}
```

常用的一些表单校验：

```js
匹配中文：[\u4e00-\u9fa5] //中文ACALL码的范围
行首行尾空格：^\s*|\s*$ //首行出现任意个空格或者尾行出现任意个空格（任意表示也可以没有空格）

Email：^\w+@[a-z0-9]+(\.[a-z]+){1,3}$  
      //起始至少为一个字符(\w字母，数字或者下划线)，然后匹配@,接着为任意个字母或者数字，\.代表真正的点，.后面为至少一个的字符（a-z）,同时这个(比如.com)整体为一个子项作为结束，可以出现1-3次。因为有的邮箱是这样的.cn.net。（xxxx.@qq.com xxxx.@163.com xxxx.@16.cn.net ）

网址：[a-zA-z]+://[^\s]*   http://......
  //匹配不分大小写的任意字母，接着是//,后面是非空格的任意字符

邮政编码：[1-9]\d{5}  //起始数字不能为0，然后是5个数字
身份证：[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x

```

**可参考地址：**  
[精通 JS正则表达式](https://link.segmentfault.com/?enc=9ZteQcIF7O4nUskZTx223w%3D%3D.9YtUEDfu%2BaB4VA5vFR39JPIJDhzFSBTC8nrsXl%2FCKU6fF%2FXD%2FH3lV1FCDuuDz%2BQRW%2BSGjiTdZf%2FIikhp1UmOgA%3D%3D)  
[精通正则表达式- 读书笔记](https://segmentfault.com/a/1190000004498476)  
[过目不忘JS正则表达式](https://link.segmentfault.com/?enc=nKrUKhHstlIjb4X0AQIe3g%3D%3D.D9iayG8NlMgCRhzfVGbwLQGgr6sRrrZvc90%2BGMfxGKiIUJaJbFfwRyEXzLtp1D%2FJR1Cxg4nKw5dkOrvZOlhTGQ%3D%3D)