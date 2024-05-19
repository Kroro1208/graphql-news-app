function newLinkSubscribe(context) {
    return context.pubsub.asyncIterator("NEW_LINK");
}

const newLink = {
    sebscribe: newLinkSubscribe,
    resolve: (payload) => {
        return payload;
    }
};

module.exports = {
    newLink
};