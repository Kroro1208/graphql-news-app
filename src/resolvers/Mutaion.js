const bcrypt = require('bcryptjs');
const jwt = require('jwt');

APP_SECRET_KEY = 'exryctfuvgybhuijo@p';

// ユーザー新規登録のリゾルバ
async function signup(parent, args, context) {

    //パスワード設定
    const password = await bcrypt.hash(args.password, 10);

    // ユーザーの新規作成
    const user = await context.prisma.user.create({
        data: {
            ...args, // これはschema.graphqlで設定したemail,passwaord,nameが入る
            password
        }
    })
    const token = jwt.sign({useId: user.id}, APP_SECRET_KEY);
    return { 
        token,
        user
    }
}

// ユーザーログインのリゾルバ
async function longin(parent, args, context) {
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
    const token = jwt.sign({useId: user.id}, APP_SECRET_KEY);

    return {
        token,
        user
    }
}
