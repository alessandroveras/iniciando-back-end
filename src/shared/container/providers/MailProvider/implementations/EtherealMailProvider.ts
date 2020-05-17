import nodemailer, { Transporter } from 'nodemailer';

import AppError from '@shared/errors/AppError';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    // nodemailer
    //   .createTestAccount()
    //   .then(account => {
    //     const transporter = nodemailer.createTransport({
    //       host: account.smtp.host,
    //       port: account.smtp.port,
    //       secure: account.smtp.secure,
    //       auth: {
    //         user: account.user,
    //         pass: account.pass,
    //       },
    //     });

    //     this.client = transporter;
    //   })
    //   .catch(err => {
    //     console.error(
    //       `EtherealMailProvider => Failed to create EMail Provider test account => Error: ${err.message}`,
    //     );
    //     // return process.exit(1);
    //   });

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'elenora61@ethereal.email',
        pass: 'JNq5VNUB9duDRRnqxv',
      },
    });

    this.client = transporter;
    console.log('EtherealMailProvider => Credentials obtained...');
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = {
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de Senha',
      text: body,
      html: `<p><b>GoBarber</b> ${body}</p>`,
    };

    console.log('EtherealMailProvider => Sending message...');
    try {
      const response = await this.client.sendMail(message);

      console.log(
        'EtherealMailProvider => Message send: %s',
        response.messageId,
      );

      console.log(
        'EtherealMailProvider =>Prieview URL: %s',
        nodemailer.getTestMessageUrl(response),
      );
    } catch {
      throw new AppError('EtherealMailProvider => EMail operation failed ');
    }
  }
}
