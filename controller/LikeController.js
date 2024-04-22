const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const addLike = (req,res)=>{
    const book_id = req.params.id;

    let decodedJwt = verifyJWT(req);

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

const deleteLike = (req,res)=>{
    const book_id = req.params.id;

    let decodedJwt = verifyJWT(req);

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

function verifyJWT(req){
    const receivedJwt = req.headers["authorization"];
    const decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
    
    return decodedJwt
}

module.exports = {
    addLike,
    deleteLike
}