const { ApolloServer, gql } = require('apollo-server');

let links = [
    {
        id: "link-0",
        description: "GraphQLを使用したNewsAppのためのWebAPI作成要領",
        url: "https://news.ycombinator.com/"
    }
];

// schema定義
const typeDefs = gql`
    type Query {
        info: String!
        feed: [Link]!
    }

    type Link {
        id : ID!
        description: String!
        url: String!
    }
`;


//resolver定義
const resolvers = {
    Query: {
        info: () => "News App",
        feed: () => links
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
