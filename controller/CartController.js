const verifyJWT = require('../verifyJWT');
const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');

const addToCart = (req,res)=>{
    const {book_id, quantity} = req.body;

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
        let sql = `INSERT INTO cartItems (user_id, book_id, quantity) VALUES (?, ?, ?)`;
        let values = [decodedJwt.id, book_id, quantity];
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

const getCartItems = (req,res)=>{
    const {selected} = req.body;

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
        let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price
                    FROM cartItems LEFT JOIN books
                    ON cartItems.book_id = books.id
                    WHERE user_id = ? `; 
        const values = [decodedJwt.id];  

        if(selected){
            sql += `AND cartItems.id IN (?)`;
            values.push(selected);
        }

        conn.query(sql, values, 
        (err,results)=>{
            if(err){
                console.log(err)
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.CREATED).json(results);
        }   
        );
    }
}

const removeCartItem = (req,res)=>{
    const cartItems_id = req.params.id;

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
    let sql = `DELETE FROM cartItems WHERE id = ?`;
        conn.query(sql, cartItems_id, 
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
    addToCart,
    getCartItems,
    removeCartItem
}