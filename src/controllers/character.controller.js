const { Character, Movie } = require('../database');

const getAll = async (req, res) => {
  const { name, age, movies } = req.query;
  try {
    if (name) {
      const characterByName = await Character.findOne({ where: { name } });
      if (!characterByName) {
        return res.status(404).json({ error: 'character not found' });
      }
      return res.status(200).json(characterByName);
    }
    if (age) {
      const characterByAge = await Character.findOne({ where: { age } });
      if (!characterByAge) {
        return res.status(404).json({ error: 'character not found' });
      }
      return res.status(200).json(characterByName);
    }
    if (movies) {
      const characterByMovie = await Character.findOne({
        where: { movieId: movies },
      });
      if (!characterByMovie) {
        return res.status(404).json({ error: 'character not found' });
      }
      return res.status(200).json(characterByName);
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
      include: [{ model: Movie, attributes: ['title', 'image', 'creationDate'] }],
    });
    res.status(200).json(character);
  } catch (err) {
    console.error(err);
  }
};

const addOne = async (req, res) => {
  try {
    const newCharacter = await Character.create(req.body);
    //TODO: associate the character with a movie
    //TODO: create a charactermovie instance
    res.status(201).json(newCharacter);
  } catch (err) {
    console.error(err);
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const characterExists = await Character.findOne({ where: { id } });
    if (!characterExists) {
      return res.status(404).json({ error: 'character not found' });
    }
    await characterExists.update(req.body);
    res.status(200).json(characterExists);
  } catch (err) {
    console.error(err);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const characterExists = await Character.findOne({ where: { id } });
    if (!characterExists) {
      return res.status(404).json({ error: 'character not found' });
    }
    await characterExists.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
  }
};

module.exports = { addOne, getAll, getOne, updateOne, deleteOne };
