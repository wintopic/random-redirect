// api/index.js
module.exports = (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>图片 API 说明</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f9;
          color: #333;
        }
        .container {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #4CAF50;
        }
        pre {
          background-color: #f7f7f7;
          padding: 10px;
          border-radius: 4px;
        }
        a {
          color: #1E90FF;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>欢迎使用图片 API</h1>
        <p>这是一个简单的 API，提供随机图片链接。你可以通过以下方式调用它：</p>
        <h2>API 调用方式：</h2>
        <ul>
          <li>
            <strong>返回 JSON 格式：</strong>
            <p>访问以下 URL 可以返回一个随机的图片链接（JSON 格式）：</p>
            <pre>GET https://${req.headers.host}/api/getImage?type=json</pre>
            <p>响应示例：</p>
            <pre>{ "pic": "https://example.com/image1.jpg" }</pre>
          </li>
          <li>
            <strong>返回重定向到图片：</strong>
            <p>访问以下 URL 会自动重定向到一个随机的图片链接：</p>
            <pre>GET https://${req.headers.host}/api/getImage</pre>
            <p>浏览器会跳转到随机图片的 URL。</p>
          </li>
        </ul>
        <p>更多信息，请参考 <a href="https://vercel.com">Vercel</a> 的官方文档。</p>
      </div>
    </body>
    </html>
  `);
};
