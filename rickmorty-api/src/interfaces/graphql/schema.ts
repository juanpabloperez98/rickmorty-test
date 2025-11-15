import { gql } from "apollo-server-express";

export const typeDefs = gql`
  input CharacterFilter {
    name: String
    status: String
    species: String
    gender: String
    origin: String
  }

  type Character {
    id: ID!
    name: String!
    status: String
    species: String
    gender: String
    origin: String
    image: String
  }

  type Query {
    characters(filter: CharacterFilter): [Character!]!
  }
`;
