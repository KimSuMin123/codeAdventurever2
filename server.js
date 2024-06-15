// server.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3001;

const bodyParser = require("body-parser");
const MySQLStore = require('express-mysql-session')(session);

const db = require('./lib/db');
const sessionOption = require('./lib/sessionOption');

// 미들웨어 설정
app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 세션 설정
var sessionStore = new MySQLStore(sessionOption);
app.use(session({  
    key: 'session_cookie_name',
    secret: '~',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// 기본 라우트
app.get('/', (req, res) => {    
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

// 기능별 라우트
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const quizRoutes = require('./routes/quiz');
const shopRoutes = require('./routes/shop');

app.use(authRoutes);
app.use(userRoutes);
app.use(quizRoutes);
app.use(shopRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
