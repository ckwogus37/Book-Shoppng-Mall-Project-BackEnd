const express = require('express');
const router = express.Router();

router.use(express.json());


router
    .route('/:book_id')
    .post(
        [

        ],
        (req,res)=>{
            const book_id = req.params;
            res.json({
                message : "좋아요 추가"
            });
    })
    .delete(
        [

        ],
        (req,res)=>{
            const book_id = req.params;
            res.json({
                message : "좋아요 취소"
            });
        }

    )


exports.module = router;