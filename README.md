### 项目部署步骤

#### Step 1 ———— 获取仓库代码

在`/opt/repos/(部署环境)`拉取项目代码

#### Step 2 ———— 写部署脚本

1. 在`/opt/app/deployment/configs/project/(部署环境)/(项目分类)`下创建部署脚本文件`(项目名称).yaml`
2. 编辑脚本

```
---
domain: "http://fe.workorder.qa1.tff.com"
name: "workorder-fe"
servers:
    -
        host: "localhost"
        is_local: true
        owner: "apache:apache"
        command: ""
repositories:
    workorder-fe:
        path: "/opt/repos/qa/workorder-fe"
        deploy_path: "/opt/app/nginx/html/qa1/workorder-fe"
        command: "source /etc/profile.d/nvm.sh && sh /opt/app/fe-modules/npm-deploy.sh workorder-fe 1 && goconfenv-manager -e qa1 -c cem.conf -p workorder-fe -h cem.services.qa1.tff.com && npm run build"
```

##### 如果是初次部署，servers中的command命令为空，命令如上所示；

##### 初次部署完成之后

root权限下在deploy_path对应的项目启动pm2进程
```
    pm2 start index.js --name workorder-fe
```

将servers中的command命令修改成：
```
    command: "source /etc/profile.d/nvm.sh && pm2 reload workorder-fe"
```

#### Step 3 ———— deploy页面添加项目

在`/opt/app/deployment/configs/main-(部署环境).yaml`中添加项目名称
```
projects:
    qa1:
        order:
            - "ordersvcs"
            - "workorder"
            - "workorder-fe"
```

#### Step4 ———— 添加Nginx配置信息

在`/opt/app/nginx/conf/(部署环境).d`添加nginx配置
```
upstream workorder_fe {
    server 127.0.0.1:5050;
}
server {
    server_name fe.workorder.qa1.tff.com;
    listen 80;
    listen 443 ssl;
    include ssl.inc;
    root /opt/app/nginx/html/qa1/workorder-fe;
    error_log logs/fe.workorder.qa1.tff.com.error.log;
    index index.html;

    location / {
        proxy_pass http://workorder_fe;
    }
}
```

#### Step 5

1. 重启supervisor，先`supervisor status`查看deployment的进程名称，然后执行`supervisor restart (deployment进程名称)`
2. deployment部署项目



