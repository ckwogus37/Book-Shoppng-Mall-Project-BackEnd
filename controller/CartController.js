const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const addToCart = (req,res)=>{
    const {user_id, book_id, quantity} = req.body;

    let sql = `INSERT INTO cartItems (user_id, book_id, quantity) VALUES (?, ?, ?)`;
    let values = [user_id, book_id, quantity];
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

const getCartItems = (req,res)=>{
    const {user_id, selected} = req.body;

    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price
                FROM cartItems LEFT JOIN books
                ON cartItems.book_id = books.id
                WHERE user_id = ? `; 
    const values = [user_id];  

    if(selected != undefined){
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

const removeCartItem = (req,res)=>{
    const {id} = req.params;

    let sql = `DELETE FROM cartItems WHERE id = ?`;
    conn.query(sql, id, 
        (err, results)=>{
            if(err){
                console.log(err)
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.CREATED).json(results);
        }
    ); 
}

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
}