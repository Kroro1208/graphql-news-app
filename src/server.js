const fs = require("fs");
const path = require("path");

const { ApolloServer, gql } = require('apollo-server');

let links = [
    {
        id: "link-0",
        description: "GraphQLを使用したNewsAppのためのWebAPI作成要領",
        url: "https://news.ycombinator.com/"
    }
];

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
        typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
        resolvers
    }
);

server.listen().then(({ url }) => console.log(`${url}でサーバーをを起動中...`))
