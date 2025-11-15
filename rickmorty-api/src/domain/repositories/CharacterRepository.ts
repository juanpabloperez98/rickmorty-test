import { Character } from "../entities/Character";

export interface ICharacterRepository {
  findAll(): Promise<Character[]>;
  findByName(name: string): Promise<Character | null>;
  create(character: Partial<Character>): Promise<Character>;
}
