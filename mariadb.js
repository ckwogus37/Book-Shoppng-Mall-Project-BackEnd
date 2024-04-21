const mariadb = require('mysql2/promise');


  const connection = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'root',
    database: 'Book-Shopping-Mall',
    dateStrings : true // DB에서 불러올 TIMESTAMP 값에서 소수점단위의 시간은 제거
  });

  module.exports = connection;