跨域解决方案:
1. 后端接口打包到本地运行（缺点：每次后端更新都要去测试服下一个更新包，还要在本地搭建运行环境）

2. CORS跨域：后端接口在返回的时候，在header中加入'Access-Control-Allow-origin':* 之类的（有的时候后端不方便这样处理, 或因为安全问题不能开启）

3. webpack-dev-server配置跨域方案, 在用webpack作为前端自动化构建工具的话, 里面有个proxy, 专门用于配置代理请求接口的, 这种方案最方便.

4. 用nodejs搭建本地http服务器，并且判断访问接口URL时进行转发，完美解决本地开发时候的跨域问题。

5. 使用谷歌的插件解决:https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi

6. 或者谷歌开启允许跨域,参考 http://camnpr.com/archives/chrome-args-disable-web-security.html

本文适用于情况4
# 本文用到的技术
1. nodejs搭建本地http服务器
2. 应用[node-http-proxy](https://github.com/http-party/node-http-proxy) 做接口url转发

- proxy.js 文件为简单的url api转发调用, 对于一般的本地开发调试基本够用了

- proxy_all.js 可以转发接口以及文件

# 项目准备
1. npm初始化
```
npm init
```

2. 安装node-http-proxy模块
```
npm install http-proxy --save-dev
```

3. 项目结构
```
D:.
│  index.html
│  package-lock.json
│  package.json
│  proxy.js
│  proxy_all.js
│  README.md
│  service.js
│
└─node_modules
```

4. 启动nodejs服务, 测试转发api
启动cmd, 定位到项目目录
```
node proxy.js
```

运行service.js 测试接口
```
node service.js
```
测试请求接口
在浏览器中请求`http://localhost:8080/` 返回`I'm service A`则表示请求成功了.

5. 启动nodejs服务, 测试转发html
```
node proxy_all.js
```
使用vscode并开启`Live Server`插件, 在vscode中打开index.html页面, 点击右下角Live Server图标即可在默认端口启动`http://localhost:5500`, 此处也是为了默认远程请求页面, 注意如果使用其他代理地址, 请修改下面的位置
```
var proxy = httpProxy.createProxyServer({
    target: 'http://localhost:5500/',   //接口地址, 根据自己的地址修改此处
    // 下面的设置用于https
    // ssl: {
    //     key: fs.readFileSync('server_decrypt.key', 'utf8'),
    //     cert: fs.readFileSync('server.crt', 'utf8')
    // },
    // secure: false
});

```

打开网页`http://127.0.0.1:5500/index.html`

打开网页`http://localhost:3000/index.html`

如果`3000/index.html`也能请求则说明该方法成功了.

本文github地址:https://github.com/wwmin/http_proxy_node