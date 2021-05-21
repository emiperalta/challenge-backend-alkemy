module.exports = (sequelize, DataTypes) => {
  return sequelize.define('movie', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    creationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    qualification: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genreId: {
      type: DataTypes.UUID,
    },
  });
};
