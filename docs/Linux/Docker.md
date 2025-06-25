# Docker常用命令
## 1. Docker安装与卸载
### 1.1 安装docker
引用文章：[Ubuntu 22.04下Docker安装](https://blog.csdn.net/u011278722/article/details/137673353)
```Shell
#安装前先卸载操作系统默认安装的docker，
sudo apt-get remove docker docker-engine docker.io containerd runc
```
```Shell
#安装必要支持
sudo apt install apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release
```
```Shell
# 阿里源（推荐使用阿里的gpg KEY）
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
```Shell
#阿里apt源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
```Shell
#更新源
sudo apt update
sudo apt-get update
```
```Shell
#安装最新版本的Docker
sudo apt install docker-ce docker-ce-cli containerd.io
#等待安装完成

#查看Docker版本
sudo docker version

#查看Docker运行状态
sudo systemctl status docker
```
### 1.2 卸载docker
```Shell
# 查看正在运行的容器
docker ps
# 停止所有运行中的容器
docker stop $(docker ps -q)
# 删除所有容器
docker rm $(docker ps -aq)
# 删除所有镜像
docker rmi $(docker images -q)
sudo systemctl stop docker
sudo yum remove docker-ce docker-ce-cli containerd.io
sudo rm -rf /var/lib/docker
sudo yum autoremove
```
### 1.3 Docker镜像加速
```Shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [ "yuormirror" ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
### 1.4 Github加速
```Shell
sudo nano /etc/hosts
```
```Shell
140.82.112.3  github.com #hosts文件中添加内容
```
```Shell
sudo systemctl restart systemd-resolved
```

## 2. 镜像管理
### 2.1 列出所有镜像
```Shell
docker images
```
### 2.2 拉取镜像
```Shell
docker pull 镜像名
```
### 2.3 删除镜像
```Shell
docker rmi 镜像ID
```
```Shell
docker rmi -f $(docker images -q)
```
## 3. 容器管理
### 3.1 启动新容器
```Shell
docker run [选项] [镜像名] [命令]：创建并启动容器
常用选项：-d（后台运行）、-p [主机端口]:[容器端口]（端口映射）、-v [主机路径]:[容器路径]（挂载卷）、--name [容器名]（指定容器名称）
```
### 3.2 列出所有容器
```Shell
docker ps -a
```
### 3.3 启动已停止的容器
```Shell
docker start 容器名
```
### 3.4 停止运行中的容器
```Shell
docker stop 容器名
```
```Shell
docker stop $(docker ps -q) # 停止所有容器
```
### 3.5 重新启动容器
```Shell
docker restart 容器名
```
### 3.6 删除容器
```Shell
docker rm 容器名
```
```Shell
docker rm -f $(docker ps -aq)
```
### 3.7 常用组件启动命令
#### 3.7.1 mysql
```Shell
docker run -d \
  --name mysql-server \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  -p 3306:3306 \
  --restart unless-stopped \
  mysql:8.0                  
```
#### 3.7.2 redis
```Shell
docker run -d \
  --name redis-server \
  -p 6379:6379 \
  -v redis-data:/data \
  --restart unless-stopped \
  redis:latest \
  redis-server --appendonly yes --requirepass "your-strong-password"
```
#### 3.7.3 mongoDB
```Shell
docker run -d \
  --name mongo-server \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=strong-password \
  --restart unless-stopped \
  mongo:latest
```
#### 3.7.4 Dify
```Shell
git clone https://github.com/langgenius/dify.git --branch 1.4.2
```
```Shell
cd dify/docker
```
```Shell
cp .env.example .env
```
```Shell
docker compose up -d
```

#### 3.7.5 LangBot
```Shell
git clone https://github.com/RockChinQ/LangBot
```
```Shell
cd LangBot
```
```Shell
docker compose up
```

# 未完待续~