<div align="center">
	<a href="#">
		<img width="100" heigth="100" src="./doc/logo.png">
	</a>
	<h2>二毛伪全栈框架初探^_^</h2>
	<p align="left">
		一个简单的登录注册全栈框架，不够完善，仅仅只是简单的数据的写入读取，但是客户端-服务器-数据库整个流程算是都过了一遍，在这里做个小笔记。日后有时间再慢慢完善，嘿嘿嘿......
	<p>
</div>

<h2 align="center">安装运行</h2>

+ [node安装](http://www.runoob.com/nodejs/nodejs-install-setup.html)
+ [mysql安装](http://www.runoob.com/mysql/mysql-install.html)

mysql安装完成之后，默认的root用户密码为空，使用下面的命令创建root用户的密码
```
mysqladmin -u root password "new_password"
```
然后连接mysql数据库
```
mysql -u root -p
```
输入密码的时候是不显示的...嘤QAQ

当然也可以使用工具啦嘻嘻，就很快~我用的[Navicat Premium 12](https://blog.csdn.net/zuihongyan518/article/details/80951911)。连接数据库之后创建数据库，名字你自己随便填，然后将mysql中的sql文件导入数据库，生成相对应的表结构，最后在./server/config/下新建数据库配置文件db.json，在该文件中配置mysql的数据库名称和用户名密码即可，内容示例如下：
```
{
    "mysql": {
        "host": "127.0.0.1",
        "port": 4578,
        "username": "root",
        "password": "123456",
        "dbName": "ermao"
    }
}
```
如果是自己的服务器ip的话，建议在gitignore文件中加入这个配置文件...要不是同事提醒我，差点就把密码泄露了呢，嘤嘤嘤

环境配置好之后，在根目录下执行
```
npm i
npm run dev
```
然后浏览器打开链接[http://localhost:3030](http://localhost:3030)，就可以看到页面啦~

也可以执行`npm run build`命令打包，然后浏览器打开[http://localhost:2333](http://localhost:2333),也是可以的~

默认webpack服务器端口号为3030，node服务器端的端口号为2333


<h2 align="center">框架搭建过程</h2>

技术栈：[react](https://reactjs.org/docs/getting-started.html)、[koa](https://chenshenhai.github.io/koa2-note/)、[webpack](https://webpack.docschina.org/concepts/)、[babel](https://www.babeljs.cn/docs/usage/babelrc/)

挑一两个相关涉及package：[superagent](https://cnodejs.org/topic/5378720ed6e2d16149fa16bd)、[sequelize](https://demopark.github.io/sequelize-docs-Zh-CN/)

开发还是区分的前后端，client里面是react、webpack，server里面是koa。目录结构如下：

<img src="./doc/tree.png">

### 关于webpack和babel

webpack和babel都是用的目前最新版，这个时候webpack版本是`4.16.4`......想要逼逼叨捋一下的欲望蠢蠢欲动，唔，那就简要逼逼叨一下webpack吧~

我觉得官网说的很棒（手动滑稽）
```
本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(static module bundler)。在 webpack 处理应用程序时，它会在内部创建一个依赖图(dependency graph)，用于映射到项目需要的每个模块，然后将所有这些依赖生成到一个或多个bundle。
```
我的理解就是按照依赖打包资源，完成资源的合并、删除、babel转换编译等等操作。

babel呢，是一个js编译器，提供一个es6+的环境，能够解析es6+，然后转换生成可以在浏览器中运行的代码。它的所有转译都是使用本地配置文件`.babelrc`或者`package.json`，具体配置可以参考[Options](https://www.babeljs.cn/docs/core-packages/#options)和[Plugins](https://www.babeljs.cn/docs/plugins/)

#### 配置webpack

会准备两份配置文件，一份是开发时用的，一份是打包的时候用的。区别就是开发时需要热替换，不用进行压缩资源，转发请求至node服务器，支持[source map](https://blog.fundebug.com/2017/03/13/sourcemap-tutorial/)等等，总之开发时需要的配置是方便开发调试。而打包部署时所需要的配置主要针对的是压缩打包资源的大小。

##### [入口（Input）](https://webpack.docschina.org/configuration/entry-context/)
##### [输出（output）](https://webpack.docschina.org/configuration/output/)
##### [loader](https://webpack.docschina.org/concepts/loaders/)
##### [plugins](https://webpack.docschina.org/concepts/plugins/)
##### [webpack-serve](https://webpack.docschina.org/configuration/dev-server/)
