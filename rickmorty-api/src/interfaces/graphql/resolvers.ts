import { MeasureTime } from "../decorators/measureTime";

class QueryResolvers {
  constructor() {}

  @MeasureTime()
  async characters(_: any, args: any, ctx: any) {
    try {
      return await ctx.getCharactersUseCase.execute(args.filter);
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw new Error("Failed to fetch characters");
    }
  }
}

const queryResolvers = new QueryResolvers();

export const resolvers = {
  Query: {
    characters: queryResolvers.characters.bind(queryResolvers),
  },
};
