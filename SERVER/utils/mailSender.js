const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const mailSender = async (email, title, body) => {
  try {
    console.log("MAIL_HOST:", process.env.MAIL_HOST);
console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS ? "Exists krta hai"+process.env.MAIL_PASS : "Missing");

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      secure:false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = await transporter.sendMail({
      from: `"Let's Stud_ies - by Pheonix" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("This is " +  info.messageId || info);
    return info;
  } catch (error) {
    console.log("MailSender Error " + error.message);
  }
};

module.exports= mailSender;
