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
                message : "장바구니 담기"
            });
    })
    .get(
        [

        ],
        (req,res)=>{
            res.json({
                message : "장바구니 조회"
            });
        }
    ) 

router
    .delete('/:book_id',
            [

            ],
            (req,res)=>{
                const {book_id} = req.params;
                res.json({
                    message : "장바구니 도서 개별 삭제"
                });
            }
        )

// 장바구니에서 선택한 주문 "예상" 상품 목록 조회 API는 보류
// router
//     .get('/???',
//             [

//             ],
//             (req,res)=>{
//                 res.json({
//                     message : "주문 예상 상품 목록 조회"
//                 });
//             }
//         )

module.exports = router;