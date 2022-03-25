import { buildSchema } from "graphql";

const schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
    createdAt: Float
    updatedAt: Float
  }
  
  type Query {
    hello: String
    getMessage(id: ID!): Message
    getMessageList: [Message]!
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
    deleteMessage(id: ID!): Boolean
  }
`);

export default schema;