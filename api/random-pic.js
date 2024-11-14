// api/random-pic.js

module.exports = async (req, res) => {
  // 从环境变量中读取图片链接并转换为数组
  const pics = process.env.IMG_LINKS.split(',');

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
