const { Character, Movie } = require('../database');

const getAll = async (req, res) => {
  const { name, age, movies } = req.query;
  try {
    if (name) {
      const charactersByName = await Character.findAll({
        where: { name },
        attributes: ['name', 'image'],
      });
      if (!charactersByName) {
        return res.status(404).json({ error: 'character not found' });
      }
      return res.status(200).json(charactersByName);
    }
    if (age) {
      const charactersByAge = await Character.findAll({
        where: { age },
        attributes: ['name', 'image'],
      });
      if (!charactersByAge) {
        return res.status(404).json({ error: 'character not found' });
      }
      return res.status(200).json(charactersByAge);
    }
    if (movies) {
      const charactersByMovie = await Character.findAll({
        attributes: ['name', 'image'],
        include: {
          model: Movie,
          through: { attributes: [] },
          where: { id: movies },
          attributes: ['title'],
        },
      });
      if (!charactersByMovie) {
        return res.status(404).json({ error: 'character not found' });
      }
      return res.status(200).json(charactersByMovie);
    }
    const characters = await Character.findAll({ attributes: ['name', 'image'] });
    res.status(200).json(characters);
  } catch (err) {
    console.error(err);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const character = await Character.findOne({
      where: { id },
      attributes: ['id', 'name', 'image', 'age', 'weight', 'history'],
      include: [
        {
          model: Movie,
          through: { attributes: [] },
          attributes: ['title', 'image', 'creationDate'],
        },
      ],
    });
    if (!character) return res.status(404).json({ error: 'character not found' });
    res.status(200).json(character);
  } catch (err) {
    console.error(err);
  }
};

const addOne = async (req, res) => {
  const loggedUserId = req.user;
  const { title } = req.body;
  try {
    const movie = await Movie.findOne({ where: { title } });
    if (!movie) return res.status(404).json({ error: 'movie not found' });
    const characterExists = await Character.findOne({
      where: { name: req.body.name },
      attributes: ['id', 'name', 'image', 'age', 'weight', 'history'],
    });
    if (characterExists) {
      characterExists.addMovie(movie);
      return res.status(201).json(characterExists);
    }
    const character = await Character.create({
      ...req.body,
      userId: loggedUserId,
    });
    character.addMovie(movie);
    const newCharacter = await Character.findOne({
      where: { id: character.id },
      attributes: ['id', 'name', 'image', 'age', 'weight', 'history'],
    });
    res.status(201).json(newCharacter);
  } catch (err) {
    console.error(err);
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const loggedUserId = req.user;
  try {
    const characterToUpdate = await Character.findOne({ where: { id } });
    if (!characterToUpdate) {
      return res.status(404).json({ error: 'character not found' });
    }
    if (characterToUpdate.userId !== loggedUserId) {
      return res.status(403).json({ error: 'not allowed' });
    }
    await characterToUpdate.update(req.body);
    const updatedCharacter = await Character.findOne({
      where: { id },
      attributes: ['name', 'image', 'age', 'weight', 'history'],
    });
    res.status(200).json(updatedCharacter);
  } catch (err) {
    console.error(err);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const loggedUserId = req.user;
  try {
    const characterToDelete = await Character.findOne({ where: { id } });
    if (!characterToDelete) {
      return res.status(404).json({ error: 'character not found' });
    }
    if (characterToDelete.userId !== loggedUserId) {
      return res.status(403).json({ error: 'not allowed' });
    }
    await characterToDelete.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
  }
};

module.exports = { addOne, getAll, getOne, updateOne, deleteOne };
