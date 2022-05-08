import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../email-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e153651a7626b9",
    pass: "ed86c42cc950b5"
  }
});

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({subject,body}: SendMailData){
   await transport.sendMail({
    from: "Equipe feedget <oi@feedget.com>",
    to: 'Me <rodrigo.bleachex@hotmail.com>',
    subject,
    html:body
    
  })

  }
}