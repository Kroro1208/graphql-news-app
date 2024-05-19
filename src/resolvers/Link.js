// 誰がnewsを投稿したのかのリゾルバ
function postedBy(parent, context) {
    return context.prisma.link.findUnique({
        where: { id: parent.id }
    }).postedBy();
}

module.exports = {
    postedBy
};