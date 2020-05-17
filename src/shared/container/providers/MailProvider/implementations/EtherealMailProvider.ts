import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISendMailDTO from '../dtos/ISendMailDTO';

import IMailProvider from '../models/IMailProvider';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private MailTemplateProvider: IMailTemplateProvider,
  ) {
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

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = {
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.MailTemplateProvider.parse(templateData),
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
