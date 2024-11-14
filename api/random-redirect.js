// api/random-redirect.js
const fs = require('fs').promises;  // 使用内置的 fs 模块
const path = require('path');  // 使用内置的 path 模块

module.exports = async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, '../API.txt');
    const data = await fs.readFile(filePath, 'utf-8');
    const urls = data.split('\n').filter(url => url.trim() !== '');
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
    res.writeHead(302, { Location: randomUrl });
    res.end();
  } catch (err) {
    res.status(500).send('Error reading API.txt');
  }
};
