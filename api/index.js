// api/index.js
module.exports = (req, res) => {
  res.status(200).send(`
    <html>
      <head>
        <title>图片 API 主页</title>
      </head>
      <body>
        <h1>欢迎访问图片 API！</h1>
        <p>此 API 提供了随机图片链接。</p>
        <h2>如何使用：</h2>
        <ul>
          <li><strong>获取 JSON 格式的图片链接：</strong><br>
            访问 <a href="/api/getImage?type=json">/api/getImage?type=json</a><br>
            响应会返回一个包含图片链接的 JSON 对象。
          </li>
          <li><strong>获取重定向到随机图片：</strong><br>
            访问 <a href="/api/getImage">/api/getImage</a><br>
            请求会自动重定向到一个随机选择的图片链接。
          </li>
        </ul>
        <p>示例：访问 <code>/api/getImage?type=json</code> 获取 JSON 格式的响应。</p>
      </body>
    </html>
  `);
};
