# 手把手教你部署 Dify 到本地环境(Windows系统)
## 1. 为什么选择docker部署
### 1.1 一键部署，彻底避免环境问题
Docker 镜像 已包含 Dify 所需的所有依赖（操作系统、Python 环境、库文件），无需手动安装 Python、Node.js、PostgreSQL 等组件，杜绝版本冲突。
### 1.2 快速搭建完整服务栈
Dify 官方提供 docker-compose.yml 文件，通过容器编排：
* 自动创建网络，连接多个容器（Web 服务 + DB + Redis + 后台任务）。
* 无需分别配置各组件间的通信（如 PostgreSQL 连接地址、Redis 端口）。

传统部署需手动安装并配置 4-5 个服务，Docker 只需 1 条命令。
### 1.3 资源隔离与安全性
Dify 的 PostgreSQL、Redis 等服务运行在独立容器中，与宿主机隔离。即使 Dify 被攻击，数据库不会直接暴露在公网（通过 Docker 网络内部通信）。
## 2. 环境准备
### 2.1 启用WSL所需Windows功能

勾选**Windows虚拟机监控程序平台**和**适用于Linux的Windows子系统**

![](/Practice/dify-local-deployment-guide/2.1.png)
### 2.2 安装Docker Desktop

下载地址：<https://www.docker.com/products/docker-desktop/>

![](/Practice/dify-local-deployment-guide/2.2.png)
### 2.3 安装WSL

在管理员模式下打开Windows命令提示符，输入`wsl --install`。
官方文档地址：<https://learn.microsoft.com/zh-cn/windows/wsl/install>

![](/Practice/dify-local-deployment-guide/2.3.png)
### 2.4 配置镜像加速

进入华为[容器镜像服务控制台](<https://console.huaweicloud.com/swr/>),点击镜像中心->镜像加速器

![](/Practice/dify-local-deployment-guide/2.4.png)

复制下图红框内的内容

![](/Practice/dify-local-deployment-guide/2.5.png)

打开docker Desktop，点击设置->Docker Engine，将复制的内容粘贴到下图的红框中，点击Apply & restart。

![](/Practice/dify-local-deployment-guide/2.6.png)
### 2.4 结合WSL与Docker Desktop

进入设置->Resources->WSL integration,勾选Ubuntu，点击Apply & restart。

![](/Practice/dify-local-deployment-guide/2.7.png)

运行Ubuntu子系统

![](/Practice/dify-local-deployment-guide/2.8.png)

验证docker是否工作正常，输入`docker --version`。

![](/Practice/dify-local-deployment-guide/2.9.png)
## 3. 本地化部署Dify
### 3.1 安装dify
```Shell
git clone https://github.com/langgenius/dify.git --branch 1.4.2
```
**（由于github的国内访问不稳定，可能会出现镜像拉取失败的问题，建议使用加速器加速一下。steam++加速器：<https://steampp.net/>）**
![](/Practice/dify-local-deployment-guide/3.1.png)
### 3.2 启动Dify
#### 3.2.1 打开Dify源码的Docker目录
```Shell
cd dify/docker
```
#### 3.2.2 复制环境配置文件
```Shell
cp .env.example .env
```
#### 3.2.3 启动Docker容器(目前的版本都是Docker Compose V2，如果是旧版本请参考官方文档)
```Shell
docker compose up -d
```
![](/Practice/dify-local-deployment-guide/3.2.png)
#### 3.2.4 检查所有容器是否正常运行
```Shell
docker compose ps
```
![](/Practice/dify-local-deployment-guide/3.3.png)
### 3.3 访问Dify
#### 3.3.1 在浏览器中输入`localhost`，进入管理员账户设置页面
![](/Practice/dify-local-deployment-guide/3.4.png)
#### 3.3.2 设置成功后进行登录，进入到Dify页面，本地化部署Dify完成。
![](/Practice/dify-local-deployment-guide/3.5.png)


