const express = require('express');
const helmet = require('helmet');

const threadRoutes = require('./routes/thread');
const authRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());
app.use(express.json());

app.use('/api/threads', threadRoutes);
app.use('/api/threads/:id/comment', commentRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;