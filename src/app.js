const express = require('express');
const morgan = require('morgan');

const userRoutes = require('./routes/user.routes');
const characterRoutes = require('./routes/character.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/auth', userRoutes);
app.use('/api/characters', characterRoutes);

module.exports = { app };
