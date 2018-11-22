<h2 align="center">从url输入到页面加载完成的过程</h3>
首先，梳理出一个骨架，有了骨架，才方便填充细节：

```
1. 从浏览器输入url到开启网络请求线程（浏览器的机制以及进程和线程etc）
2. 开启网络线程到发出一个完整的http请求（dns查询，tcp/ip请求，五层因特网协议栈etc）
3. 从服务器接收到请求到对应后台接收请求（负载均衡，安全拦截以及后台内部处理etc）
4. 后台和前台的http交互（http头部、响应码、报文结构、cookie，涉及静态资源的cookie优化，编码解码，gzip压缩。http缓存）
5. 浏览器接收到http数据包后的解析流程（解析html——词法分析然后解析成dom树、解析css生成css规则树、合并成render树，然后layout、painting渲染、复合图层的合成、GPU绘制、外链资源的处理、loaded和domcontentloaded等）
6. css的可视化格式模型（元素的渲染规则，如包含块，控制框，BFC，IFC等概念）
7. js引擎解析过程（JS的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）
8. 拓展
```
填坑：知识体系构建：浏览器渲染原理、JS运行机制、JS引擎解析流程，完善前端知识体系~

### 从浏览器输入url到开启网络请求线程
涉及知识点：[浏览器进程/线程模型、js的运行机制](https://segmentfault.com/a/1190000012925872)

1. 浏览器打开一个Tab页，创建了两个浏览器进程————Browser进程和Render进程，系统给它们分配了cpu、内存。
2. 输入url（键盘输入，操作系统交互，屏幕显示balabala），Browser进程校验url，校验完成确认是有效的网址，开辟网络请求线程

### 开启网络线程到发出一个完整的http请求
涉及知识点：[域名解析查询](https://www.zhihu.com/question/34873227)、tcp/ip请求构建（三次握手四次挥手）、五层因特网协议栈

1. 拿到有效的链接，dns去查询内存里的dns cache，没有就再查询hosts，hosts没有就查询本地dns服务器，最终查询到之后返回ip地址。这里面过程很复杂：涉及[TCP/IP、UDP...](https://blog.csdn.net/freekiteyu/article/details/72236734)、[ARP、套接字](https://github.com/skyline75489/what-happens-when-zh_CN/blob/master/README.rst#arp)
2. 浏览器拿到dns返回的ip，发起网络请求：应用层发起请求，到传输层通过三次握手建立TCP/IP连接，再到网络层的ip寻址，数据链路层封装成帧，最后物理层利用物理介质传输。涉及知识点：三次握手建立连接四次挥手断开连接

### 从服务器接收到请求到对应后台接收请求
涉及知识点：负载均衡、后端验证（安全拦截、跨域验证）

1. 服务器接收请求，由于并发访问量大，所以会有多台服务器，然后一般请求指向调度服务器（Nginx服务器），根据调度算法将请求分发到实际的服务器。涉及知识点：负载均衡
2. 实际服务器后端会做一个基础校验，比如安全验证，跨域验证之类的，如果校验不通过，就直接返回相应的http报文，比如说拒绝访问啊之类的
3. 当验证通过之后才会进入到实际的后台代码里，程序执行操作（增删查改啊之类的）
4. 程序执行完会返回一个http响应包（经过多层封装）

### 后台和前台的http交互
[涉及知识点](https://www.kancloud.cn/xiaoyulive/system/598706)：http头部、响应码、报文结构、cookie，涉及静态资源的cookie优化，编码解码，gzip压缩，http缓存

#### http

前后端的http交互时，http报文作为信息的载体，这一块着重讲一下http报文结构。

报文结构一般包括了：通用头部、请求/响应头部、请求/响应体

1. 通用头部
    ```
    // 请求的web服务器地址
    Request URL: http://cs.workorder.sommer.tff.com/work/order/10015432/acbList
    // 请求方式（Get、POST、OPTIONS、PUT、HEAD、DELETE、CONNECT、TRACE）
    Request Method: GET
    // 请求的返回状态码
    Status Code: 200 OK
    // 请求的远程服务器地址Ip
    Remote Address: 127.0.0.1:80
    // 表示来源https://imququ.com/post/referrer-policy.html
    Referrer Policy: no-referrer-when-downgrade
    ```

2. 请求/响应头部

    a. 请求头
    ```
    // 接收类型， 标识浏览器支持的MIME类型
    Accept: application/json, text/plain, */*
    // 浏览器支持的压缩类型,如gzip等,超出类型不能接收
    Accept-Encoding: gzip, deflate
    // 
    Accept-Language: zh-CN,zh;q=0.9
    // 指定请求和响应遵循的缓存机制，如no-cache
    Cache-Control: no-cache
    // 当浏览器与服务器通信时对于长连接如何进行处理,如keep-alive
    Connection: keep-alive
    // 有cookie并且同域访问时会自动带上
    Cookie: _ADMQAID=shvspkqspttltfvl9hdrvaeg36; SA7d5f843d6ec51e9e8e0d906e75426e37=aqj9i81umq9bgvk394ntqvq3a4; sign=; STd78901e822bee4832e44270a3660abd9=55p7884irqrib202eo4q3nqhd4; language=sc; no_ref=1; XSRF-TOKEN=eyJpdiI6Ilk1STJSaDBkUmczXC9yWUUybTlJcEdRPT0iLCJ2YWx1ZSI6IjRkaVN4V0Q5U0Y3bHlaSmJJS29XYTBHS1FTclBIcEdOV1ZDSTVUQmFjK1lMak13M2RuQUtDT0xjdFBjT2NCdjlzc1k0ZGpBenU5eGpDdFdjb3hpQWZBPT0iLCJtYWMiOiJlMDJlYWEzNjc5ZDJlYWI4MDk1Y2EwMGI4NzQwNmQ4NTRjMzYzZmY4NjQ1ZjA4MzViOWFmOTFjYzc2YzY3ZjVlIn0%3D; tff_session=eyJpdiI6IjNtM2syNWFjNVlNYWV3WmdGb0lrTFE9PSIsInZhbHVlIjoiRFZNelI2NWVxdXRSQjNTd3Y2XC9td3BDdStqNHRlSHpEd2Q0dVN4ajh0N0lYMlFXUnZSRHkzUGhxaWxNaCtOcFlkU3dlRkVJa0RhUjVNdDZnWmVuMTdRPT0iLCJtYWMiOiI5ODNhZWZhNjVhZjBhOTg3ZmMxMDQxZTIxYWNhMmEzOTU3YjMxNmQ5MWM0YWJmYjZjZTQ2M2RjMzhiMDU5OGYyIn0%3D
    Host: cs.workorder.sommer.tff.com
    Pragma: no-cache
    // 该页面的来源URL(适用于所有类型的请求，会精确到详细页面地址，csrf拦截常用到这个字段)
    Referer: http://cs.workorder.sommer.tff.com/work/order/10015432/edit?devs=toursforfun
    // 用户客户端的一些必要信息，如UA头部等
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36
    X-XSRF-TOKEN: eyJpdiI6Ilk1STJSaDBkUmczXC9yWUUybTlJcEdRPT0iLCJ2YWx1ZSI6IjRkaVN4V0Q5U0Y3bHlaSmJJS29XYTBHS1FTclBIcEdOV1ZDSTVUQmFjK1lMak13M2RuQUtDT0xjdFBjT2NCdjlzc1k0ZGpBenU5eGpDdFdjb3hpQWZBPT0iLCJtYWMiOiJlMDJlYWEzNjc5ZDJlYWI4MDk1Y2EwMGI4NzQwNmQ4NTRjMzYzZmY4NjQ1ZjA4MzViOWFmOTFjYzc2YzY3ZjVlIn0=
    ```

    b. 响应头
    ```
    // 告诉浏览器或其他客户，什么环境可以安全的缓存文档
    Cache-Control: no-cache
    Connection: keep-alive
    // 服务端返回的实体内容的类型
    Content-Type: application/json
    Date: Thu, 22 Nov 2018 06:13:41 GMT
    // 服务器的一些相关信息
    Server: nginx/1.10.3 (Ubuntu)
    Set-Cookie: XSRF-TOKEN=eyJpdiI6IkZVVWdsSzI3eHdYVGF6SEJ3MG5xcmc9PSIsInZhbHVlIjoibUtUQWJNRnoxWm84eTJYUVR4YjdXWWY4SnBua2tnMlEzRjl6U0JVUm5sTzF2elBlZ1kraEt0dlg4bnBraXVNaE9aVFwvZVdld2dcLzNaMFZiWm9RTjBEdz09IiwibWFjIjoiZjE3ZjYwNjE0ODUzZDUzODhhZTFmODM0ZDc5MTQxMDhiMTUwZWVlMGQyZjAwMDQxMzQ1OGVmZmIxOTcxNWU5ZSJ9; expires=Thu, 22-Nov-2018 08:13:41 GMT; Max-Age=7200; path=/; domain=workorder.sommer.tff.com
    Set-Cookie: tff_session=eyJpdiI6IkhISitIXC80K0RIREtOOWVFcklCZ093PT0iLCJ2YWx1ZSI6InhEVkpEemZQbkduZ1dneWhFNEN0Sk8xQyszR3Y2Tkx1QWRoOWNoNDY4dHczRjU4UHd3SGVLQTlJQVgxOXBPeTYyVjFCOVFwQUo2dkxzSCtNWnl2MG9nPT0iLCJtYWMiOiIxOWQzNzFjZTc0Y2U5ZmExYTYzNDM0ZTNlNWZjNTkxZTc3NWFlZDdhMWEyMDljZTIyMTRkMDhkODg3MDMxZGRlIn0%3D; expires=Thu, 22-Nov-2018 08:13:41 GMT; Max-Age=7200; path=/; domain=workorder.sommer.tff.com; httponly
    Transfer-Encoding: chunked
    ```

3. 请求/响应实体

    http请求时，除了头部，还有消息实体，一般来说，请求实体中会将一些需要的参数都放入进入（用于post请求）。譬如实体中可以放参数的序列化形式（a=1&b=2这种），或者直接放表单对象（Form Data对象，上传时可以夹杂参数以及文件），等等。而一般响应实体中，就是放服务端需要传给客户端的内容。一般现在的接口请求时，实体中就是对于的信息的json格式，而像页面请求这种，里面就是直接放了一个html字符串，然后浏览器自己解析并渲染。

#### https

    https就是安全版的http，涉及知识点[SSL/TLS的握手流程](https://dailc.github.io/2018/03/12/whenyouenteraurl.html)

### 浏览器接收到http数据包后的解析流程

浏览器接收到http数据包之后进行解析，渲染

1. 解析html，构建DOM树
2. 解析css，生成css规则树
3. 合并DOM树和css规则，生成render树
4. 布局render树（重绘、回流），负责各元素尺寸、位置的计算
5. 绘制render树，绘制页面像素信息
6. 浏览器将各层信息发送给GPU，GPU将各层合成，显示在屏幕上

