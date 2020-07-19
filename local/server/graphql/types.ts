import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { GraphQLScalarType, Kind } from "https://deno.land/x/oak_graphql/deps.ts";


export const Date: any = new (GraphQLScalarType as any)({
  name: 'Date',
  description: 'The ```Date``` scalar type represents UTC date and time in ISO-8601 format. e.g:\n ```2020-06-26T13:06:14.000Z```',
  parseValue(value: any) {
    return new Date(value); // value from the client
  },
  serialize(value: any) {
    return value.toISOString(); // value sent to the client
  },
  parseLiteral(ast: any) {
    if (ast.kind === Kind.INT) {
      return new Date(+ast.value) // ast value is always in string format
    }
    return null;
  },
})

export const types = (gql as any)`
  scalar Date
  type Part {
    id: ID!
    name: String
    quantity: Int
    created_at: Date
    updated_at: Date
  }
  input PartAdd {
    name: String
    quantity: Int
  }
  input PartEdit {
    id: ID!
    quantity: Int
  }
  type ResolveType {
    done: Boolean
  }
  type Query {
    getPart(id: Int): Part
    getParts: [Part!]!
  }
  type Mutation {
    addPart(input: PartAdd!): ResolveType!
    editPart(input: PartEdit!): ResolveType!
    removePart(input: PartEdit!): ResolveType!
  }
  type Subscription {
    partChanged: Part
  }
`;