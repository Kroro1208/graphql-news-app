function links(parent, context) {
    return context.prisma.user.findUnique({
        where: { id: parent.id }
    }).links();
}

module.exports = {
    links
};