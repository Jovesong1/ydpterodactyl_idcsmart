# 基本用法

本页面将介绍模块的基本用法和常见功能。

## 核心概念

在深入了解API之前，先了解几个核心概念：

- **资源 (Resources)**: 模块操作的基本单位
- **处理器 (Processors)**: 负责转换和处理资源的组件
- **管道 (Pipeline)**: 将多个处理器连接在一起的工作流
- **事件 (Events)**: 在处理过程中触发的通知

## 创建资源

```js
const { Resource } = require('your-module-name');

// 从字符串创建资源
const textResource = Resource.fromText('Hello, world!');

// 从文件创建资源
const fileResource = Resource.fromFile('/path/to/file.txt');

// 从URL创建资源
const urlResource = Resource.fromUrl('https://example.com/data.json');
```

## 使用处理器

```js
const { TextProcessor, JsonProcessor } = require('your-module-name/processors');

// 创建处理器
const textProcessor = new TextProcessor({
  encoding: 'utf-8',
  trim: true
});

const jsonProcessor = new JsonProcessor({
  pretty: true,
  schema: './schema.json'
});

// 处理资源
const processedText = await textProcessor.process(textResource);
const processedJson = await jsonProcessor.process(processedText);

console.log(processedJson.getData());
```

## 构建管道

管道允许你将多个处理器链接在一起：

```js
const { Pipeline } = require('your-module-name');

// 创建管道
const pipeline = new Pipeline()
  .add(textProcessor)
  .add(jsonProcessor)
  .add(new ValidationProcessor());

// 运行管道
const result = await pipeline.run(resource);
```

## 处理事件

```js
// 监听处理事件
pipeline.on('start', (resource) => {
  console.log('开始处理资源:', resource.getId());
});

pipeline.on('progress', (progress) => {
  console.log(`处理进度: ${progress.percent}%`);
});

pipeline.on('complete', (result) => {
  console.log('处理完成:', result);
});

pipeline.on('error', (error) => {
  console.error('处理错误:', error);
});
```

## 常见用例

### 数据转换

```js
// 将CSV转换为JSON
const csvToJson = new Pipeline()
  .add(new CsvProcessor())
  .add(new JsonProcessor());

const jsonData = await csvToJson.run(csvResource);
```

### 数据验证

```js
// 验证数据
const validator = new ValidationProcessor({
  rules: {
    name: { type: 'string', required: true },
    age: { type: 'number', min: 0, max: 120 }
  }
});

const isValid = await validator.validate(data);
```

## 下一步

了解了基本用法后，你可以继续探索[高级功能](/guide/advanced)或查阅[API参考](/guide/api)获取详细信息。 