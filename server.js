import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import { randomBytes } from 'crypto'
import 'dotenv/config';
import database from './database';
import { Message } from './message.schema';

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  createMessage: async ({ input }) => {
    try {
      const id = randomBytes(10).toString('hex');
      
      const message = {
        ...input,
        id,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
  
      const newMessage = new Message(message);
      void newMessage.save();
      
      return message;
    } catch (error) {
      console.log(error);
    }
  },
  getMessage: async ({id}) => {
    try {
      const message = await Message.findOne({id});
      return message;
    } catch (error) {
      console.log(error);
    }
  },
  getMessageList: async () => {
    try {
      const messageList = await Message.find();
      return messageList;
    } catch (error) {
      console.log(error);
    }

  },
  updateMessage: async ({id, input}) => {
    try {
      const updateValue = {
        updatedAt: Date.now(),
        ...input,
      }

      const newMessage = await Message.findOneAndUpdate({id}, updateValue, {
        new: true
      });

      return newMessage;
    } catch (error) {
      console.log(error);
    }
  },
  deleteMessage: async ({id}) => {
    try {
      const {deletedCount} = await Message.deleteOne({id});

      if(deletedCount !== 1) {
        throw new Error(`Failed to delete ${id}`);
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

database.dbConnect().then((url) => {
  console.log("Database connected on " + url)
}).catch((err) => console.log(err));

const PORT = 4000;

app.listen(4000, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
});
