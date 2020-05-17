import 'reflect-metadata';
// libs
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
// app
import AppError from '@shared/errors/AppError';

// providers
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
// app -> models

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token not found in database');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found in database');
    }

    const tokenCreatedAt = userToken.created_at;
    const expirationTime = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), expirationTime)) {
      throw new AppError('Password reset token expired');
    }

    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
