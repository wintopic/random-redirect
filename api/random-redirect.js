// api/random-redirect.js
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    // 读取同目录下的 API.txt 文件
    const filePath = path.resolve(__dirname, '../API.txt');
    const data = fs.readFileSync(filePath, 'utf-8');

    // 将文件内容按行分割成数组
    const urls = data.split('\n').filter(url => url.trim() !== '');

    // 随机选择一个 URL
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];

    // 重定向到随机选中的 URL
    res.writeHead(302, { Location: randomUrl });
    res.end();
  } catch (err) {
    // 如果发生错误，返回 500 错误
    res.status(500).send('Error reading API.txt');
  }
};
