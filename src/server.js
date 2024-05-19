const { ApolloServer, gql } = require('apollo-server');
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require('@prisma/client');
const { getUserId } = require('./utils');

const prisma = new PrismaClient;

//resolver関係インポート
const Link = require('./resolvers/Link');
const Mutation = require('./resolvers/Mutaion');
const User = require('./resolvers/User');
const Query = require('./resolvers/Query');
const Subscription = require('./resolvers/Subscription');

// Subscription(リアルタイム通信)の実装
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

//resolver定義
const resolvers = {
    Query,
    Link,
    Mutation,
    User,
    Subscription
};

// ApolloServerをインスタンス化
const server = new ApolloServer(
    {
        typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
        resolvers,
        context: ({ req }) => {
            return {
                ...req,
                prisma,
                pubsub,
                userId: (req && req.headers.authorization) ? getUserId(req) : null
            }
        }
    }
);

server.listen().then(({ url }) => console.log(`${url}でサーバーをを起動中...`))
