import { Character } from "../entities/Character";

export interface ICharacterRepository {
  findAll(): Promise<Character[]>;
  findByName(name: string): Promise<Character | null>;
  create(character: Partial<Character>): Promise<Character>;
  syncCharacter(data: {
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
    origin?: string | null;
    image?: string | null;
    [key: string]: any;
  }): Promise<Character>;
}
