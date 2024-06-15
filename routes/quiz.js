// routes/quiz.js
const express = require('express');
const router = express.Router();
const db = require('../lib/db');

// 퀴즈 스테이지 조회
router.get('/stages', (req, res) => {
    if (req.session.is_logined) {
        const language = req.query.language;
        const quizTable = `${language}quiz`;
        const progressField = `${language}st`;
        
        db.query(`SELECT ${progressField} FROM users WHERE username = ?`, [req.session.nickname], function(error, results, fields) {
            if (error) throw error;
            const userProgress = results[0][progressField];
            db.query(`SELECT id, title FROM ${quizTable}`, function(error, results, fields) {
                if (error) throw error;
                res.json({ stages: results, userProgress });
            });
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// 특정 퀴즈 조회
router.get('/quiz/:stageId', (req, res) => {
    const stageId = req.params.stageId;
    const language = req.query.language;
    const quizTable = `${language}quiz`;
    
    db.query(`SELECT * FROM ${quizTable} WHERE id = ?`, [stageId], function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Quiz not found' });
        }
    });
});

// 퀴즈 정답 제출
router.post('/submit', (req, res) => {
    const { stageId, answer, language } = req.body;
    const quizTable = `${language}quiz`;
    const progressField = `${language}st`;

    if (req.session.is_logined) {
        db.query(`SELECT answer FROM ${quizTable} WHERE id = ?`, [stageId], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0 && results[0].answer === answer) {
                db.query(`SELECT ${progressField}, experience, level FROM users WHERE username = ?`, [req.session.nickname], function(error, results, fields) {
                    if (error) throw error;
                    const userProgress = results[0][progressField];
                    const currentExperience = results[0].experience;
                    const currentLevel = results[0].level;
                    const newExperience = currentExperience + 50;
                    let newLevel = currentLevel;

                    let requiredExperience = 200;
                    for (let i = 1; i < newLevel; i++) {
                        requiredExperience *= 2.5;
                    }

                    let levelUp = false;
                    if (newExperience >= requiredExperience) {
                        newLevel += 1;
                        levelUp = true;
                    }

                    let updateQuery = `UPDATE users SET ${progressField} = ${progressField} + 1, experience = ?, level = ? WHERE username = ?`;
                    if (userProgress < stageId) {
                        updateQuery = `UPDATE users SET ${progressField} = ${progressField} + 1, coin = coin + 500, experience = ?, level = ? WHERE username = ?`;
                    }

                    db.query(updateQuery, [newExperience, newLevel, req.session.nickname], function(error, results, fields) {
                        if (error) throw error;

                        if (levelUp) {
                            const extraExperience = 100;
                            const randomCoin = Math.floor(Math.random() * 301) + 600;
                            db.query(`UPDATE users SET experience = experience + ?, coin = coin + ? WHERE username = ?`, 
                            [extraExperience, randomCoin, req.session.nickname], function(error, results, fields) {
                                if (error) throw error;
                                res.json({ correct: true, firstTime: userProgress < stageId, levelUp, newLevel });
                            });
                        } else {
                            res.json({ correct: true, firstTime: userProgress < stageId, levelUp, newLevel });
                        }
                    });
                });
            } else {
                res.json({ correct: false });
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// 힌트 구매
router.post('/purchase-hint', (req, res) => {
    if (req.session.is_logined) {
        const { stageId, language } = req.body;
        const quizTable = `${language}quiz`;

        db.query('SELECT coin FROM users WHERE username = ?', [req.session.nickname], (error, results, fields) => {
            if (error) throw error;
            const user = results[0];
            if (user.coin >= 300) {
                db.query('UPDATE users SET coin = coin - 300 WHERE username = ?', [req.session.nickname], (error, results, fields) => {
                    if (error) throw error;
                    db.query(`SELECT hint FROM ${quizTable} WHERE id = ?`, [stageId], (error, results, fields) => {
                        if (error) throw error;
                        if (results.length > 0) {
                            res.json({ success: true, hint: results[0].hint });
                        } else {
                            res.status(404).json({ success: false, message: 'Hint not found' });
                        }
                    });
                });
            } else {
                res.json({ success: false, message: 'Not enough coins' });
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// getTell 기능
router.get('/getTell', (req, res) => {
    db.query('SELECT tell FROM cquiz', function(error, results, fields) {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).json({ error: 'Tell not found' });
        }
    });
});

module.exports = router;
