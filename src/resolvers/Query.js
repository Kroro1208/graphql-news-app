function feed (context) {
    return context.prisma.link.findMany();
}

module.exports = {
    feed
};