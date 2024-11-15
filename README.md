# 如何在 Vercel 上搭建自建图片 API

本文将介绍如何在 Vercel 上部署一个自建的图片 API，通过从 `img.txt` 文件中读取图片链接，并随机返回一个链接或者重定向到对应的图片。

## 步骤 1: 创建 Node.js API

首先，你需要创建一个 Node.js API，使用 Vercel 的 Serverless Functions 来处理请求。该 API 会从 `img.txt` 文件中随机选择一个图片链接，并根据请求的参数返回相应的内容。

### 1.1 创建 `getImage.js` 文件

在你的项目中创建一个 `api` 目录，并在其中创建一个名为 `getImage.js` 的文件，代码如下：

```javascript
// api/getImage.js
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filename = path.join(process.cwd(), 'img.txt');

  // 检查 img.txt 文件是否存在
  if (!fs.existsSync(filename)) {
    res.status(404).send('文件不存在');
    return;
  }

  // 从 img.txt 文件读取所有图片链接
  const pics = fs.readFileSync(filename, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');

  // 从数组中随机选择一个图片链接
  const pic = pics[Math.floor(Math.random() * pics.length)];

  // 获取请求中的type参数
  const { type } = req.query;

  switch (type) {
    case 'json':
      // 返回 JSON 格式的图片链接
      res.status(200).json({ pic });
      break;
    default:
      // 默认返回重定向到图片链接
      res.redirect(pic);
      break;
  }
};
```

### 1.2 代码解释

- 代码首先检查 `img.txt` 文件是否存在。如果文件不存在，API 返回 404 错误。
- 然后，从 `img.txt` 文件中读取所有图片链接。每个链接应该在文件中占据一行，API 会根据每一行的链接生成一个数组。
- 随机从图片数组中选择一个链接，并返回给客户端。如果请求的参数是 `type=json`，则返回一个 JSON 格式的响应，内容包含图片链接。如果没有指定参数，默认会将请求重定向到随机图片链接。

## 步骤 2: 创建 `img.txt` 文件

接下来，你需要创建一个 `img.txt` 文件，并将其放在项目的根目录下。文件内容可以是任意的图片链接，每行一个链接。例如：

```txt
https://example.com/image1.jpg
https://example.com/image2.jpg
https://example.com/image3.jpg
```

确保文件格式正确，每行一个图片链接，且不要有多余的空行或空格。

## 步骤 3: 部署到 Vercel

现在，项目已经准备好了，你可以将它部署到 Vercel。以下是具体步骤：

### 3.1 创建 Vercel 项目

1. 如果你还没有 Vercel 账户，首先前往 [Vercel 官网](https://vercel.com) 创建一个免费账户。
2. 登录 Vercel 后，点击页面右上角的 "New Project" 按钮，创建一个新项目。
3. 你可以选择从 GitHub、GitLab 或 Bitbucket 等版本控制平台导入代码，或者直接上传一个本地项目。

### 3.2 配置项目结构

- 确保项目的目录结构如下：

```plaintext
my-vercel-project/
├── api/
│   └── getImage.js
├── img.txt
└── vercel.json  (可选，配置文件)
```

- 将 `getImage.js` 文件放到 `api/` 目录下。
- 将 `img.txt` 文件放到项目的根目录下。

### 3.3 部署项目

1. 在 Vercel 控制面板中，选择 "Deploy" 进行部署。
2. Vercel 会自动识别你的项目，并根据 `api` 目录中的文件创建 Serverless 函数。点击 "Deploy" 后，Vercel 会构建并部署你的项目。

### 3.4 部署完成

部署完成后，Vercel 会提供一个 URL，你可以通过该 URL 访问你的 API。URL 形式通常为 `https://<your-vercel-project>.vercel.app`，其中 `<your-vercel-project>` 是你项目的名称。

## 步骤 4: 测试 API

现在，你可以通过以下几种方式测试你的 API：

### 4.1 测试 JSON 格式响应

访问以下 URL，可以返回一个 JSON 格式的响应，其中包含随机的图片链接：

```
https://<your-vercel-project>.vercel.app/api/getImage?type=json
```

示例响应：

```json
{
  "pic": "https://example.com/image1.jpg"
}
```

### 4.2 测试重定向到图片

如果你不指定 `type` 参数，默认会重定向到一个随机的图片链接：

```
https://<your-vercel-project>.vercel.app/api/getImage
```

浏览器会自动跳转到一个随机选择的图片链接。

## 小结

通过以上步骤，你成功在 Vercel 上部署了一个简单的自建图片 API。你可以根据自己的需求更新 `img.txt` 文件中的图片链接，或者扩展 API 功能，比如支持更多的请求参数，或者添加图片分类等功能。
