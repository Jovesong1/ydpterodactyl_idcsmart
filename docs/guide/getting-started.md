# 快速开始

## 安装

使用npm安装：

```bash
npm install your-module-name
```

或者使用yarn：

```bash
yarn add your-module-name
```

## 基本配置

创建一个配置文件 `config.js`：

```js
// config.js
module.exports = {
  apiKey: 'your-api-key',
  endpoint: 'https://api.example.com',
  timeout: 5000,
  debug: false
};
```

## 初始化

在你的应用中导入并初始化模块：

```js
const YourModule = require('your-module-name');
const config = require('./config');

// 初始化模块
const moduleInstance = new YourModule(config);

// 准备就绪
moduleInstance.init()
  .then(() => {
    console.log('模块初始化成功！');
  })
  .catch(err => {
    console.error('初始化失败:', err);
  });
```

## 第一个示例

下面是一个简单的示例，展示如何使用该模块的基本功能：

```js
// 处理数据
async function processData() {
  try {
    const result = await moduleInstance.process({
      data: 'sample data',
      options: {
        format: 'json',
        compress: true
      }
    });
    
    console.log('处理结果:', result);
  } catch (error) {
    console.error('处理失败:', error);
  }
}

// 运行示例
processData();
```

## 下一步

现在你已经完成了基本设置，可以继续阅读[基本用法](/guide/basic-usage)了解更多功能。 