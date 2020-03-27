const { User } = require('../models/User');

let auth = (req, res, next) => {
    //인증처리를 합니다.


    //클라이언트 쿠키에서 토큰을 가져옵니다.
    let token = req.cookies.x_auth;

    //토큰을 복호화하여 유저를 찾습니다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next()
    })
    //유저가 있으면 인증 완료

    //유저가 없으면 인증 실패
}

module.exports = { auth };