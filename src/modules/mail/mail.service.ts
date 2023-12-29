import { Logger } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import {
  MAIL_ADDRESS,
  MAIL_FROM,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
} from 'src/environment';
export class MailService {
  protected transporter: Transporter;

  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: MAIL_HOST,
      port: +MAIL_PORT,
      secure: false, // TRUE for port 465 (smtps)
      auth: {
        // type: 'oauth2',
        user: MAIL_ADDRESS,
        pass: MAIL_PASSWORD,
      },
      tls: {
        //ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    });
  }
  onModuleInit() {
    this.transporter.verify((error, success) => {
      if (error) {
        Logger.error(error);
      } else {
        Logger.log('Mail server is ready to take our messages');
      }
    });
  }

  async sendMail(data?: {
    toAddress: string;
    subject: string;
    content: string;
  }) {
    const options: Mail.Options = {
      from: MAIL_FROM,
      // to: data.toAddress,
      // subject: data.subject,
      // html: data.content,
      to: 'nguy2616@gmail.com',
      subject: 'TEST',
      html: 'TEST',
    };
    await this.transporter.sendMail(options);
  }

  // async sendVerificationMail(email: string) {
  //   const token: string = await this.createAndStoreVerificationToken(email);
  //   const link = `${APP_URI}/auth/verify-email?email=${email}&token=${token}`;
  //   const html = await getHtmlToSend(
  //     `${TEMPLATES_FOLDER}/VerificationEmail.html`,
  //     {
  //       link,
  //     },
  //   );
  //   const options: Mail.Options = {
  //     from: MAIL_FROM,
  //     to: email,
  //     subject: '[CINVEST] VERIFICATION EMAIL',
  //     html,
  //   };
  //   await this.transporter.sendMail(options);
  // }
}
