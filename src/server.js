const { ApolloServer, gql } = require('apollo-server');
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require('@prisma/client');
const { getUserId } = require('./utils');

const prisma = new PrismaClient;

//resoluver関係インポート
const Links = require('./resolvers/Links');
const Mutation = require('./resolvers/Mutaion');
const User = require('./resolvers/User');
const Query = require('./resolvers/Query');



//resolver定義
const resolvers = {
    Query,
    Links,
    Mutation,
    User
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
                userId: (req && req.headers.authorization) ? getUserId(req) : null
            }
        }
    }
);

server.listen().then(({ url }) => console.log(`${url}でサーバーをを起動中...`))
