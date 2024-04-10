const express = require('express');
const router = express.Router();

router.use(express.json());


router
    .get('/',
        [

        ],
        (req,res)=>{
            res.json({
                message : "전체 도서 조회"
            });
});

router
    .get('/:id',
        [

        ],
        (req,res)=>{
            const {id} = req.params;
            res.json({
                message : "개별 도서 조회"
            });
});

router
    .get('/',
        [

        ],
        (req,res)=>{
            const category_id = req.query.category_id;
            const NEW = req.query.NEW;
            res.json({
                message : "카테고리 별 도서 목록 조회",
                category_id : category_id,
                NEW : NEW
            });
});


module.exports = router;