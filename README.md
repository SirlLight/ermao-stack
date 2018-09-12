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


<h2 align="center">框架优势</h2>

* 路由同步(前后端共用一套路由)
* 模板同步(前后端共用一套模板)
* 数据同步(前后端公用一套数据状态机)

同构对比之前非同构加载对比, 可以明显看到白屏时间更少, 页面总计加载速度更快

非同构 VS 同构

<img width="390" src="doc/img/vs.png">

前端开发中也支持react,react-router,样式及Redux的动态更新

<img width="450" src="doc/img/preview.gif">

<h2 align="center">开发BUG日记</h2>
当开发中遇到的问题,我会列在下面,以方便自己查询和其他人进行相同问题的修改和修复

[问题列表](https://github.com/aemoe/fairy/issues)

<h2 align="center">如何搭建这样一个框架</h2>

[Link](https://aemoe.github.io/2017/05/18/How%20to%20build/)

<h2 align="center">协议</h2>
MIT
