# 前端数据库配置指南

本页面将指导您如何正确配置翼龙面板的前端数据库信息，以确保魔方财务与翼龙面板的集成功能正常运行。

## 为什么需要数据库访问权限

配置数据库访问是魔方财务与翼龙面板集成的**核心环节**。这一步骤对于实现以下功能至关重要：

- **自动化用户创建**：魔方财务系统需要直接访问翼龙面板的数据库，以便在客户购买服务时自动创建用户账户
- **服务自动开通**：系统需要向数据库写入必要信息，确保服务能够自动开通
- **权限管理**：确保客户只能访问其购买的服务，而不是整个面板
- **数据同步**：保持魔方财务系统和翼龙面板之间的数据一致性

如果没有正确配置数据库访问，魔方财务系统将无法执行这些自动化操作，您将需要手动处理用户创建和服务开通等工作，大大增加管理负担。

## 数据库信息格式

在配置商品参数时，您需要按照以下格式填写前端数据库信息：

```
host|port|username|password|database
```

例如：
```
localhost|3306|pterodactyl|your_secure_password|panel
```

## 获取数据库信息

### 方法一：查看翼龙面板配置文件

1. 登录到您的翼龙面板服务器
2. 查看翼龙面板的环境配置文件：

```bash
cat /var/www/pterodactyl/.env
```

3. 在配置文件中找到以下数据库相关参数：
   - `DB_HOST`：数据库主机地址
   - `DB_PORT`：数据库端口
   - `DB_USERNAME`：数据库用户名
   - `DB_PASSWORD`：数据库密码
   - `DB_DATABASE`：数据库名称

### 方法二：Docker部署配置

如果您是通过pterodactyl.top提供的Docker教程部署的前端，可以通过以下步骤配置外网访问数据库：

#### 1. 修改Docker配置文件

首先修改`docker-compose.yml`文件，开放数据库端口，在database下增加ports配置：

```yaml
database:
    image: mariadb:10.5
    restart: always
    command: --default-authentication-plugin=mysql_native_password
    volumes:
      - "/srv/pterodactyl/database:/var/lib/mysql"
    ports:  # 新增端口映射，允许外部访问数据库
      - "3306:3306"
    environment:
      <<: *db-environment
      MYSQL_DATABASE: "panel"
      MYSQL_USER: "pterodactyl"
```

#### 2. 重启Docker容器

```bash
# 进入配置文件所在目录
cd /var/www/pterodactyl

# 重启容器
docker-compose down && docker-compose up -d
```

#### 3. 创建数据库用户

随后进入数据库容器并创建用户：

```bash
# 查看数据库容器名称或ID
docker ps | grep mariadb

# 进入容器（使用实际容器名称或ID）
docker exec -it pterodactyl-database-1 bash

# 使用root用户登录（密码是docker-compose.yml中的MYSQL_ROOT_PASSWORD值）
mysql -u root -p
```

输入docker-compose.yml中MYSQL_ROOT_PASSWORD对应的密码（默认是CHANGE_ME_TOO），然后执行以下SQL命令：

```sql
-- 创建名为remote_api的用户，允许从任意IP访问（密码设置为你自己的安全密码，这个密码会配置在魔方中）
CREATE USER 'remote_api'@'%' IDENTIFIED BY '你的安全密码';

-- 授予该用户对panel数据库中api_keys表的读写权限
GRANT SELECT, INSERT, UPDATE, DELETE ON panel.api_keys TO 'remote_api'@'%';

-- 刷新权限使设置生效
FLUSH PRIVILEGES;

-- 退出MySQL
EXIT;
```

### 完整示例

以下是一个完整的配置示例：

假设翼龙面板地址为：172.16.10.127

1. 修改docker-compose.yml开放数据库端口后：
   ```bash
   # 进入配置文件所在目录
   cd /var/www/pterodactyl
   
   # 重启容器
   docker-compose down && docker-compose up -d
   
   # 进入数据库容器
   docker exec -it pterodactyl-database-1 bash
   
   # 登录MySQL（使用root密码 CHANGE_ME_TOO）
   mysql -u root -p
   ```

2. 输入密码CHANGE_ME_TOO后，在MySQL命令行执行以下命令：
   ```sql
   -- 创建用户（允许所有IP访问，密码为test123）
   CREATE USER 'panel_api_user'@'%' IDENTIFIED BY 'test123';
   
   -- 授予对panel数据库中api_keys表的读写权限
   GRANT SELECT, INSERT, UPDATE, DELETE ON panel.api_keys TO 'panel_api_user'@'%';
   
   -- 刷新权限
   FLUSH PRIVILEGES;
   
   -- 验证权限（可选）
   SHOW GRANTS FOR 'panel_api_user'@'%';
   
   -- 退出MySQL
   EXIT;
   ```

3. 此时创建出来的用户就是panel_api_user，密码是test123

4. 在魔方财务中填写的数据库信息格式为：
   ```
   172.16.10.127|3306|panel_api_user|test123|panel
   ```

## 数据库权限的重要性

配置的数据库用户权限直接影响魔方财务系统的功能：

1. **读取权限**：允许系统查询现有用户和服务器信息
2. **写入权限**：允许系统创建新用户、分配服务器和更新配置
3. **更新权限**：允许系统修改现有配置和服务参数
4. **删除权限**：允许系统在需要时清理数据

如果权限配置不足，可能会导致自动化流程中断，例如客户付款后无法自动开通服务，或者无法自动创建用户账户。

## 常见问题

### 数据库连接失败

如果遇到数据库连接失败的情况，请检查：

1. 数据库主机地址是否正确
2. 数据库端口是否开放（默认MySQL端口为3306）
3. 数据库用户名和密码是否正确
4. 数据库用户是否有权限访问指定的数据库
5. 如果数据库在远程服务器上，请确保防火墙已允许连接

### 安全注意事项

1. 不要使用root用户进行连接
2. 为数据库用户设置强密码
3. 只授予必要的权限
4. 考虑使用防火墙限制数据库访问来源

## 测试数据库连接

配置完成后，您可以通过以下方式测试数据库连接是否正常：

1. 创建一个测试订单并激活服务
2. 检查客户区是否能正常显示翼龙面板的控制界面
3. 查看魔方财务系统日志，确认没有数据库连接错误

## 总结

正确配置数据库访问是实现魔方财务系统与翼龙面板无缝集成的关键步骤。通过提供适当的数据库连接信息和权限，您可以让系统自动处理用户创建、服务开通和资源分配等任务，大大减少手动操作，提高服务效率。 