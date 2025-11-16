import { GetCharactersUseCase } from "./GetCharactersUseCase";
import { ICharacterRepository } from "../../domain/repositories/CharacterRepository";
import Redis from "ioredis-mock";

describe("GetCharactersUseCase", () => {
    let repo: ICharacterRepository;
    let redisClient: any;
    let usecase: GetCharactersUseCase;

    beforeEach(() => {
        repo = {
            findAll: jest.fn().mockResolvedValue([
                { name: "Rick", status: "Alive", species: "Human", gender: "Male", origin: "Earth", image: "url" },
                { name: "Morty", status: "Alive", species: "Human", gender: "Male", origin: "Earth", image: "url" },
            ]),
            findByName: jest.fn(),
            create: jest.fn(),
            syncCharacter: jest.fn().mockResolvedValue(undefined),
        };

        redisClient = new Redis();
        usecase = new GetCharactersUseCase(repo, redisClient);
    });


    it("should return all characters if no filter is provided", async () => {
        const characters = await usecase.execute();
        expect(characters.length).toBe(2);
        expect(characters[0].name).toBe("Rick");
    });

    it("should cache results in Redis", async () => {
        const key = JSON.stringify({});
        await usecase.execute();
        const cached = await redisClient.get(key);
        expect(cached).toContain("Rick");
        expect(cached).toContain("Morty");
    });

});
