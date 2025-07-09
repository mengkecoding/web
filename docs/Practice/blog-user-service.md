# AI编程实战：Cursor避坑指南与高效提示词设计
## 1. 简介
 **在 AI 迅猛发展的时代，掌握利用 AI 工具提升工作效率，已成为一项必备技能。** 无论是借助 AICoding 辅助编程，还是使用 Coze 或 Dify 搭建专属知识库问答助手，AI 都能让我们事半功倍。当然，AI 生成内容有时会存在“幻觉”，**切勿完全轻信其输出，关键信息务必自行核查验证后再投入使用。**

 **本文将以我在使用 Cursor 进行开发时遇到的实际问题为例，分享相应的处理思路与解决方案，并同步提供开发用户模块所使用的详细提示词（prompt）及核心源码，供大家参考。**

 ## 2. 核心经验：高效使用 AI 编程工具的要点

 1.  **精准设计提示词（Prompt）：** 使用 AI 编程工具时，关键在于**设计简洁、目标明确的提示词**。务必**清晰阐述核心功能实现逻辑，并严格限定代码生成范围**。过于宽泛的提示词会导致 AI 自由发挥，**造成每次生成的接口在技术组件选择或核心逻辑实现上出现显著差异，严重破坏项目的一致性和可维护性。**
 2.  **模块化拆分与公共代码管理：** 当某个功能模块下包含多个接口时，**务必将其拆分开，分别进行提示和开发**。对于公共组件（如统一返回结果 `Result` 对象、常量定义等），应**提前规划并放置在项目的 `common` 目录下**，确保生成代码能正确引用这些公共部分，避免重复和冲突。
 3.  **模型选择与工具体验：** 根据我**深度体验多款主流 AI 编程工具**（包括 Trae、通义灵码、CodeBuddy、GitHub Copilot 和 Cursor）的经验，在代码生成的质量和响应速度方面，**Claude 系列模型表现尤为突出**。
     *   **国内工具局限：** 国内工具如 Trae 国内版、通义灵码、CodeBuddy 通常**仅支持 DeepSeek 或自家模型**。DeepSeek 最新的 0528 版本生成的代码质量确实不错，但存在明显缺点：**响应延迟显著（开发一个接口常需 10 分钟以上）**，且**当思维链过长时极易导致输出截断**。这迫使开发者必须**依赖已生成的文件上下文重新提示**，不仅效率低下，还**可能再次遭遇截断**。
     *   **Claude 模型的优势：** **Claude 模型（如 3.7 Sonnet）在代码生成速度和质量上达到了更好的平衡**。Tabnine 海外版和 Cursor **支持免费体验 Claude 3.7 Sonnet**。
         *   **Tabnine 海外版的限制：** 其**输入文本长度限制较严格（约 6000 tokens）**，如果给的提示词中含有代码很容易发生截断。
         *   **Cursor 的优势：** **Cursor 目前未遇到明显的提示长度限制问题**，使用体验更流畅，生成的代码**循环依赖问题也显著减少**（优于 Copilot 使用的 Claude 3.5 Sonnet）。
     *   **高阶模型建议：** **有条件的朋友，强烈建议尝试付费的 Claude 4.0 模型。理论上，更高阶的模型在代码生成的准确率、逻辑严谨性和复杂上下文处理能力上应有显著提升。**

## 3. 用户模块开发
用户模块核心接口：登录、注册、Token刷新、获取用户信息、更新用户信息、修改密码。
### 3.1 common模块设计
设计统一的返回结果类`Result`，用于封装接口的返回结果。
```Java
import lombok.Data;
import lombok.experimental.Accessors;
import java.time.Instant;
import java.util.UUID;

/**
 * 通用响应实体
 */
@Data
@Accessors(chain = true)
public class Result<T> {
    private Integer code;
    private String message;
    private T data;
    private String timestamp;
    private String traceId;

    public Result() {
        this.timestamp = Instant.now().toString();
        this.traceId = UUID.randomUUID().toString();
    }

    /**
     * 判断是否是成功的响应码
     *
     * @return true：成功响应码（200），false：失败响应码
     */
    public boolean isSuccess() {
        return this.code != null && this.code == ResultCode.SUCCESS.getCode();
    }


    public static <T> Result<T> success() {
        return success(null);
    }

    public static <T> Result<T> success(T data) {
        return new Result<T>()
                .setCode(ResultCode.SUCCESS.getCode())
                .setMessage(ResultCode.SUCCESS.getMessage())
                .setData(data);
    }

    public static <T> Result<T> error(ResultCode resultCode) {
        return new Result<T>()
                .setCode(resultCode.getCode())
                .setMessage(resultCode.getMessage());
    }

    public static <T> Result<T> error(ResultCode resultCode, String message) {
        Result<T> result = new Result<T>()
                .setCode(resultCode.getCode())
                .setMessage(message != null ? message : resultCode.getMessage());
        //System.out.println("创建错误响应: code=" + result.getCode() + ", message=" + result.getMessage()); // 添加调试日志
        return result;
    }
}
```
```Java
/**
 * 响应状态码枚举
 */
public enum ResultCode {
    SUCCESS(200, "成功"),
    BAD_REQUEST(400, "请求参数错误"),
    UNAUTHORIZED(401, "未认证或认证失败"),
    FORBIDDEN(403, "权限不足"),
    NOT_FOUND(404, "资源不存在"),
    TOO_MANY_REQUESTS(429, "请求过于频繁"),
    INTERNAL_SERVER_ERROR(500, "服务器内部错误");

    private final int code;
    private final String message;

    ResultCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
```
设计Redis常量类`RedisConstant`，用于定义Redis中的键名。
```Java
/**
 * Redis常量类
 */
public final class RedisConstants {
    
    // 邮箱验证码前缀
    public static final String EMAIL_CODE_KEY_PREFIX = "user:email:code:";
    
    // 邮箱可用性缓存前缀
    public static final String EMAIL_AVAILABLE_KEY_PREFIX = "user:email:available:";
    
    // 布隆过滤器名称
    public static final String EMAIL_BLOOM_FILTER_NAME = "emailFilter";
    
    // 分布式锁前缀
    public static final String REGISTER_LOCK_PREFIX = "user:register:lock:";
    
    // 验证码有效期（分钟）
    public static final long EMAIL_CODE_EXPIRE_MINUTES = 5;
    
    // 邮箱可用性缓存有效期（分钟）
    public static final long EMAIL_AVAILABLE_EXPIRE_MINUTES = 30;
    
    // 分布式锁过期时间（秒）
    public static final long REGISTER_LOCK_EXPIRE_SECONDS = 10;
    
    // 刷新令牌前缀
    public static final String REFRESH_TOKEN_KEY_PREFIX = "user:refresh_token:";
    
    // 刷新令牌有效期（天）
    public static final long REFRESH_TOKEN_EXPIRE_DAYS = 7;
    
    // Token黑名单前缀
    public static final String TOKEN_BLACKLIST_PREFIX = "user:token:blacklist:";
    
    // Token黑名单有效期（小时，应与token过期时间一致）
    public static final long TOKEN_BLACKLIST_EXPIRE_HOURS = 1;
} 
```
### 3.2 mybatisplus依赖
生成的mybatisplus依赖一般是和SpringBoot2兼容的，如果使用SpringBoot3需要更新mybatisplus依赖：
```Java
<dependencies>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
        </dependency>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-jsqlparser</artifactId>
    </dependency>
</dependencies>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-bom</artifactId>
            <version>3.5.12</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
### 3.3 接口提示词模板（以登录接口为例）
```Markdown
# 完成登录接口开发
## 1. 接口文档
POST /api/v1/users/login
请求参数：
{
  "email": "admin@qq.com",     //邮箱
  "password": "root123456",      // 密码
  "rememberMe": false        // 记住登录状态
}
响应数据：
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "jwt_token_string",
    "refreshToken": "refresh_token_string",
    "expiresIn": 3600,
    "user": {
      "userId": 123,
      "email": "user@example.com",
      "avatar": "https://cdn.example.com/avatar.jpg",
      "role": "USER"
    }
  }
}
## 2. 接口设计
### 2.1 组件
mybatisplus、mysql、BCrypt、JWT
### 2.2 总体设计
1. 统一使用 common 模块下的 Result 工具类处理所有接口响应结果；
2. 数据库中存储的用户密码需采用 BCrypt 算法加密；
3. 生成用户 token 时，需采用 JWT 加密方式，且 token 中必须包含用户 id、用户名、用户邮箱信息；
4. 用户登录成功后，需将 refreshtoken 存入 Redis。
## 3. 数据库表
-- 用户表 (user)
CREATE TABLE `user` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户唯一ID',
  `email` VARCHAR(255) UNIQUE NOT NULL COMMENT '邮箱地址',
  `password` VARCHAR(255) NOT NULL COMMENT '加密后的密码',
  `avatar` VARCHAR(255) COMMENT '头像URL地址',
  `nickname` VARCHAR(50) COMMENT '用户昵称',
  `bio` VARCHAR(255) COMMENT '个人简介',
  `website` VARCHAR(255) COMMENT '个人网站URL',
  `location` VARCHAR(100) COMMENT '所在地',
  `role` ENUM('USER', 'ADMIN') DEFAULT 'USER' COMMENT '用户角色',
  `status` ENUM('ACTIVE', 'BANNED') DEFAULT 'ACTIVE' COMMENT '用户状态',
  `email_verified` BOOLEAN DEFAULT FALSE COMMENT '邮箱是否已验证',
  `join_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '加入日期',
  `following_count` INT DEFAULT 0 COMMENT '关注人数',
  `followers_count` INT DEFAULT 0 COMMENT '粉丝人数',
  `articles_count` INT DEFAULT 0 COMMENT '文章数量',
  `likes_count` INT DEFAULT 0 COMMENT '获赞总数',
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户基本信息表';
-- 用户关系表 (user_relation)
CREATE TABLE `user_relation` (
  `follower_id` INT NOT NULL COMMENT '关注者ID',
  `followed_id` INT NOT NULL COMMENT '被关注者ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
  PRIMARY KEY (`follower_id`, `followed_id`),
  FOREIGN KEY (`follower_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`followed_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户关注关系表';
## 4. mysql
地址：localhost:3307,数据库名：blog,用户名：root,密码：123456
## 5. redis
地址：localhost:6379,密码：123456
```
### 3.4 接口完整提示词
#### 3.4.1 登录接口
```Markdown
# 完成登录接口开发
## 1. 接口文档
POST /api/v1/users/login
请求参数：
{
  "email": "admin@qq.com",     //邮箱
  "password": "root123456",      // 密码
  "rememberMe": false        // 记住登录状态
}
响应数据：
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "jwt_token_string",
    "refreshToken": "refresh_token_string",
    "expiresIn": 3600,
    "user": {
      "userId": 123,
      "email": "user@example.com",
      "avatar": "https://cdn.example.com/avatar.jpg",
      "role": "USER"
    }
  }
}
## 2. 接口设计
### 2.1 组件
mybatisplus、mysql、BCrypt、JWT
### 2.2 总体设计
1. 统一使用 common 模块下的 Result 工具类处理所有接口响应结果；
2. 数据库中存储的用户密码需采用 BCrypt 算法加密；
3. 生成用户 token 时，需采用 JWT 加密方式，且 token 中必须包含用户 id、用户名、用户邮箱信息；
4. 用户登录成功后，需将 refreshtoken 存入 Redis。
## 3. 数据库表
-- 用户表 (user)
CREATE TABLE `user` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户唯一ID',
  `email` VARCHAR(255) UNIQUE NOT NULL COMMENT '邮箱地址',
  `password` VARCHAR(255) NOT NULL COMMENT '加密后的密码',
  `avatar` VARCHAR(255) COMMENT '头像URL地址',
  `nickname` VARCHAR(50) COMMENT '用户昵称',
  `bio` VARCHAR(255) COMMENT '个人简介',
  `website` VARCHAR(255) COMMENT '个人网站URL',
  `location` VARCHAR(100) COMMENT '所在地',
  `role` ENUM('USER', 'ADMIN') DEFAULT 'USER' COMMENT '用户角色',
  `status` ENUM('ACTIVE', 'BANNED') DEFAULT 'ACTIVE' COMMENT '用户状态',
  `email_verified` BOOLEAN DEFAULT FALSE COMMENT '邮箱是否已验证',
  `join_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '加入日期',
  `following_count` INT DEFAULT 0 COMMENT '关注人数',
  `followers_count` INT DEFAULT 0 COMMENT '粉丝人数',
  `articles_count` INT DEFAULT 0 COMMENT '文章数量',
  `likes_count` INT DEFAULT 0 COMMENT '获赞总数',
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户基本信息表';
-- 用户关系表 (user_relation)
CREATE TABLE `user_relation` (
  `follower_id` INT NOT NULL COMMENT '关注者ID',
  `followed_id` INT NOT NULL COMMENT '被关注者ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
  PRIMARY KEY (`follower_id`, `followed_id`),
  FOREIGN KEY (`follower_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`followed_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户关注关系表';
## 4. mysql
地址：localhost:3307,数据库名：blog,用户名：root,密码：123456
## 5. redis
地址：localhost:6379,密码：123456
```
#### 3.4.2 注册接口
```Markdown
# 完成注册接口开发
## 1. 接口文档
POST /api/v1/users/register
请求参数：
{
  "email": "string",         // 邮箱地址
  "password": "string",      // 密码，6-20字符
  "emailKey": "string"     // 验证码key
}
响应数据：
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "userId": 123,
    "email": "user@example.com",
    "needEmailVerify": true
  }
}
## 2. 接口设计
### 2.1 组件
mybatisplus、mysql、RBloomFilter、Redis、BCrypt、JWT
### 2.2 总体设计
1. 统一使用 common 模块下的 Result 工具类处理所有接口响应结果；
2. 数据库中存储的用户密码需采用 BCrypt 算法加密；
3. 设计责任链校验邮箱是否可用。
4. 在校验通过后，在 Service 层进行注册，使用 Redis 分布式锁防止并发注册。
5. 初始时加载数据库中的所有邮箱到RBloomFilter。
### 2.3 责任链
第一层校验邮箱和密码格式，和验证码是否正确（验证码预设为666）。
第二层使用布隆过滤器判断数据库中是否存在该邮箱。如果布隆过滤器判断可能存在则去查询数据库，如果判断不存在则该邮箱可用。
## 3. 数据库表
-- 用户表 (user)
CREATE TABLE `user` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户唯一ID',
  `email` VARCHAR(255) UNIQUE NOT NULL COMMENT '邮箱地址',
  `password` VARCHAR(255) NOT NULL COMMENT '加密后的密码',
  `avatar` VARCHAR(255) COMMENT '头像URL地址',
  `nickname` VARCHAR(50) COMMENT '用户昵称',
  `bio` VARCHAR(255) COMMENT '个人简介',
  `website` VARCHAR(255) COMMENT '个人网站URL',
  `location` VARCHAR(100) COMMENT '所在地',
  `role` ENUM('USER', 'ADMIN') DEFAULT 'USER' COMMENT '用户角色',
  `status` ENUM('ACTIVE', 'BANNED') DEFAULT 'ACTIVE' COMMENT '用户状态',
  `email_verified` BOOLEAN DEFAULT FALSE COMMENT '邮箱是否已验证',
  `join_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '加入日期',
  `following_count` INT DEFAULT 0 COMMENT '关注人数',
  `followers_count` INT DEFAULT 0 COMMENT '粉丝人数',
  `articles_count` INT DEFAULT 0 COMMENT '文章数量',
  `likes_count` INT DEFAULT 0 COMMENT '获赞总数',
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户基本信息表';
-- 用户关系表 (user_relation)
CREATE TABLE `user_relation` (
  `follower_id` INT NOT NULL COMMENT '关注者ID',
  `followed_id` INT NOT NULL COMMENT '被关注者ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
  PRIMARY KEY (`follower_id`, `followed_id`),
  FOREIGN KEY (`follower_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`followed_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户关注关系表';
## 4. mysql
地址：localhost:3307,数据库名：blog,用户名：root,密码：123456
## 5. redis
地址：localhost:6379,密码：123456
```
#### 3.4.3 token刷新接口
```Markdown
# 完成token刷新接口开发
## 1. 接口文档
POST /api/v1/users/refresh-token
请求参数：
{
  "refreshToken": "string" // 刷新令牌
}
响应数据：
{
  "code": 200,
  "message": "刷新成功",
  "data": {
    "accessToken": "string", // 新的访问令牌
    "refreshToken": "string" // 新的刷新令牌
  }
}
## 2. 接口设计
### 2.1 组件
mybatisplus、mysql、Redis、JWT
### 2.2 总体设计
先判断refreshToken是否有效，如果有效判断redis中是否存在key，如果存在则执行刷新token，否则返回refreshToken无效。接口实现功能：使原来的refreshToken失效生成新的refreshToken和token。
## 3. 数据库表
-- 用户表 (user)
CREATE TABLE `user` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户唯一ID',
  `email` VARCHAR(255) UNIQUE NOT NULL COMMENT '邮箱地址',
  `password` VARCHAR(255) NOT NULL COMMENT '加密后的密码',
  `avatar` VARCHAR(255) COMMENT '头像URL地址',
  `nickname` VARCHAR(50) COMMENT '用户昵称',
  `bio` VARCHAR(255) COMMENT '个人简介',
  `website` VARCHAR(255) COMMENT '个人网站URL',
  `location` VARCHAR(100) COMMENT '所在地',
  `role` ENUM('USER', 'ADMIN') DEFAULT 'USER' COMMENT '用户角色',
  `status` ENUM('ACTIVE', 'BANNED') DEFAULT 'ACTIVE' COMMENT '用户状态',
  `email_verified` BOOLEAN DEFAULT FALSE COMMENT '邮箱是否已验证',
  `join_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '加入日期',
  `following_count` INT DEFAULT 0 COMMENT '关注人数',
  `followers_count` INT DEFAULT 0 COMMENT '粉丝人数',
  `articles_count` INT DEFAULT 0 COMMENT '文章数量',
  `likes_count` INT DEFAULT 0 COMMENT '获赞总数',
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户基本信息表';
-- 用户关系表 (user_relation)
CREATE TABLE `user_relation` (
  `follower_id` INT NOT NULL COMMENT '关注者ID',
  `followed_id` INT NOT NULL COMMENT '被关注者ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
  PRIMARY KEY (`follower_id`, `followed_id`),
  FOREIGN KEY (`follower_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`followed_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户关注关系表';
## 4. mysql
地址：localhost:3307,数据库名：blog,用户名：root,密码：123456
## 5. redis
地址：localhost:6379,密码：123456
```
#### 3.4.4 获取用户信息接口
```Markdown
# 完成获取用户信息接口开发
## 1. 接口文档
GET /api/v1/users/profile
请求头：
Authorization: Bearer <jwt_token>
响应数据：
{
  "code": 200,
  "message": "success",
  "data": {
    "userId": 123,
    "email": "user@example.com",
    "avatar": "https://cdn.example.com/avatar.jpg",
    "nickname": "昵称",
    "bio": "个人简介",
    "website": "https://example.com",
    "location": "城市",
    "joinDate": "2025-01-01T00:00:00Z",
    "followingCount": 10,
    "followersCount": 20,
    "articlesCount": 5,
    "likesCount": 100
  }
}
## 2. 接口设计
### 2.1 组件
mybatisplus、mysql、JWT
### 2.2 总体设计
1. 在安全上下文中获取用户id；
2. 统一使用 common 模块下的 Result 工具类处理所有接口响应结果；
## 3. 数据库表
-- 用户表 (user)
CREATE TABLE `user` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户唯一ID',
  `email` VARCHAR(255) UNIQUE NOT NULL COMMENT '邮箱地址',
  `password` VARCHAR(255) NOT NULL COMMENT '加密后的密码',
  `avatar` VARCHAR(255) COMMENT '头像URL地址',
  `nickname` VARCHAR(50) COMMENT '用户昵称',
  `bio` VARCHAR(255) COMMENT '个人简介',
  `website` VARCHAR(255) COMMENT '个人网站URL',
  `location` VARCHAR(100) COMMENT '所在地',
  `role` ENUM('USER', 'ADMIN') DEFAULT 'USER' COMMENT '用户角色',
  `status` ENUM('ACTIVE', 'BANNED') DEFAULT 'ACTIVE' COMMENT '用户状态',
  `email_verified` BOOLEAN DEFAULT FALSE COMMENT '邮箱是否已验证',
  `join_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '加入日期',
  `following_count` INT DEFAULT 0 COMMENT '关注人数',
  `followers_count` INT DEFAULT 0 COMMENT '粉丝人数',
  `articles_count` INT DEFAULT 0 COMMENT '文章数量',
  `likes_count` INT DEFAULT 0 COMMENT '获赞总数',
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户基本信息表';
-- 用户关系表 (user_relation)
CREATE TABLE `user_relation` (
  `follower_id` INT NOT NULL COMMENT '关注者ID',
  `followed_id` INT NOT NULL COMMENT '被关注者ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
  PRIMARY KEY (`follower_id`, `followed_id`),
  FOREIGN KEY (`follower_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`followed_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户关注关系表';
## 4. mysql
地址：localhost:3307,数据库名：blog,用户名：root,密码：123456
## 5. redis
地址：localhost:6379,密码：123456
```
#### 3.4.5 更新用户信息接口
```Markdown
# 完成更新用户信息接口开发
## 1. 接口文档
PUT /api/v1/users/profile
请求头：
Authorization: Bearer <jwt_token>
请求体：
{
  "nickname": "string",      // 昵称
  "bio": "string",           // 个人简介
  "website": "string",       // 个人网站
  "location": "string",      // 所在地
  "avatar": "string"         // 头像URL
}
## 2. 接口设计
### 2.1 组件
mybatisplus、mysql、JWT
### 2.2 总体设计
1. 在安全上下文中获取用户id；
2. 统一使用 common 模块下的 Result 工具类处理所有接口响应结果；
## 3. 数据库表
-- 用户表 (user)
CREATE TABLE `user` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户唯一ID',
  `email` VARCHAR(255) UNIQUE NOT NULL COMMENT '邮箱地址',
  `password` VARCHAR(255) NOT NULL COMMENT '加密后的密码',
  `avatar` VARCHAR(255) COMMENT '头像URL地址',
  `nickname` VARCHAR(50) COMMENT '用户昵称',
  `bio` VARCHAR(255) COMMENT '个人简介',
  `website` VARCHAR(255) COMMENT '个人网站URL',
  `location` VARCHAR(100) COMMENT '所在地',
  `role` ENUM('USER', 'ADMIN') DEFAULT 'USER' COMMENT '用户角色',
  `status` ENUM('ACTIVE', 'BANNED') DEFAULT 'ACTIVE' COMMENT '用户状态',
  `email_verified` BOOLEAN DEFAULT FALSE COMMENT '邮箱是否已验证',
  `join_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '加入日期',
  `following_count` INT DEFAULT 0 COMMENT '关注人数',
  `followers_count` INT DEFAULT 0 COMMENT '粉丝人数',
  `articles_count` INT DEFAULT 0 COMMENT '文章数量',
  `likes_count` INT DEFAULT 0 COMMENT '获赞总数',
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户基本信息表';
-- 用户关系表 (user_relation)
CREATE TABLE `user_relation` (
  `follower_id` INT NOT NULL COMMENT '关注者ID',
  `followed_id` INT NOT NULL COMMENT '被关注者ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
  PRIMARY KEY (`follower_id`, `followed_id`),
  FOREIGN KEY (`follower_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`followed_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户关注关系表';
## 4. mysql
地址：localhost:3307,数据库名：blog,用户名：root,密码：123456
## 5. redis
地址：localhost:6379,密码：123456
```
#### 3.4.6 修改密码接口
```Markdown
# 完成修改密码接口开发
## 1. 接口文档
PUT /api/v1/users/password
请求头：
Authorization: Bearer <jwt_token>
请求体：
{
  "oldPassword": "string",    // 旧密码
  "newPassword": "string"     // 新密码
}
## 2. 接口设计
### 2.1 组件
mybatisplus、mysql、JWT
### 2.2 总体设计
1. 在安全上下文中获取用户id；
2. 统一使用 common 模块下的 Result 工具类处理所有接口响应结果；
3. 密码修改后，删除redis中refreshtoken字段，并且将当前token加入redis黑名单。
## 3. 数据库表
-- 用户表 (user)
CREATE TABLE `user` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户唯一ID',
  `email` VARCHAR(255) UNIQUE NOT NULL COMMENT '邮箱地址',
  `password` VARCHAR(255) NOT NULL COMMENT '加密后的密码',
  `avatar` VARCHAR(255) COMMENT '头像URL地址',
  `nickname` VARCHAR(50) COMMENT '用户昵称',
  `bio` VARCHAR(255) COMMENT '个人简介',
  `website` VARCHAR(255) COMMENT '个人网站URL',
  `location` VARCHAR(100) COMMENT '所在地',
  `role` ENUM('USER', 'ADMIN') DEFAULT 'USER' COMMENT '用户角色',
  `status` ENUM('ACTIVE', 'BANNED') DEFAULT 'ACTIVE' COMMENT '用户状态',
  `email_verified` BOOLEAN DEFAULT FALSE COMMENT '邮箱是否已验证',
  `join_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '加入日期',
  `following_count` INT DEFAULT 0 COMMENT '关注人数',
  `followers_count` INT DEFAULT 0 COMMENT '粉丝人数',
  `articles_count` INT DEFAULT 0 COMMENT '文章数量',
  `likes_count` INT DEFAULT 0 COMMENT '获赞总数',
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户基本信息表';
-- 用户关系表 (user_relation)
CREATE TABLE `user_relation` (
  `follower_id` INT NOT NULL COMMENT '关注者ID',
  `followed_id` INT NOT NULL COMMENT '被关注者ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
  PRIMARY KEY (`follower_id`, `followed_id`),
  FOREIGN KEY (`follower_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`followed_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户关注关系表';
## 4. mysql
地址：localhost:3307,数据库名：blog,用户名：root,密码：123456
## 5. redis
地址：localhost:6379,密码：123456
```
## 如需用户模块源码，请访问<https://github.com/mengkecoding/userService>。
