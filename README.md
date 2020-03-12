## 介绍
用 node.js 写的注册/登录/查看用户/删除某一用户的简单接口练习
## 依赖
- express5 因为express4对于await的处理可能会有点问题，所以选择下载express5
- mongoose 操纵MongoDB
- bcriptjs 对明文密码加密
- jsonwebtoken 生成token
## 目录文件
- mymongodb.js  MongoDB部分
- myserver.js  处理请求部分
- mytest.http  vscode REST Client的http文件，可对服务器发起请求，不需要的话可忽略
## 完成功能
- [x] 注册
- [x] 登录
- [x] 查看总的用户
- [x] 查看单一用户的数据
- [x] 删除单一用户

