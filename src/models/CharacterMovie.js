module.exports = (sequelize, DataTypes) => {
  return sequelize.define('charactermovie', {
    movieId: {
      type: DataTypes.UUID,
    },
    characterId: {
      type: DataTypes.UUID,
    },
  });
};
