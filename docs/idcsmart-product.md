# 产品配置指南

本页面详细说明魔方财务中翼龙面板模块的产品配置项，帮助您设置灵活的产品配置选项。

## 弹性配置概述

本模块支持弹性化配置，可以根据用户需求在前台自由选择开通的配置规格。只需在产品配置中添加相应的配置项即可实现此功能。

### 配置优先级

系统按以下顺序识别配置参数：
1. 可配置项（用户选择）
2. 商品自动开通配置
3. 默认值

### 配置项显示名称

您可以使用`|`分隔符更改变量的显示名称，例如：
```
dedicated_ip|专用IP
```
这样在前台将显示为"专用IP"，但后台仍使用`dedicated_ip`作为参数名。

![可配置项示意图](/images/idcsmart-product/可配置项示意图.webp)

![可配置项示意图2](/images/idcsmart-product/可配置项示意图%202.webp)

## 支持的配置参数

下表列出了所有支持的配置参数：

| 参数名称 | 传递类型 | 单位 | 用途 |
|---------|---------|------|------|
| **MEM_limitations** | 整数型 | GB | 运行内存分配 |
| **SWAP_limitations** | 整数型 | GB | 交换内存分配 |
| **CPU_limitations** | 整数型 | % | 中央处理器限制（100%=1核） |
| **DISK_limitations** | 整数型 | GB | 磁盘空间分配 |
| **piece** | 整数型 | - | IO权重（块IO权重） |
| **position** | 整数型 | - | 位置标识 |
| **node** | 整数型 | - | 节点ID |
| **nests** | 整数型 | - | 巢ID（预设组ID） |
| **egg** | 整数型 | - | 蛋ID（预设ID） |
| **backups** | 整数型 | - | 备份数量 |
| **databases** | 整数型 | - | 数据库数量 |
| **allocations** | 整数型 | - | 网络分配限制 |
| **dedicated_ip** | 布尔型 | - | 独立IP（true=使用，false=不使用） |
| **servertype** | 字符串 | - | 巢和蛋的组合（格式：nestID,eggID，例如：1,7） |
| **__Additional_allocation_port** | 字符串 | - | 为变量分配端口（逗号分隔多个变量） |
| **__Additional_port** | 整数型 | - | 额外分配的端口数量 |

## 多端口配置

### __Additional_allocation_port 配置方法

部分游戏需要多个端口来实现运行，可以通过此参数为特定变量分配端口：

1. 在自定义配置中添加字段：`__Additional_allocation_port`
2. 字段内填写需要分配端口的变量名
3. 多个变量可以用逗号(,)分隔
4. 模块会在创建服务器时为这些变量分配可用端口，并将端口号填入变量中

![多端口配置方法示意图](/images/idcsmart-product/多端口配置方法示意图.webp)

### __Additional_port 配置方法

如果您需要为服务器分配额外的端口，可以使用此参数：

1. 在自定义配置中添加字段：`__Additional_port`
2. 填入需要额外分配的端口数量
3. 系统会自动为服务器分配指定数量的额外端口

![Additional_port配置方法示意图](/images/idcsmart-product/Additional_port配置方法示意图.webp)

## 配置示例

以下是一个典型的产品配置示例：

```
MEM_limitations|运行内存: 1,2,4,8
SWAP_limitations|交换内存: 0,1,2
CPU_limitations|处理器核心: 100,200,400
DISK_limitations|磁盘空间: 10,20,50,100
backups|备份数量: 1,3,5
databases|数据库数量: 0,1,2
__Additional_port|额外端口: 0,1,2,5
```

## 特殊参数说明

### servertype 参数

此参数比较特殊，它是nests和egg的组合，用于在开通时选择不同类型、不同游戏服务端：

1. 传递格式：`nestID,eggID`
2. 例如：`1,7` 表示在nestID为1的预设组中选择eggID为7的预设

### dedicated_ip 参数

此参数用于控制是否为服务器分配独立IP：

- `true`：使用独立IP
- `false`：不使用独立IP

## 注意事项

1. 未在产品配置中设置的参数将使用商品自动开通配置中的值
2. 如果商品自动开通配置也未设置，则使用系统默认值
3. 在设置可选值时，请确保这些值在翼龙面板的资源限制范围内
4. 多端口配置对于一些特殊游戏服务器（如Minecraft+网站、语音服务器等）非常有用