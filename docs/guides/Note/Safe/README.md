# 前端安全

> 前端安全

## CSRF攻击

## DDOS

基于DOS

## xss攻击

### 攻击方式

- 反射型

发出请求时，XSS代码出现在URL中，作为输入提交到服务器端，
服务器端解析后响应，XSS代码随响应内容-起传回给浏览器,
最后浏览器解析执行XSS代码。这个过程像一-次反射，故叫反射型XSS。

- 存储型

存储型XSS和反射型XSS的差别仅在于，提交的代码会存储在
服务器端(数据库，内存，文件系统等)，下次请求 目标页面时不用
再提交XSS代码

写入到服务器

### 防御措施

- 编码

HTML Entity编码

将字符进行转义

输入内容的转义（客户端或服务端）

客户端反转义

DOMParse解析（文本转DOM对象）

- 过滤

移除用户上传的DOM属性（onerror等）

移除用户上传的style节点、script节点、iframe节点等

- 校正

避免直接对HTML entity解码

使用DOM Parse转换，校正不配对的DOM标签