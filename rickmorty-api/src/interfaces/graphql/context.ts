import { CharacterRepositoryImpl } from "../../infrastructure/database/CharacterRepositoryImpl";
import { GetCharactersUseCase } from "../../application/usecases/GetCharactersUseCase";
import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();
  console.log("Redis connected");
})();

const characterRepo = new CharacterRepositoryImpl();
const getCharactersUseCase = new GetCharactersUseCase(characterRepo, redisClient);

export const context = async () => ({
  redisClient,
  characterRepo,
  getCharactersUseCase,
});
