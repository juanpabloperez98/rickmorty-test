export const resolvers = {
  Query: {
    characters: async (_: any, args: any, ctx: any) => {
      console.log(ctx.redisClient);  
      console.log(ctx.characterRepo);
      try {
        return await ctx.getCharactersUseCase.execute(args.filter);
      } catch (error) {
        console.error("Error fetching characters:", error);
        throw new Error("Failed to fetch characters");
      }
    },
  },
};
