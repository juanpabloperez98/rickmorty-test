import { Character } from "../../domain/entities/Character";

export class CharacterRepositoryImpl {
  constructor() {
  }

  async findAll() {
    return Character.findAll();
  }

  async findByName(name: string) {
    return Character.findOne({ where: { name } });
  }

  async create(data: any) {
    return Character.create(data);
  }
}
