// api/random-redirect.js
const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res) => {
  try {
    // 获取 API.txt 文件路径
    const filePath = path.resolve(__dirname, '../API.txt');
    
    // 异步读取文件内容
    const data = await fs.readFile(filePath, 'utf-8');

    // 按行分割并去除空白行
    const urls = data.split('\n').filter(url => url.trim() !== '');

    // 随机选择一个 URL
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];

    // 返回 302 重定向到随机 URL
    res.writeHead(302, { Location: randomUrl });
    res.end();
  } catch (err) {
    // 如果读取文件失败，返回错误信息
    res.status(500).send('Error reading API.txt');
  }
};
