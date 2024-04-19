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

    type Mutation {
        post(url: String!, description: String!): Link!
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
        feed: () => links,
    },

    Mutation: {
        post: (params, args) => {
            let idCount = links.length; // 配列の長さをIDに指定
            const link = {
                id: `link-${idCount++}`, // linkが増えるごとにIDも増やしていく
                description: args.description,
                url: args.url
            };

            links.push(link);
            return link;
        }
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
