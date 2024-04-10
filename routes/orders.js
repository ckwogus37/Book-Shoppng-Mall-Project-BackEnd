const express = require('express');
const router = express.Router();

router.use(express.json());


router
    .route('/')
    .post(
        [

        ],
        (req,res)=>{
            res.json({
                message : "결제하기"
            });
    })
    .get(
        [
            
        ],
        (req,res)=>{
            res.json({
                message : "주문 목록 내역 조회"
            });
        }
    )

router  
    .get('/:order_id',
        [

        ],
        (req,res)=>{
            const {order_id} = req.params;
            res.json({
                message : "주문 상품 상세 조회"
            });
        }
    )


    module.exports = router;