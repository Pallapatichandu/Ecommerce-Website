import nodemailer from "nodemailer";

export const sendMail = async (

   to,
   subject,
   message

) => {

   const transporter =
   nodemailer.createTransport({

      host:"smtp-relay.brevo.com",

      port:587,

      secure:false,

      auth:{

         user:
         process.env.EMAIL_USER,

         pass:
         process.env.EMAIL_PASS

      }

   });



   await transporter.sendMail({

      from:
      process.env.SENDER_EMAIL,

      to,

      subject,

      html: message

   });

};