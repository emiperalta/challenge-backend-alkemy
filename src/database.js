const { Sequelize, DataTypes } = require('sequelize');

const { conOpt } = require('./config/keys');

const CharacterModel = require('./models/Character');
const MovieModel = require('./models/Movie');
const GenreModel = require('./models/Genre');
const UserModel = require('./models/User');

const sequelize = new Sequelize(conOpt.database, conOpt.user, conOpt.password, {
  dialect: conOpt.dialect,
  host: conOpt.host,
  port: conOpt.port,
});

const Character = CharacterModel(sequelize, DataTypes);
const Movie = MovieModel(sequelize, DataTypes);
const Genre = GenreModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

Character.belongsToMany(Movie, { through: 'CharacterMovie' });
Movie.belongsToMany(Character, { through: 'CharacterMovie' });
Genre.hasMany(Movie);
Movie.belongsTo(Genre);
User.hasMany(Character);
Character.belongsTo(User);
User.hasMany(Movie);
Movie.belongsTo(User);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('\ndb connected\n');
    await sequelize.sync({ force: false });
    await Genre.bulkCreate([
      { name: 'Action', image: 'Action.jpg' },
      { name: 'Comedy', image: 'Comedy.jpg' },
      { name: 'Fantasy', image: 'Fantasy.jpg' },
      { name: 'Historical', image: 'Historical.jpg' },
      { name: 'Horror', image: 'Horror.jpg' },
      { name: 'Science fiction', image: 'Science fiction.jpg' },
    ]);
    console.log('\nsynchronized tables\n');
  } catch (err) {
    console.error(err);
  }
})();

module.exports = { Character, Movie, Genre, User };
