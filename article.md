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

