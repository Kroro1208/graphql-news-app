const { ApolloServer, gql } = require('apollo-server');

// schema定義
const typeDefs = gql`
    type Query {
        info: String!
    }
`;
//resolver定義
const resolvers = {
    Query: {
        info: () => "News App",
    }
};

// ApolloServerをインスタンス化
const server = new ApolloServer(
    {
        typeDefs,
        resolvers
    }
);

server.listen().then(({ url }) => console.log(`${url}でサーバーをを起動中...`))
