// import nodeMailer, { Transporter } from 'nodemailer';
// import Mail from 'nodemailer/lib/mailer';

// export class MailService {
//   protected transporter: Transporter;

//   constructor() {
//     this.transporter = nodeMailer.createTransport({
//       host: MAIL_HOST,
//       port: parseInt(MAIL_PORT),
//       secure: false, // TRUE for port 465 (smtps)
//       auth: {
//         user: MAIL_ADDRESS,
//         pass: MAIL_PASSWORD,
//       },
//       tls: {
//         ciphers: 'SSLv3',
//       },
//     });
//   }

//   async sendMail(data: {
//     toAddress: string;
//     subject: string;
//     content: string;
//   }) {
//     const options: Mail.Options = {
//       from: MAIL_FROM,
//       to: data.toAddress,
//       subject: data.subject,
//       html: data.content,
//     };
//     await this.transporter.sendMail(options);
//   }

//   async sendVerificationMail(email: string) {
//     const token: string = await this.createAndStoreVerificationToken(email);
//     const link = `${APP_URI}/auth/verify-email?email=${email}&token=${token}`;
//     const html = await getHtmlToSend(
//       `${TEMPLATES_FOLDER}/VerificationEmail.html`,
//       {
//         link,
//       },
//     );
//     const options: Mail.Options = {
//       from: MAIL_FROM,
//       to: email,
//       subject: '[CINVEST] VERIFICATION EMAIL',
//       html,
//     };
//     await this.transporter.sendMail(options);
//   }
// }
