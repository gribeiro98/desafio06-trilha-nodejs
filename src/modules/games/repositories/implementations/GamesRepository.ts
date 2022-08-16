import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository
      .createQueryBuilder('game')
      .where('lower(game.title) like :title', {title: `%${param.toLowerCase()}%` })
      .getMany();
      // Complete usando query builder

    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const sql = 'SELECT count(*) FROM games';

    return this.repository.query(sql); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    const users = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoin('user.games', 'game')
      .where('game.id = :id', { id: id })
      .getMany();

      return users;
  }
}
