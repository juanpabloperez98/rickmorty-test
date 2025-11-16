import cron from "node-cron";
import fetch from "node-fetch";
import { CharacterRepositoryImpl } from "../database/CharacterRepositoryImpl";
import { GetCharactersUseCase } from "../../application/usecases/GetCharactersUseCase";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient: any = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

async function runSync() {
  await redisClient.connect().catch(() => {});

  const repo = new CharacterRepositoryImpl();
  const usecase = new GetCharactersUseCase(repo, redisClient);

  const response = await fetch(process.env.RICK_API_URL as string);
  const data = await response.json();

  for (const char of data.results) {
    await usecase.executeCronSync(char);
  }

  await redisClient.disconnect();
}

cron.schedule("* * * * *", async () => {
  console.log("Cron ejecutado: sincronizando personajes");
  await runSync();
});
