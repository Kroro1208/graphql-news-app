const { ApolloServer, gql } = require('apollo-server');
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require('prisma-client');
const prisma = new PrismaClient;

//resolver定義
const resolvers = {
    Query: {
        info: () => "News App",
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany();
        }
    },

    Mutation: {
        post: (parent, args, context) => {
           const newLink = context.prisma.link.create({
            data:args.url,
            description: args.description
           });
           return newLink;
        }
    }
};

// ApolloServerをインスタンス化
const server = new ApolloServer(
    {
        typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
        resolvers,
        context: {
            prisma,
        }
    }
);

server.listen().then(({ url }) => console.log(`${url}でサーバーをを起動中...`))
