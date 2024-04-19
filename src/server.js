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