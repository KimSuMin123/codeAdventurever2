// routes/user.js
const express = require('express');
const router = express.Router();
const db = require('../lib/db');

// 사용자 정보 조회
router.get('/userinfo', (req, res) => {
    if (req.session.is_logined) {
        db.query('SELECT username, email, phone, coin, experience, cst, javast, pythonst, jsst, htmlst, cssst, level FROM users WHERE username = ?', [req.session.nickname], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.send(results[0]);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// 관리자 확인
router.get('/managercheck', (req, res) => {
    const sendData = { isManager: false };
    if (req.session.is_manager) {
        sendData.isManager = true;
    }
    res.send(sendData);
});

// 모든 사용자 정보 조회 (관리자 전용)
router.get('/users', (req, res) => {
    if (req.session.is_manager) {
        db.query('SELECT id, username, email, phone, coin, experience, cst, javast, pythonst, jsst, htmlst, cssst, level FROM users', (error, results, fields) => {
            if (error) {
                console.error('Database query error:', error);
                return res.status(500).json({ error: 'Database query error' });
            }
            res.json(results);
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

module.exports = router;
