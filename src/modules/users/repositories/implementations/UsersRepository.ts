import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined>  {
    // Complete usando ORM

    const userWithGames = await this.repository.findOne(user_id, {
      relations: ['games']
    });

    return userWithGames;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const sql = `SELECT * FROM users ORDER BY first_name ASC`

    return await this.repository.query(sql); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const sql = `SELECT * FROM users WHERE lower(first_name) = '${first_name.toLowerCase()}' AND lower(last_name) = '${last_name.toLowerCase()}';`;

    const user = await this.repository.query(sql);

    return user;  // Complete usando raw query
  }
}
