// routes/shop.js
const express = require('express');
const router = express.Router();
const db = require('../lib/db');

// 쇼핑몰 상품 목록 조회
router.get('/shop', (req, res) => {
    db.query('SELECT * FROM codeadventure.shop', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

// 상품 구매
router.post('/purchase', (req, res) => {
    if (req.session.is_logined) {
        const { productId } = req.body;
        const username = req.session.nickname;

        db.query('SELECT productprice, productamount, productname FROM codeadventure.shop WHERE id = ?', [productId], (error, results, fields) => {
            if (error) throw error;
            if (results.length > 0) {
                const product = results[0];
                if (product.productamount > 0) {
                    db.query('SELECT coin, phone FROM users WHERE username = ?', [username], (error, results, fields) => {
                        if (error) throw error;
                        if (results.length > 0) {
                            const user = results[0];
                            if (user.coin >= product.productprice) {
                                const newCoin = user.coin - product.productprice;
                                const newAmount = product.productamount - 1;

                                db.query('UPDATE users SET coin = ? WHERE username = ?', [newCoin, username], (error, results, fields) => {
                                    if (error) throw error;
                                    db.query('UPDATE codeadventure.shop SET productamount = ? WHERE id = ?', [newAmount, productId], (error, results, fields) => {
                                        if (error) throw error;
                                        db.query('INSERT INTO purchaseLog (username, productname, phone) VALUES (?, ?, ?)', [username, product.productname, user.phone], (error, results, fields) => {
                                            if (error) throw error;
                                            res.json({ success: true });
                                        });
                                    });
                                });
                            } else {
                                res.json({ success: false, message: 'Not enough coins' });
                            }
                        }
                    });
                } else {
                    res.json({ success: false, message: 'Product out of stock' });
                }
            } else {
                res.json({ success: false, message: 'Product not found' });
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// 상품 수량 업데이트 (관리자 전용)
router.post('/update-quantity/:productId', (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (req.session.is_manager) {
        db.query('UPDATE codeadventure.shop SET productamount = ? WHERE id = ?', [quantity, productId], (error, results, fields) => {
            if (error) throw error;
            res.json({ success: true });
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// 구매 로그 조회 (관리자 전용)
router.get('/purchase-log', (req, res) => {
    if (req.session.is_manager) {
        db.query('SELECT username, productname, phone FROM purchaseLog', (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

module.exports = router;
