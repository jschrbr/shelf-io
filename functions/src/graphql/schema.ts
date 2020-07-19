import { gql } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql'

export const Date: any = new GraphQLScalarType({
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

const schema = gql`
  scalar Date
    type Part {
      id: String!
      name: String
      quantity: Int
      createdAt: Date
      updatedAt: Date
    }
    input PartAdd {
      name: String
      quantity: Int
    }
    input PartEdit {
      id: String!
      quantity: Int
    }
    type ResolveType {
      done: Boolean
    }
    type Query {
      getPart(id: String): Part
      getParts: [Part!]!
    }
    type Mutation {
      addPart(input: PartAdd!): ResolveType!
      editPart(input: PartEdit!): ResolveType!
      removePart(input: PartEdit!): ResolveType!
    }
`;

export default schema;