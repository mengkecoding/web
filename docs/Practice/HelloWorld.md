# 手把手教你部署HelloWorld到云服务器
## 1. 购买一台云服务器
![Image](/Practice/HelloWorld/1.1.png)
首先需要购买一台装有linux系统的云服务器，阿里云、火山引擎、腾讯云、华为云、京东云首次购买轻量的云服务都在40-60元/年（2核2G），我购买的是华为的云服务器，需要设置服务器的账号密码，安装系统镜像大概需要2-5分钟的时间，记住自己的公网ip地址。
## 2. 应用上传服务器前的准备
### 2.1 更新软件包列表信息
在终端输入指令：`sudo apt update`

![Image](/Practice/HelloWorld/2.1.png)
### 2.2 安装JDK17
在终端输入指令：`sudo apt install openjdk-17-jdk`

![Image](/Practice/HelloWorld/2.2.png)
### 2.3 创建部署目录
在终端输入指令：`mkdir ~/spring-apps`

![Image](/Practice/HelloWorld/2.3.png)
## 3.创建一个HelloWorld项目
### 3.1 点击New Project
![Image](/Practice/HelloWorld/3.1.png)
### 3.2 点击Spring Boot，按图示进行配置
![Image](/Practice/HelloWorld/3.2.png)
### 3.3 勾选Spring Web，创建项目
![Image](/Practice/HelloWorld/3.3.png)
### 3.4 创建HelloController类
![Image](/Practice/HelloWorld/3.4.png)
### 3.5 运行项目
在本地浏览器中输入：`localhost:8080`，测试效果
## 4.上传应用到服务器
### 4.1 打包应用
打开Spring终端输入指令：`mvn clean package`

![Image](/Practice/HelloWorld/4.1.png)
### 4.2 使用scp命令将JAR文件上传到服务器
在Spring终端中输入指令：`scp target/hello-spring-0.0.1-SNAPSHOT.jar username@your-server-ip:~/spring-apps/` （按照下图修改指令）

![Image](/Practice/HelloWorld/4.2.png)
## 5. 运行HelloWorld应用
打开项目文件目录：`cd ~/spring-apps`,运行项目：`java -jar hello-0.0.1-SNAPSHOT.jar`

![Image](/Practice/HelloWorld/5.1.png)
访问应用，在浏览器中输入：`your-ip:8080`（如：1.95.211.85：8080）

![Image](/Practice/HelloWorld/5.2.png)
## 6. 通过域名访问HelloWorld应用
在云服务商购买域名，在本文中使用的域名是在火山引擎中购买的。（注：购买域名后，使用域名需要进行备案）

### 6.1 购买域名后，点击控制台搜索域名服务。
![Image](/Practice/HelloWorld/6.1.png)
### 6.2 选择解析域名
![Image](/Practice/HelloWorld/6.2.png)
### 6.3 点击添加记录
![Image](/Practice/HelloWorld/6.3.png)
### 6.4 按照下图进行配置，完成后点击提交
![Image](/Practice/HelloWorld/6.4.png)
### 6.5 勾选记录，点击启用
![Image](/Practice/HelloWorld/6.5.png)

等待五分钟后，可以通过域名+端口号的方式访问应用。（如：www.mengkecoding.cn:8080）
为了将域名绑定到云服务器的ip和端口号，需要在服务端进一步配置，使用Nginx反向代理服务器将80端口的请求转发到8080端口。
### 6.6 安装Nginx
在服务器终端输入命令：sudo apt install nginx

![Image](/Practice/HelloWorld/6.6.png)
### 6.7 配置Nginx反向代理
#### 6.7.1 在终端输入命令
```Shell
sudo nano /etc/nginx/sites-available/yourdomain.conf
```
![Image](/Practice/HelloWorld/6.7.1.png)
#### 6.7.2 添加以下内容（根据图片进行修改）
```Shell
server {
    listen 80;
    server_name mengkecoding.cn www.mengkecoding.cn;

    location / {
        proxy_pass http://1.92.211.80:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
![Image](/Practice/HelloWorld/6.7.2.png)
#### 6.7.3 启用配置：
```
sudo ln -s /etc/nginx/sites-available/yourdomain.conf /etc/nginx/sites-enabled/ 
sudo nginx -t # 检查配置语法 
sudo systemctl restart nginx
```
![Image](/Practice/HelloWorld/6.7.3.png)
### 6.8 测试效果
打开项目文件目录：`cd ~/spring-apps`,运行项目：`java -jar hello-0.0.1-SNAPSHOT.jar`,在浏览器中输入域名返回helloworld。

![Image](/Practice/HelloWorld/6.8.png)

