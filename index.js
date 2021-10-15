
const sendEmail = require('./sendEmail');
const emailHtml = require('./emailHtml');

const {
  fromDisplayText,
  fromDisplaySubText,
  user,
  to,
} = require('./config');

async function init() {
  try {
    // 用邮件模版生成字符串
    const htmlStr = emailHtml();
    // 发送邮件;
    sendEmail({
      from: fromDisplayText,
      to,
      subject: fromDisplaySubText,
      html: htmlStr,
    });
  } catch (e) {
    // 发送邮件给自己提示
    sendEmail({
      from: '报错啦',
      to: user,
      subject: '邮件发送失败',
      html: '请查看github actions',
    });
  }
}

init();
