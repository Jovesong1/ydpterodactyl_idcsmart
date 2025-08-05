# Wings 配置指南

## 概述

Wings是翼龙面板的守护进程组件，负责与面板前端进行通信并执行服务器管理操作。在魔方财务与翼龙面板的集成中，正确配置Wings是确保控制台功能正常工作的关键步骤。如果配置不正确，客户将无法通过魔方财务界面访问服务器控制台（WebSocket连接）。

## 配置步骤

### 修改Wings配置文件

1. 登录到安装Wings的服务器
2. 编辑Wings配置文件：

```bash
sudo nano /etc/pterodactyl/config.yml
```

3. 找到`allowed_origins`部分，并修改为：

```yaml
allowed_origins:
  - '*'
```

4. 保存并关闭文件（在nano编辑器中按`Ctrl+X`，然后按`Y`确认保存）

5. 重启Wings服务：

```bash
sudo systemctl restart wings
```

## 安全性考虑

默认配置中的`'*'`表示允许来自任何来源的WebSocket连接。虽然这样配置最简单，但从安全角度考虑，建议将其限制为您的魔方财务网站域名：

```yaml
allowed_origins:
  - 'https://您的魔方财务域名.com'
```

这样可以防止未授权的网站尝试连接到您的Wings服务。

## 验证配置

配置完成后，您可以通过以下步骤验证WebSocket连接是否正常：

1. 登录魔方财务客户中心
2. 访问已开通的翼龙服务器
3. 尝试打开控制台选项卡
4. 如果能看到控制台输出，则表示配置成功

## 常见问题排查

如果配置后仍然无法访问控制台，请检查：

1. Wings服务是否正常运行
2. 防火墙是否允许WebSocket连接（通常是8080端口）
3. 魔方财务与Wings服务器之间的网络连接是否正常
4. 浏览器控制台是否有WebSocket连接错误

## 更多资源

如需了解更多关于Wings配置的信息，请参考[翼龙面板官方文档](https://pterodactyl.io/wings/1.0/configuration.html)。