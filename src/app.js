const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swagger = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = require('./config/swaggerOptions');

const userRoutes = require('./routes/user.routes');
const characterRoutes = require('./routes/character.routes');
const movieRoutes = require('./routes/movie.routes');

const app = express();
const specs = swagger(swaggerOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/auth', userRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));

module.exports = { app };
