const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ユーザー新規登録のリゾルバ
async function signup(args, context) {

    //パスワード設定
    const password = await bcrypt.hash(args.password, 10);

    // ユーザーの新規作成
    const user = await context.prisma.user.create({
        data: {
            ...args, // これはschema.graphqlで設定したemail,passwaord,nameが入る
            password
        }
    })
    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET_KEY);
    return { 
        token,
        user
    }
}

// ユーザーログインのリゾルバ
async function login(args, context) {
    const user = await context.prisma.user.findUnique({
        where: {email: args.email},
    });
    if(!user) {
        throw new Error('ユーザーが存在しません');
    }
    const valid  = await bcrypt.compare(args.password, user.password);
    if(!valid) {
        throw new Error('無効なパスワードです');
    }
    const token = jwt.sign({usesId: user.id}, process.env.APP_SECRET_KEY);

    return {
        token,
        user
    }
}

// ニュースを投稿するリゾルバ
async function post(args, context) {

    const { userId } = context;
    const newLink = await context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: {id: userId} }
        }
    });

    // 送信設定
    context.pubsub.publish("NEW_LINK", { newLink });

    return newLink;
}

module.exports = {
    signup,
    login,
    post
};