const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.domain.com',
    port: 0,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PWD,
    },
  })
  let info = transporter.sendMail({
    from: '"Learn It" <suporte@learnit.com>',
    to: data.to,
    text: data.text,
    subject: data.subject,
    html: data.html,
  })
})

module.exports = sendEmail
