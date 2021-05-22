const express = require('express');
const morgan = require('morgan');

const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/auth', userRoutes);

module.exports = { app };
