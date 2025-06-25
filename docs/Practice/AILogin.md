# 手把手教你使用trae（海外版）开发登录接口
## 1. 环境准备
### 1.1 在Microsoft edge浏览器中安装ilink插件
**点击获取扩展**

![](/Practice/AILogin/1.1.png)

**搜索ilink**

![](/Practice/AILogin/1.2.png)

**安装后，点击connect，为后续登录做准备。**

![](/Practice/AILogin/1.3.png)
### 1.2 安装trae
trae官网下载安装包，并按照默认路径安装即可。trae官网：<https://www.trae.ai/>
在开启ilink插件加速后，打开trae并登录。
### 1.3 安装trae插件
**点击插件市场**

![](/Practice/AILogin/1.4.png)

**搜索下列插件并安装**

![](/Practice/AILogin/1.5.png)
### 1.4 安装apifox
在本教程中，apifox主要用于接口的测试，apifox官网：<https://apifox.com/>

## 2. 开发登录接口
### 2.1 新建项目
使用springboot创建一个新的项目，项目名称为：mylogin
![](/Practice/AILogin/2.1.png)
### 2.2 创建数据库表
在你的mysql数据库中创建一个名为user的表，表结构如下：
```sql
CREATE TABLE `user` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT COMMENT '用户ID',
  `train_account` VARCHAR(100) NOT NULL UNIQUE COMMENT '12306用户名（密文）',
  `train_password` VARCHAR(100) NOT NULL COMMENT '登录密码（密文）',
  `name` VARCHAR(50) NOT NULL COMMENT '姓名',
  `mobile` VARCHAR(20) NOT NULL UNIQUE COMMENT '手机号',
  `email` VARCHAR(100) COMMENT '邮箱（港澳/台湾通行证用户必填）',
  `sex` TINYINT UNSIGNED DEFAULT 0 COMMENT '性别（0=未知，1=男，2=女）',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `status` TINYINT UNSIGNED DEFAULT 1 COMMENT '用户状态（0=禁用，1=正常，2=待验证）',
  PRIMARY KEY (`id`),
  KEY `idx_mobile` (`mobile`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户账号信息表';    
```
### 2.3 使用trae进行登录接口开发
#### 2.3.1 使用trae打开项目所在目录
![](/Practice/AILogin/2.2.png)
#### 2.3.2 选择内置智能体
![](/Practice/AILogin/2.3.png)
#### 2.3.3 生成登录接口代码
**将下面这段话发送给智能体（记得修改数据库的ip地址、端口号、数据库名、用户名、密码）。**
```
请帮我完成下述接口的开发。

下面是购票系统用户登录功能接口开发的一些资料：
用户登录要操作的表结构为user ，用到组件lombok、mybatisplus，如果可以用到其他组件优化代码结构，可以自行选择。

1.user建表语句如下
CREATE TABLE `user` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT COMMENT '用户ID',
  `train_account` VARCHAR(100) NOT NULL UNIQUE COMMENT '12306用户名（密文）',
  `train_password` VARCHAR(100) NOT NULL COMMENT '登录密码（密文）',
  `name` VARCHAR(50) NOT NULL COMMENT '姓名',
  `mobile` VARCHAR(20) NOT NULL UNIQUE COMMENT '手机号',
  `email` VARCHAR(100) COMMENT '邮箱（港澳/台湾通行证用户必填）',
  `sex` TINYINT UNSIGNED DEFAULT 0 COMMENT '性别（0=未知，1=男，2=女）',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `status` TINYINT UNSIGNED DEFAULT 1 COMMENT '用户状态（0=禁用，1=正常，2=待验证）',
  PRIMARY KEY (`id`),
  KEY `idx_mobile` (`mobile`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户账号信息表';

2.mysql数据库的ip地址为83.72.15.69，端口号为3306，数据库名：test，用户名：root，密码：root

3. 登录接口的基本信息如下：
3.1 请求路径: /login
3.2 请求方式: POST
3.3 接口描述: 该接口用于用户登录12306铁路购票系统，登录成功下发JWT令牌
3.4 请求参数样例:
{
"trainAccount": "user",
"trainPassword": "123456"
}
3.5 响应数据样例:
3.5.1 登录成功
{
"code": 1,
"msg": "success",
"data": {
"trainAccount": "songjiang",
"name": "宋江"，
"token": "wduwhaduhwaduhauwhduhawudhaudhuawhduwahdua"
}
}
3.5.2 登录失败
{
"code": 0,
"msg": "用户名或密码错误",
"data": null
}
3.6 备注说明: 用户登录成功后，系统会自动下发JWT令牌，然后在后续的每次请求中，都需要在请求头header中携带到服务端，请求头的名称为 token ，值为 登录时下发的JWT令牌。 如果检测到用户未登录，则直接响应 401 状态码 。
```
### 2.3.4 修改生成的mybatisplus的依赖配置
**一般生成的代码只有这个依赖会出问题，如果有其他问题直接发给智能体即可。**
```java
 <!-- MyBatis-Plus -->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
        <version>3.5.12</version>
    </dependency>
```
## 3. 测试登录接口
### 3.1 新建项目
打开apifox，新建项目，项目名称为：mytest
![](/Practice/AILogin/3.1.png)
### 3.2 选择新建接口
按照下图进行配置：
![](/Practice/AILogin/3.2.png)
### 3.3 配置前置url
配置测试环境的前置url如下：
![](/Practice/AILogin/3.3.png)
### 3.4 运行接口
点击自动生成，生成一个测试示例，点击发送，查看接口的响应结果。如果可以返回以下结果，则说明接口开发成功。
![](/Practice/AILogin/3.4.png)
## 4. 示例视频
@[bilibili](BV1xUMWzjE3H)



