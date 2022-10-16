const nodemailer = require('nodemailer');
const generateHtmlTemplate = require('./generateHtmlTemplate');

const sendEmail = async(data) =>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD
        }   
    })

  await transporter.sendMail({
    from: `${data.sender}`, // sender address
    to: `${process.env.EMAIL}`, // list of receivers
    subject: "Enquiry", // Subject line
    html: generateHtmlTemplate(data.name, data.message) // html body
  });

}
module.exports = sendEmail


