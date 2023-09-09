
// const nodeMailer = require("nodemailer");
// require('dotenv').config();

// const sendEmail = async (options) => {
//     if (!options || typeof options !== 'object') {
//         throw new Error('Invalid options object');
//     }
//     if (!options.email || typeof options.email !== 'string') {
//         throw new Error('Invalid email address');
//     }
//     if (!options.subject || typeof options.subject !== 'string') {
//         throw new Error('Invalid email subject');
//     }
//     if (!options.message || typeof options.message !== 'string') {
//         throw new Error('Invalid email message');
//     }
//    // const testAccount = await nodeMailer.createTestAccount();
//     const transporter = nodeMailer.createTransport({
//         host:process.env.SMTP_HOST,
//         port:process.env.SMTP_PORT,
//         service: process.env.SMTP_SERVICE,
//         auth: {
//             user:  process.env.SMTP_MAIL,
//             pass:  process.env.SMTP_PASSWORD,
//         },
//     });

//     try {
//         await transporter.sendMail({
//             from: process.env.SMTP_MAIL ,
//             to: options.email,
//             subject: options.subject,
//             text: options.message,
//         });
//         console.log('Email sent successfully!');
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }


// };

// module.exports = sendEmail;




 
// const nodeMailer = require("nodemailer");
// require('dotenv').config();

// const sendEmail = async (options) => {
//   const transporter = nodeMailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     service: process.env.SMTP_SERVICE,
//     auth: {
//       user: process.env.SMTP_MAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.SMTP_MAIL,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;


//  const nodeMailer = require("nodemailer");
//  require('dotenv').config();

//  const transporter = nodeMailer.createTransport({
//     service:'Gmail',
//     auth:{
//         user:'process.env.SMTP_MAIL',
//         pass:'process.env.SMTP_PASSWORD',
//     },
//  });

//    const mailOptions = {
//     from: process.env.SMTP_MAIL,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   transporter.sendMail(mailOptions,(error,info)=>{
//     if(error){
//         console.error('Error sendind email:',error);
//     }else{
//         console.error('Email sent:',info.response);
//     }
//   });

//   module.exports = sendEmail;



const nodeMailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => 
{
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    timeout: 10000,
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email, // Use options.email to get the recipient's email address
    subject: options.subject, // Use options.subject for the email subject
    text: options.message, // Use options.message for the email content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
