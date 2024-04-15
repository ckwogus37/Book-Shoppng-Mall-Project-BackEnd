const express = require('express');
const router = express.Router();
const {allBooks, bookDetail} = require('../controller/BookController');

router.use(express.json());

router.get('/', allBooks);
router.get('/:book_id', bookDetail);



module.exports = router;