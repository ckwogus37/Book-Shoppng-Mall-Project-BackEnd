const verifyJWT = require('../verifyJWT');
const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');

const addLike = (req,res)=>{
    const book_id = req.params.id;

    let decodedJwt = verifyJWT(req);

    if(decodedJwt instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message : "로그인 세션이 만료되었습니다. 다시 로그인해 주십시오"
        });
    }else if(decodedJwt instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message : "잘못된 JWT 토큰입니다."
        });
    }else{
        let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)`;
        let values = [decodedJwt.id, book_id];
        conn.query(sql, values, 
            (err, results)=>{
                if(err){
                    console.log(err)
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                return res.status(StatusCodes.CREATED).json(results);
            }
        ); 
    }
}

const deleteLike = (req,res)=>{
    const book_id = req.params.id;

    let decodedJwt = verifyJWT(req);

    if(decodedJwt instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message : "로그인 세션이 만료되었습니다. 다시 로그인해 주십시오"
        });
    }else if(decodedJwt instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message : "잘못된 JWT 토큰입니다."
        });
    }else{
        let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;
        let values = [decodedJwt.id, book_id];
        conn.query(sql, values, 
            (err, results)=>{
                if(err){
                    console.log(err)
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                return res.status(StatusCodes.CREATED).json(results);
            }
        ); 
    }
}

module.exports = {
    addLike,
    deleteLike
}