import { ICharacterRepository } from "../../domain/repositories/CharacterRepository";
import { RedisClientType } from "redis";

interface CharacterFilter {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  origin?: string;
}

export class GetCharactersUseCase {
  constructor(
    private repository: ICharacterRepository,
    private redisClient: RedisClientType
  ) {}

  async execute(filter?: CharacterFilter) {
    const cacheKey = JSON.stringify(filter || {});
    const cached = await this.redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    let characters = await this.repository.findAll();

    if (filter) {
      characters = characters.filter((c: any) => {
        return (
          (!filter.name ||
            c.name.toLowerCase().includes(filter.name.toLowerCase())) &&
          (!filter.status || c.status === filter.status) &&
          (!filter.species || c.species === filter.species) &&
          (!filter.gender || c.gender === filter.gender) &&
          (!filter.origin || c.origin === filter.origin)
        );
      });
    }

    await this.redisClient.set(cacheKey, JSON.stringify(characters), {
      EX: 3600,
    });

    return characters;
  }

  async executeCronSync(characterData: any) {
    return this.repository.syncCharacter(characterData);
  }
}
