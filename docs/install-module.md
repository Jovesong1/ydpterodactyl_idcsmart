# 安装模块

本页面将指导您如何安装翼龙对接魔方财务模块。

## 下载模块

首先，您需要从官方渠道下载最新版本的翼龙对接魔方财务模块。

![下载示意图](/images/install-module/下载示意图.webp)

## 上传并安装

1. 将下载的插件压缩包上传至魔方财务系统的服务器模块目录：
   ```
   /public/plugins/servers
   ```

2. 解压缩上传的文件

## 配置环境文件

安装模块后，您需要创建或确认环境配置文件是否存在。这个文件对于模块的正常运行至关重要。

### 创建env.php文件

如果系统中尚未存在env.php文件，请按照以下步骤创建：

1. 导航到模块的根目录
2. 创建一个名为`env.php`的新文件
3. 将以下内容复制到文件中：

```php
<?php
// 定义全局日志级别
define('LOG_LEVEL', 1);

// 使用常量定义，更可靠
define('PTERODACTYL_TOKEN', "eyJpdiI6Ikd0RWFrRjl5RTJ0Y0JEUldVclA0dXc9PSIsInZhbHVlIjoiYWI4V00xdFdWN0JZNUZtV2pYMGZzdEl5Q1Y4YzdLVW51czZMNUxNMy9MNy83OTAzSmhMR0tNWTBUdEJ6UWppRiIsIm1hYyI6IjYwODhhMWVjZTcxZjM4MDhkOTI5NjhkNzhmNTYwYTNmMDUxMzk4MzMwM2ZjNjAwMDA1ZjliZDA2YjQ3MjE3NmQiLCJ0YWciOiIifQ==");
define('PTERODACTYL_TOKEN_EN', 'm2YeovLn9B9P65rLgDGkkSfVVLk1AcDC');


// 保留全局变量作为备用
$token = PTERODACTYL_TOKEN;
$token_en = PTERODACTYL_TOKEN_EN;
```

::: danger 重要提示
上面的Token值仅为示例，**必须**替换为您自己的有效Token。

<div style="text-align:center;margin:15px 0;font-size:1.2em;font-weight:bold;">
  <a href="/token-configuration" style="background-color:#4CAF50;color:white;padding:10px 20px;text-decoration:none;border-radius:4px;">
    👉 查看详细的Token配置指南 👈
  </a>
</div>
:::

::: warning 注意
如果env.php文件已经存在，请勿重复创建或修改，以免影响现有配置。
:::

## 验证安装

安装完成后，您需要验证模块是否正确安装：

1. 前往魔方财务后台
2. 导航至：**设置** > **商品设置** > **通用接口** > **创建接口**
3. 检查服务器模块选项中是否出现了"翼龙面板对接模块"

![检查是否正确安装示意图](/images/install-module/检查是否正确安装示意图.png)

如果您能在列表中看到翼龙面板对接模块，则表示模块已成功安装。

## 故障排查

如果模块未出现在列表中，请检查以下几点：

1. 确认模块目录 `/public/plugins/servers` 是否存在
2. 验证模块文件是否完整上传并正确解压
3. 检查模块授权是否与安装的魔方财务系统版本一致
4. 确认env.php文件是否正确创建并包含必要的配置
5. 查看魔方财务系统日志，寻找可能的错误信息

## 下一步

完成模块安装后，您可以继续[配置接口](/setup-api)，将魔方财务系统与翼龙面板连接起来。