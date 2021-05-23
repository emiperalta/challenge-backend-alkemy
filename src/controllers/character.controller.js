const { Character, Movie } = require('../database');

const getAll = async (req, res) => {
  const { name, age, movies } = req.query;
  try {
    if (name) {
      const charactersByName = await Character.findAll({ where: { name } });
      if (!charactersByName) {
        return res.status(404).json({ error: 'character not found' });
      }
      return res.status(200).json(charactersByName);
    }
    if (age) {
      const charactersByAge = await Character.findAll({ where: { age } });
      if (!charactersByAge) {
        return res.status(404).json({ error: 'character not found' });
      }
      return res.status(200).json(charactersByAge);
    }
    if (movies) {
      const charactersByMovie = await Character.findAll({
        where: { movieId: movies },
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
      include: [{ model: Movie, attributes: ['title', 'image', 'creationDate'] }],
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
    });
    if (characterExists) {
      characterExists.addMovie(movie);
      return res.status(201).json(characterExists);
    }
    const newCharacter = await Character.create({
      ...req.body,
      userId: loggedUserId,
    });
    newCharacter.addMovie(movie);
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
    if (characterToDelete.userId !== loggedUserId) {
      return res.status(403).json({ error: 'not allowed' });
    }
    await characterToUpdate.update(req.body);
    res.status(200).json(characterToUpdate);
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
