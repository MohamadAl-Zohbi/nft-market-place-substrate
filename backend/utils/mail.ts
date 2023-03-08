import nodemailer from "nodemailer";
const Email = require('email-templates');
import { SERVER_LINK  , EMAIL , EMAIL_PASSWORD  , LOGO_URL } from "./global";

async function emailVerificationSender(subject , text , to , verificationToken ,name) {
    const verificationLink = `${SERVER_LINK}login/email-verification?token=${verificationToken}`;
  
    // Create a transporter object that defines the connection to the email server
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL ,
        pass: EMAIL_PASSWORD,
      },
    });
  
    const email = new Email({
      message: {
        from: 'test@example.com'
      },
      // uncomment below to send emails in development/test env:
      send: true,
      transport: transporter,
      preview: false
    });
    
    await email
      .send({
        template: 'email_verification',
        message: {
          to: to
        },
        locals: {
          name: name,
          activationLink : verificationLink,
          LOGO_URL : LOGO_URL,
        }
      })
      .then(console.log())
      .catch(console.error);
  }


  async function emailSender(subject , to , text, templateName , userName){
    //data argument is a object can contain many informations like text , more information
    // Create a transporter object that defines the connection to the email server
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL ,
        pass: EMAIL_PASSWORD,
      },
    });
  
    const email = new Email({
      message: {
        from: 'test@example.com'
      },
      // uncomment below to send emails in development/test env:
      send: true,
      transport: transporter,
      preview: false
    });
    
    await email
      .send({
        template: templateName,
        message: {
          to: to
        },
        locals: {
          name: userName,
          text : text
        }
      })
      .then(console.log)
      .catch(console.error);
  }
  export {emailVerificationSender , emailSender}