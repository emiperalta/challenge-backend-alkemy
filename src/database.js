const { Sequelize, DataTypes } = require('sequelize');

const { conOpt } = require('./config/keys');

const CharacterModel = require('./models/Character');
const MovieModel = require('./models/Movie');
const CharacterMovieModel = require('./models/CharacterMovie');
const GenreModel = require('./models/Genre');
const UserModel = require('./models/User');

const sequelize = new Sequelize(conOpt.database, conOpt.user, conOpt.password, {
  dialect: conOpt.dialect,
  host: conOpt.host,
  port: conOpt.port,
});

const Character = CharacterModel(sequelize, DataTypes);
const Movie = MovieModel(sequelize, DataTypes);
const CharacterMovie = CharacterMovieModel(sequelize, DataTypes);
const Genre = GenreModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

Character.belongsToMany(Movie, { through: CharacterMovie });
Movie.belongsToMany(Character, { through: CharacterMovie });
Genre.hasMany(Movie);
Movie.belongsTo(Genre);

sequelize.authenticate().then(() => console.log('\ndb connected\n'));
sequelize.sync().then(() => console.log('\nsynchronized tables\n'));

module.exports = { Character, Movie, Genre, User };
