const jwt = require('jsonwebtoken');
require('dotenv').config();

// tokenを複合する関数
function getTokenPayload(token) {
    //トークン化されたuser.idを複合する
    return jwt.verify(token, process.env.APP_SECRET_KEY);
}

function getUserId(req, authToken) {
    if(req) {
        const authHeader = req.headers.authorization;
        if(authHeader){
            const token = authHeader.replace("Bearer ", ""); // "Bearer_token"という形でauthorization内に入っているのでBearerを取り除く
            if(!token) {
                throw new Error('トークンが見つかりませんでした');
            }
            const { userId } = getTokenPayload(token);
            return userId;
        }
    } else if (authToken){
        const { userId } = getTokenPayload(authToken);
        return userId;
    }

    throw new Error('認証権限がありません');
}

module.exports = {
    getUserId
};