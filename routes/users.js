const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {param, body, validationResult} = require('express-validator');
const {join, login, passwordResetRequest, passwordReset} = require('../controller/UserController');

router.use(express.json());

const validate = (req,res,next)=>{
    const err = validationResult(req)
    if(err.isEmpty()){
        return next()
    }else{
        return res.status(400).json(err.array())
    }
};

// 회원가입
router
    .post('/join',
        [
            body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
            body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
            validate
        ],join);

// 로그인
router
    .post('/login',
        [
            body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
            body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
            validate
        ],login);

router
    .route('/reset') 
    .post([ // 비밀번호 초기화 요청
            body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
            validate
        ],passwordResetRequest)
    .put([ // 비밀번호 초기화 
            body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
            validate
        ],passwordReset)


module.exports = router;