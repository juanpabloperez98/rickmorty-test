import { Character } from "../../domain/entities/Character";
import { ICharacterRepository } from "../../domain/repositories/CharacterRepository";

export class CharacterRepositoryImpl implements ICharacterRepository {
  constructor() { }

  async findAll() {
    return Character.findAll();
  }

  async findByName(name: string) {
    return Character.findOne({ where: { name } });
  }

  async create(data: any) {
    return Character.create(data);
  }

  async syncCharacter(data: any) {
    const { id, name, status, species, gender, origin, image } = data;

    const existing = await Character.findOne({ where: { id } });

    if (existing) {
      await existing.update({
        name,
        status,
        species,
        gender,
        image,
        origin: origin?.name ?? null,
      });
      return existing;
    } else {
      const created = await Character.create({
        id,
        name,
        status,
        species,
        gender,
        image,
        origin: origin?.name ?? null,
      });

      return created;
    }
  }

}
