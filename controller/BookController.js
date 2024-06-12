const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const verifyJWT = require("../verifyJWT");
const jwt = require("jsonwebtoken");

const allBooks = (req, res) => {
    const { category_id, news, limit, currentPage } = req.query;

    let allBooksRes = {};

    let offset = limit * (currentPage - 1);
    let sql = `SELECT SQL_CALC_FOUND_ROWS *, 
                (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes
                FROM books`;
    let values = [];
    if (category_id) {
        sql += ` WHERE category_id = ?`;
        values.push(category_id);
        if (news) {
            sql += ` AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
        }
    } else if (news) {
        sql += ` WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
    }
    sql += ` LIMIT ? OFFSET ?`;
    values.push(parseInt(limit), offset);

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.NOT_FOUND).end();
        }
        console.log(results);
        if (results.length) {
            results.map((result) => {
                result.pubDate = result.pub_date;
                delete result.pub_date;
            });
            allBooksRes.books = results;
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });

    sql = `SELECT found_rows()`;

    conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.NOT_FOUND).end();
        }
        console.log(allBooksRes.books)
        if (allBooksRes.books) { //도서가 조회되지 않을 경우, pagination에 대한 response가 중복 발생되는 오류 처리
            let pagination = {};
            pagination.currentPage = parseInt(currentPage);
            pagination.totalCount = results[0]["found_rows()"];

            allBooksRes.pagination = pagination;
            return res.status(StatusCodes.OK).json(allBooksRes);
        }
    });
};

const bookDetail = (req, res) => {
    let decodedJwt = verifyJWT(req);

    if (decodedJwt instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "로그인 세션이 만료되었습니다. 다시 로그인해 주십시오",
        });
    } else if (decodedJwt instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "잘못된 JWT 토큰입니다.",
        });
    } else {
        let book_id = req.params.id;

        let sql = `SELECT *, (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes`;
        let values = [book_id];

        if (decodedJwt instanceof ReferenceError) {
            sql += ` FROM books LEFT JOIN category On books.category_id = category.category_id WHERE books.id = ?`;
        } else {
            sql += `, (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ?)) AS liked FROM books LEFT JOIN category On books.category_id = category.category_id WHERE books.id = ?`;
            values = [decodedJwt.id, book_id, book_id];
        }

        conn.query(sql, values, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.NOT_FOUND).end();
            }
            if (results[0]) {
                results.map((result) => {
                    result.pubDate = result.pub_date;
                    delete result.pub_date;
                });
                return res.status(StatusCodes.OK).json(results[0]);
            } else {
                return res.status(StatusCodes.NOT_FOUND).end();
            }
        });
    }
};

module.exports = {
    allBooks,
    bookDetail,
};
