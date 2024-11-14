// api/getImage.js
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filename = path.join(process.cwd(), 'img.txt');

  if (!fs.existsSync(filename)) {
    res.status(404).send('文件不存在');
    return;
  }

  // 从文件读取所有图片链接
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
      res.status(200).json({ pic });
      break;
    default:
      res.redirect(pic);
      break;
  }
};
