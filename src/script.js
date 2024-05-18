// DBにアクセスするためのクライアントライブラリ

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

async function main() {
    await prisma.link.create(
        {
            data: {
                description: "GraphQLを使用したNewsAppのためのWebAPI作成要領",
                url: "https://news.ycombinator.com/"
            }
        }
    );

    const allLinks = await prisma.link.findMany();
    console.log(allLinks);
}

main().catch((e) => {
    throw e;
}).finally(async () => {
    prisma.$disconnect;
})