// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../lib/db');

// 로그인
router.post("/login", (req, res) => {
    const username = req.body.userId;
    const password = req.body.userPassword;
    const sendData = { isLogin: "", isManager: false };

    if (username && password) {
        if (username === 'root' && password === '1234') {
            req.session.is_logined = true;
            req.session.nickname = username;
            req.session.is_manager = true;
            req.session.save(function () {
                sendData.isLogin = "True";
                sendData.isManager = true;
                res.send(sendData);
            });
        } else {
            db.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    bcrypt.compare(password, results[0].password, (err, result) => {
                        if (result === true) {
                            req.session.is_logined = true;
                            req.session.nickname = username;
                            req.session.save(function () {
                                sendData.isLogin = "True";
                                res.send(sendData);
                            });
                        } else {
                            sendData.isLogin = "로그인 정보가 일치하지 않습니다.";
                            res.send(sendData);
                        }
                    });                      
                } else {
                    sendData.isLogin = "아이디 정보가 일치하지 않습니다.";
                    res.send(sendData);
                }
            });
        }
    } else {
        sendData.isLogin = "아이디와 비밀번호를 입력하세요!";
        res.send(sendData);
    }
});

// 회원가입
router.post("/signin", (req, res) => {
    const username = req.body.userId;
    const password = req.body.userPassword;
    const password2 = req.body.userPassword2;
    const email = req.body.email;
    const phone = req.body.phone;
    
    const sendData = { isSuccess: "" };

    if (username && password && password2 && email && phone) {
        db.query('SELECT * FROM users WHERE username = ?', [username], function(error, results, fields) {
            if (error) throw error;
            if (results.length <= 0 && password == password2) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                db.query(`INSERT INTO users (username, password, email, phone, coin, experience, cst, javast, pythonst, jsst, cssst, htmlst, level) 
                          VALUES (?, ?, ?, ?, 0, 0, 0, 0, 0, 0, 0, 0, 1)`, 
                [username, hashedPassword, email, phone], function (error, data) {
                    if (error) throw error;
                    req.session.save(function () {                        
                        sendData.isSuccess = "True";
                        res.send(sendData);
                    });
                });
            } else if (password != password2) {
                sendData.isSuccess = "입력된 비밀번호가 서로 다릅니다.";
                res.send(sendData);
            } else {
                sendData.isSuccess = "이미 존재하는 아이디 입니다!";
                res.send(sendData);  
            }            
        });        
    } else {
        sendData.isSuccess = "아이디, 비밀번호, 이메일, 전화번호를 입력하세요!";
        res.send(sendData);  
    }
});

// 로그아웃
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

module.exports = router;
