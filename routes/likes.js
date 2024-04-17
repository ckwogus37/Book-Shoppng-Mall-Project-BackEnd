const express = require('express');
const router = express.Router();
const {addLike, deleteLike} = require('../controller/LikeController');

router.use(express.json());


router.post('/:book_id', addLike)
router.delete('/:book_id', deleteLike)


module.exports = router;