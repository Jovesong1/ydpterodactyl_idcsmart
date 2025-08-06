# Token配置指南

本页面详细说明如何配置和管理翼龙面板与魔方财务系统集成所需的Token。

## Token概述

在翼龙面板与魔方财务的集成中，有两个关键的Token需要配置：

1. **PTERODACTYL_TOKEN**
2. **PTERODACTYL_TOKEN_EN**

这两个Token用于处理用户在魔方财务中与翼龙面板的集成认证，对于模块的正常运行至关重要。

## Token配置位置

Token配置位于模块根目录下的`env.php`文件中：

```php
<?php
// 定义全局日志级别
define('LOG_LEVEL', 1);

// 使用常量定义，更可靠
define('PTERODACTYL_TOKEN', "数据库中的TOKEN");
define('PTERODACTYL_TOKEN_EN', "密钥从第 12 位开始往后的密钥");

// 保留全局变量作为备用
$token = PTERODACTYL_TOKEN;
$token_en = PTERODACTYL_TOKEN_EN;
```

## Token获取流程

请按照以下步骤获取所需的Token：

### 1. 获取PTERODACTYL_TOKEN_EN

1. 在翼龙面板中创建一个账户
2. 使用该账户登录翼龙面板
3. 点击**账号设置** > **API 凭证** > **创建一个 API 凭证**
4. 获取生成的API凭证，例如：`ptlc_gJVDG9KgAE8R53qGvW5NC0PzVyeHksGYXqPIBDttxDH`

![获取密钥示意图](/images/token/获取密钥示意图.png)

5. 从API凭证中提取第12位开始的所有字符，例如：
   ```
   8R53qGvW5NC0PzVyeHksGYXqPIBDttxDH
   ```
6. 上面提取的字符串即为**PTERODACTYL_TOKEN_EN**的值

::: tip 提示
确保准确提取字符，不要包含前面的`ptlc_`部分和前11位字符。
:::

### 2. 获取PTERODACTYL_TOKEN

1. 通过数据库客户端或CLI登录翼龙面板的数据库（具体方法请参考[前端数据库配置指南](/pterodactyl-database)）
2. 在数据库中找到刚刚创建的API密钥记录
   - 可以通过观察`identifier`字段来识别，它应该与您的API凭证的前11位相同（例如`gJVDG9KgAE`）

![获取数据库token示意图](/images/token/获取数据库%20token%20示意图/QQ_1754456443589.png)

3. 复制对应记录中的`token`字段值，例如：
   ```
   eyJpdiI6Im5BZ1VsdU9SWGpVNFI5NFpodDJPVXc9PSIsInZhbHVlIjoiZHp0TktWd2pZVEE2TTZrYjBJRUtlVFVIUkRrZDNOdkdBdEVCNGJ4KzNQeFZEYXJnZk5RSHFCdGx3UXJlMHM5SCIsIm1hYyI6ImQ3YTllNThmMTIzYTNkYTVlOGE4ZGRmOTk3YzE1ZTU3ZWVmZGE4ZDgwOWZhMzZhNmRlMmM0NmUyMTc3Nzc1ZTAiLCJ0YWciOiIifQ==
   ```
4. 这个值即为**PTERODACTYL_TOKEN**的值

::: warning 注意
Token值通常较长且包含特殊字符，复制时请确保完整准确，不要遗漏任何字符。
:::

## 验证Token配置

配置完成后，您可以通过以下方式验证Token是否正确：

1. 确保env.php文件已正确保存
2. 尝试在魔方财务中创建一个测试服务
3. 如果服务能够正常创建并与翼龙面板通信，则表示Token配置正确

## 故障排查

如果您在配置Token后遇到问题，请检查：

1. Token是否完整复制，没有多余或缺少的字符
2. API凭证在翼龙面板中是否仍然有效
3. 数据库连接是否正常
4. env.php文件权限是否正确（应该可读但安全）

## 相关链接

- [安装模块](/install-module) - 模块安装指南
- [前端数据库配置指南](/pterodactyl-database) - 数据库配置指南
- [配置接口](/setup-api) - 接口配置指南 