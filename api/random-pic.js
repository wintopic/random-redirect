// api/random-pic.js

const fs = require('fs');

module.exports = async (req, res) => {
  // 定义存放图片链接的文件路径
  const filePath = '../img.txt';
  
  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: '文件不存在' });
  }

  // 读取文件内容并按行分割
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const pics = fileContents.split('\n').map(line => line.trim()).filter(line => line !== '');

  // 随机选择一个图片链接
  const pic = pics[Math.floor(Math.random() * pics.length)];

  // 获取请求中的 type 参数
  const type = req.query.type;

  // 根据请求的 type 返回不同的响应
  if (type === 'json') {
    return res.json({ pic });
  }

  // 默认情况：重定向到随机的图片
  res.redirect(pic);
};
