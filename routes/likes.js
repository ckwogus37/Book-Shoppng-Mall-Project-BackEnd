const express = require('express');
const router = express.Router();
const {addLike, deleteLike} = require('../controller/LikeController');

router.use(express.json());


router
    .route('/:book_id')
    .post(addLike)
    .delete(deleteLike)


    module.exports = router;